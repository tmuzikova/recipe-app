import groq from 'groq';

export const FEATURED_RECIPES_QUERY = groq`*[_type == "recipe" && featured == true] | order(publishedAt desc) {
  _id,
  title,
  slug,
  description,
  mainImage { asset -> { url } },
  cookingTime,
  servings,
  category
}`;

export const RECIPE_BY_SLUG_QUERY = groq`*[_type == "recipe" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  description,
  mainImage { asset -> { url } },
  ingredients,
  instructions,
  cookingTime,
  servings,
  category,
  publishedAt
}`;
