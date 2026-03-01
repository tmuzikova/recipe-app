import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useRecipe } from '@/features/recipes/api/useRecipe';
import { RecipeDetail } from '@/features/recipes/components/RecipeDetail';
import { Spinner } from '@/components/ui/Spinner';

export const RecipePage = () => {
  const { t } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const { data, loading, error } = useRecipe(slug ?? '');

  if (loading) {
    return <Spinner className="py-32" />;
  }

  if (error) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16">
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-red-600">{t('recipe.error.failedLoad')}</p>
          <p className="mt-1 text-sm text-red-400">{error.message}</p>
        </div>
      </div>
    );
  }

  const recipe = data;

  if (!recipe) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          {t('recipe.notFound.heading')}
        </h1>
        <p className="text-gray-500">{t('recipe.notFound.description')}</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8">
      <RecipeDetail recipe={recipe} />
    </div>
  );
};
