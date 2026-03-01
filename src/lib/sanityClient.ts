import { createClient } from '@sanity/client';
import { env } from '@/config/env';

export const sanityClient = createClient({
  projectId: env.sanity.projectId,
  dataset: env.sanity.dataset,
  apiVersion: '2024-01-01',
  useCdn: true,
});
