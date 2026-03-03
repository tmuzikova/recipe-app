import { useState, useEffect } from 'react';
import { sanityClient } from '@/lib/sanityClient';
import { FEATURED_RECIPES_QUERY } from './queries';
import type { FeaturedRecipe } from './types';

export const useFeaturedRecipes = () => {
  const [data, setData] = useState<FeaturedRecipe[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    sanityClient
      .fetch<FeaturedRecipe[]>(FEATURED_RECIPES_QUERY)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
};
