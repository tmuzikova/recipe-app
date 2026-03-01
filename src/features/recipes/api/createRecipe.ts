import type { RecipeFormValues } from '../types/recipeForm';

const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export const createRecipe = async (
  values: RecipeFormValues,
): Promise<string> => {
  const body: Record<string, unknown> = { ...values, image: undefined };

  if (values.image) {
    body.imageBase64 = await toBase64(values.image);
    body.imageName = values.image.name;
    body.imageMimeType = values.image.type;
  }

  const res = await fetch('/.netlify/functions/create-recipe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error ?? 'Failed to create recipe');
  }

  const { slug } = await res.json();
  return slug as string;
};
