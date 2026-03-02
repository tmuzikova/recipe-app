/**
 * Re-exports from Sanity TypeGen. Run `yarn typegen` after schema or GROQ changes.
 */
export type {
  FEATURED_RECIPES_QUERYResult,
  RECIPE_BY_SLUG_QUERYResult,
  Ingredient,
  Slug,
} from '@/sanity.types';

export type FeaturedRecipe =
  import('@/sanity.types').FEATURED_RECIPES_QUERYResult[number];
export type RecipeDetail = NonNullable<
  import('@/sanity.types').RECIPE_BY_SLUG_QUERYResult
>;
