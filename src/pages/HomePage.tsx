import { useTranslation } from 'react-i18next';
import { useFeaturedRecipes } from '@/features/recipes/api/useFeaturedRecipes';
import { RecipeCard } from '@/features/recipes/components/RecipeCard';
import { Spinner } from '@/components/ui/Spinner';

export const HomePage = () => {
  const { t } = useTranslation();
  const { data, loading, error } = useFeaturedRecipes();

  return (
    <div>
      <section className="bg-linear-to-br from-primary-50 via-white to-primary-50/30 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            {t('home.hero.welcome')}
            <span className="text-primary-600">{t('app.name')}</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-500">
            {t('app.description')}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-2xl font-bold text-gray-900">
          {t('home.featuredRecipes')}
        </h2>

        {loading && <Spinner className="py-20" />}

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
            <p className="text-red-600">{t('home.error.failedLoad')}</p>
            <p className="mt-1 text-sm text-red-400">{error.message}</p>
          </div>
        )}

        {data && data.length === 0 && (
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-12 text-center">
            <p className="text-gray-500">{t('home.empty.noRecipes')}</p>
          </div>
        )}

        {data && data.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
