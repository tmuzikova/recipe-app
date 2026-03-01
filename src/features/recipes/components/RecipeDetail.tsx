import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import type { RecipeDetail as RecipeDetailType } from '../api/types';
import { IngredientList } from './IngredientList';
import { InstructionSteps } from './InstructionSteps';
import ChevronLeftIcon from '@/assets/icons/chevron-left.svg?react';
import ClockIcon from '@/assets/icons/clock.svg?react';
import UsersIcon from '@/assets/icons/users.svg?react';

type RecipeDetailProps = {
  recipe: RecipeDetailType;
};

export const RecipeDetail = ({ recipe }: RecipeDetailProps) => {
  const { t } = useTranslation();
  const imageUrl = recipe.mainImage?.asset?.url;

  return (
    <article className="mx-auto max-w-4xl">
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-primary-600 transition-colors"
      >
        <ChevronLeftIcon className="h-4 w-4" />
        {t('recipe.detail.backToRecipes')}
      </Link>

      {imageUrl && (
        <div className="mb-8 overflow-hidden rounded-2xl">
          <img
            src={imageUrl}
            alt={recipe.title ?? ''}
            className="h-[400px] w-full object-cover"
          />
        </div>
      )}

      <header className="mb-8">
        {recipe.category && (
          <span className="mb-3 inline-block rounded-full bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700 capitalize">
            {t(`categories.${recipe.category}`, recipe.category)}
          </span>
        )}
        <h1 className="mb-3 text-4xl font-bold text-gray-900">
          {recipe.title}
        </h1>
        {recipe.description && (
          <p className="text-lg text-gray-500">{recipe.description}</p>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-6 text-sm text-gray-500">
          {recipe.cookingTime && (
            <div className="flex items-center gap-2">
              <ClockIcon className="h-5 w-5 text-gray-400" />
              {recipe.cookingTime} {t('recipe.detail.minutes')}
            </div>
          )}
          {recipe.servings && (
            <div className="flex items-center gap-2">
              <UsersIcon className="h-5 w-5 text-gray-400" />
              {recipe.servings} {t('recipe.detail.servings')}
            </div>
          )}
        </div>
      </header>

      <div className="grid gap-10 md:grid-cols-[1fr_2fr]">
        {recipe.ingredients && recipe.ingredients.length > 0 && (
          <aside className="rounded-xl bg-gray-50 p-6">
            <IngredientList ingredients={recipe.ingredients} />
          </aside>
        )}

        {recipe.instructions != null && (
          <div>
            <InstructionSteps blocks={recipe.instructions} />
          </div>
        )}
      </div>
    </article>
  );
};
