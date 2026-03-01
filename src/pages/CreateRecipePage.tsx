import { useTranslation } from 'react-i18next';
import { RecipeForm } from '@/features/recipes/components/RecipeForm';

export const CreateRecipePage = () => {
  const { t } = useTranslation();

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
