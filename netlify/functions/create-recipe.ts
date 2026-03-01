import path from 'node:path';
import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import type { Handler } from '@netlify/functions';

// Load .env.local when running locally (Netlify Dev doesn't load it automatically)
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

function getSanityClient() {
  const projectId =
    process.env.SANITY_PROJECT_ID ?? process.env.VITE_SANITY_PROJECT_ID;
  const dataset =
    process.env.SANITY_DATASET ??
    process.env.VITE_SANITY_DATASET ??
    'production';
  const token = process.env.SANITY_API_TOKEN;

  if (!projectId) {
    throw new Error(
      'Missing SANITY_PROJECT_ID or VITE_SANITY_PROJECT_ID in environment',
    );
  }
  if (!token) {
    throw new Error(
      'Missing SANITY_API_TOKEN (set in Netlify env vars, not VITE_ – token must stay server-side only)',
    );
  }

  return createClient({
    projectId,
    dataset,
    apiVersion: '2024-01-01',
    useCdn: false,
    token,
  });
}

const slugify = (text: string): string =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const client = getSanityClient();
    const body = JSON.parse(event.body ?? '{}');
    const { imageBase64, imageName, imageMimeType, ...values } = body;

    let mainImage:
      | { _type: string; asset: { _type: string; _ref: string } }
      | undefined;

    if (imageBase64 && imageName) {
      const buffer = Buffer.from(imageBase64, 'base64');
      const asset = await client.assets.upload('image', buffer, {
        filename: imageName,
        contentType: imageMimeType ?? 'image/jpeg',
      });
      mainImage = {
        _type: 'image',
        asset: { _type: 'reference', _ref: asset._id },
      };
    }

    const instructions = (values.instructions ?? '')
      .split('\n')
      .filter((line: string) => line.trim() !== '')
      .map((line: string) => ({
        _type: 'block',
        _key: crypto.randomUUID(),
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: crypto.randomUUID(),
            text: line.trim(),
            marks: [],
          },
        ],
      }));

    const slug = slugify(values.title);

    const doc = await client.create({
      _type: 'recipe',
      title: values.title,
      slug: { _type: 'slug', current: slug },
      description: values.description || undefined,
      category: values.category || undefined,
      cookingTime: values.cookingTime ? Number(values.cookingTime) : undefined,
      servings: values.servings ? Number(values.servings) : undefined,
      featured: values.featured,
      mainImage,
      ingredients: (values.ingredients ?? [])
        .filter((i: { name: string }) => i.name.trim() !== '')
        .map((i: { name: string; amount?: string; unit?: string }) => ({
          _type: 'ingredient',
          _key: crypto.randomUUID(),
          name: i.name,
          amount: i.amount || undefined,
          unit: i.unit || undefined,
        })),
      instructions,
      publishedAt: new Date().toISOString(),
    });

    const slugValue =
      (doc.slug as { current?: string } | undefined)?.current ?? slug;
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug: slugValue }),
    };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Failed to create recipe';
    console.error('create-recipe error:', err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: message }),
    };
  }
};
