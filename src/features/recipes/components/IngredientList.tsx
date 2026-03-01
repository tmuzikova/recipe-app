import { useTranslation } from 'react-i18next';
import type { Ingredient } from '../api/types';

type IngredientListProps = {
  ingredients: Ingredient[];
};

export const IngredientList = ({ ingredients }: IngredientListProps) => {
  const { t } = useTranslation();

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold text-gray-900">
        {t('recipe.ingredients.heading')}
      </h2>
      <ul className="space-y-2">
        {ingredients.map((ingredient, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary-400" />
            <span className="text-gray-700">
              {ingredient.amount && (
                <span className="font-medium">
                  {ingredient.amount}
                  {ingredient.unit ? ` ${ingredient.unit}` : ''}{' '}
                </span>
              )}
              {ingredient.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
