import { useState, useEffect } from 'react';
import { sanityClient } from '@/lib/sanityClient';
import { FEATURED_RECIPES_QUERY } from './queries';
import type { RecipeSummary } from './types';

export const useRecipes = () => {
  const [data, setData] = useState<RecipeSummary[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    sanityClient
      .fetch<RecipeSummary[]>(FEATURED_RECIPES_QUERY)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
};
