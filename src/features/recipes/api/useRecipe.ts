import { useState, useEffect } from 'react';
import { sanityClient } from '@/lib/sanityClient';
import { RECIPE_BY_SLUG_QUERY } from './queries';
import type { RecipeDetail } from './types';

export const useRecipe = (slug: string) => {
  const [data, setData] = useState<RecipeDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    sanityClient
      .fetch<RecipeDetail>(RECIPE_BY_SLUG_QUERY, { slug })
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [slug]);

  return { data, loading, error };
};
