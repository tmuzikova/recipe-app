import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import type { FeaturedRecipe } from '../api/types';
import ClockIcon from '@/assets/icons/clock.svg?react';
import UsersIcon from '@/assets/icons/users.svg?react';
import ImagePlaceholderIcon from '@/assets/icons/image-placeholder.svg?react';

type RecipeCardProps = {
  recipe: FeaturedRecipe;
};

export const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const { t } = useTranslation();
  const imageUrl = recipe.mainImage?.asset?.url;

  const slug = recipe.slug?.current ?? '';

  return (
    <Link
      to={`/recipes/${slug}`}
      className="group block overflow-hidden rounded-2xl bg-white shadow-md transition-shadow hover:shadow-xl"
    >
      <div className="aspect-4/3 overflow-hidden bg-gray-100">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={recipe.title ?? ''}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-400">
            <ImagePlaceholderIcon className="h-12 w-12" />
          </div>
        )}
      </div>

      <div className="p-5">
        {recipe.category && (
          <span className="mb-2 inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700 capitalize">
            {t(`categories.${recipe.category}`, recipe.category)}
          </span>
        )}

        <h3 className="mb-1 text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
          {recipe.title}
        </h3>

        {recipe.description && (
          <p className="mb-3 line-clamp-2 text-sm text-gray-500">
            {recipe.description}
          </p>
        )}

        <div className="flex items-center gap-4 text-xs text-gray-400">
          {recipe.cookingTime && (
            <span className="flex items-center gap-1">
              <ClockIcon className="h-3.5 w-3.5" />
              {recipe.cookingTime} {t('recipe.card.minutes')}
            </span>
          )}
          {recipe.servings && (
            <span className="flex items-center gap-1">
              <UsersIcon className="h-3.5 w-3.5" />
              {t('recipe.card.servings', { count: recipe.servings })}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};
