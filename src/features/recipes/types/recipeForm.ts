import type { TFunction } from 'i18next';
import { z } from 'zod';

export const createIngredientSchema = (t: TFunction) =>
  z.object({
    name: z.string().min(1, t('validation.ingredient.nameRequired')),
    amount: z.string().optional(),
    unit: z.string().optional(),
  });

export const createRecipeFormSchema = (t: TFunction) =>
  z.object({
    title: z.string().min(1, t('validation.recipe.titleRequired')),
    description: z.string().optional(),
    category: z
      .enum(['Snídaně', 'Hlavní jídlo', 'Dezert', 'Drink', 'Svačina', ''])
      .optional(),
    cookingTime: z
      .string()
      .optional()
      .refine(
        (val) => !val || Number(val) >= 0,
        t('validation.cookingTime.positive'),
      ),
    servings: z
      .string()
      .optional()
      .refine((val) => !val || Number(val) >= 1, t('validation.servings.min')),
    featured: z.boolean(),
    image: z
      .instanceof(File)
      .optional()
      .refine(
        (file) => !file || file.size <= 10 * 1024 * 1024,
        t('validation.image.size'),
      )
      .refine(
        (file) => !file || file.type.startsWith('image/'),
        t('validation.image.type'),
      ),
    ingredients: z.array(createIngredientSchema(t)),
    instructions: z.string().optional(),
  });

export type RecipeFormValues = z.infer<
  ReturnType<typeof createRecipeFormSchema>
>;
