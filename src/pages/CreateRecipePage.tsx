import { useTranslation } from 'react-i18next';
import { RecipeForm } from '@/features/recipes/components/RecipeForm';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';

export const CreateRecipePage = () => {
  const { t } = useTranslation();
  const { user, loading, login } = useAuth();

  if (loading) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center text-gray-500">
        {t('auth.loading')}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900">
            {t('auth.loginRequired')}
          </h2>
          <p className="mt-2 text-gray-600">{t('auth.loginToAddRecipe')}</p>
          <Button onClick={login} className="mt-6" size="lg">
            {t('auth.logIn')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {t('createRecipe.heading')}
        </h1>
        <p className="mt-1 text-gray-500">{t('createRecipe.subheading')}</p>
      </div>
      <RecipeForm />
    </div>
  );
};
