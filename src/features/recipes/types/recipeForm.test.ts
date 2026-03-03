import { describe, it, expect } from 'vitest';
import { createRecipeFormSchema, createIngredientSchema } from './recipeForm';

const t = ((key: string) => key) as Parameters<
  typeof createRecipeFormSchema
>[0];

const schema = createRecipeFormSchema(t);
const ingredientSchema = createIngredientSchema(t);

describe('createRecipeFormSchema', () => {
  const validRecipe = {
    title: 'Svíčková na smetaně',
    featured: false,
    ingredients: [{ name: 'Hovězí maso', amount: '500', unit: 'g' }],
  };

  it('accepts a valid recipe with all required fields', () => {
    const result = schema.safeParse(validRecipe);
    expect(result.success).toBe(true);
  });

  it('rejects a recipe without title', () => {
    const result = schema.safeParse({ ...validRecipe, title: '' });
    expect(result.success).toBe(false);
  });

  it('rejects negative cookingTime', () => {
    const result = schema.safeParse({ ...validRecipe, cookingTime: '-5' });
    expect(result.success).toBe(false);
  });

  it('accepts zero cookingTime', () => {
    const result = schema.safeParse({ ...validRecipe, cookingTime: '0' });
    expect(result.success).toBe(true);
  });

  it('rejects servings less than 1', () => {
    const result = schema.safeParse({ ...validRecipe, servings: '0' });
    expect(result.success).toBe(false);
  });

  it('accepts servings of 1 or more', () => {
    const result = schema.safeParse({ ...validRecipe, servings: '4' });
    expect(result.success).toBe(true);
  });

  it('rejects an image larger than 10 MB', () => {
    const bigFile = new File(['x'.repeat(11 * 1024 * 1024)], 'big.jpg', {
      type: 'image/jpeg',
    });
    const result = schema.safeParse({ ...validRecipe, image: bigFile });
    expect(result.success).toBe(false);
  });

  it('rejects a non-image file', () => {
    const textFile = new File(['hello'], 'notes.txt', {
      type: 'text/plain',
    });
    const result = schema.safeParse({ ...validRecipe, image: textFile });
    expect(result.success).toBe(false);
  });

  it('accepts a valid image under 10 MB', () => {
    const smallImage = new File(['img'], 'photo.png', {
      type: 'image/png',
    });
    const result = schema.safeParse({ ...validRecipe, image: smallImage });
    expect(result.success).toBe(true);
  });
});

describe('createIngredientSchema', () => {
  it('requires ingredient name', () => {
    const result = ingredientSchema.safeParse({ name: '' });
    expect(result.success).toBe(false);
  });

  it('accepts ingredient with only a name', () => {
    const result = ingredientSchema.safeParse({ name: 'Cibule' });
    expect(result.success).toBe(true);
  });

  it('accepts ingredient with all fields', () => {
    const result = ingredientSchema.safeParse({
      name: 'Mouka',
      amount: '200',
      unit: 'g',
    });
    expect(result.success).toBe(true);
  });
});
