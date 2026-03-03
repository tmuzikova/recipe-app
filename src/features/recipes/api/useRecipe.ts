import { useState, useEffect } from 'react';
import { sanityClient } from '@/lib/sanityClient';
import { RECIPE_BY_SLUG_QUERY } from './queries';
import type { RecipeDetail } from './types';

type State = {
  data: RecipeDetail | null;
  loading: boolean;
  error: Error | null;
};

export const useRecipe = (slug: string) => {
  const [state, setState] = useState<State>({
    data: null,
    loading: !!slug,
    error: null,
  });

  useEffect(() => {
    if (!slug) return;

    let cancelled = false;

    sanityClient
      .fetch<RecipeDetail>(RECIPE_BY_SLUG_QUERY, { slug })
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch((error) => {
        if (!cancelled) setState({ data: null, loading: false, error });
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  return { data: state.data, loading: state.loading, error: state.error };
};
