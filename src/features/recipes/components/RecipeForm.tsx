import { useFieldArray, useForm, useController } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router';
import { useState, useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  createRecipeFormSchema,
  type RecipeFormValues,
} from '../types/recipeForm';
import { createRecipe } from '../api/createRecipe';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { FormField } from '@/components/ui/FormField';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import UploadIcon from '@/assets/icons/upload.svg?react';
import CloseIcon from '@/assets/icons/close.svg?react';
import PlusIcon from '@/assets/icons/plus.svg?react';

const CATEGORIES = [
  'Snídaně',
  'Hlavní jídlo',
  'Dezert',
  'Drink',
  'Svačina',
] as const;

export const RecipeForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const schema = useMemo(() => createRecipeFormSchema(t), [t]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RecipeFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      cookingTime: '',
      servings: '',
      featured: false,
      image: undefined,
      ingredients: [{ name: '', amount: '', unit: '' }],
      instructions: '',
    },
  });

  const { field: imageField } = useController({ control, name: 'image' });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ingredients',
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    imageField.onChange(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    imageField.onChange(undefined);
    setImagePreview(null);
    if (imageInputRef.current) imageInputRef.current.value = '';
  };

  const onSubmit = async (values: RecipeFormValues) => {
    setSubmitError(null);
    try {
      const slug = await createRecipe(values, getToken);
      await navigate(`/recipes/${slug}`);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : t('form.error.generic'),
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <FormField
        label={t('form.label.title')}
        htmlFor="title"
        required
        error={errors.title?.message}
      >
        <Input
          {...register('title')}
          id="title"
          hasError={!!errors.title}
          placeholder={t('form.placeholder.title')}
        />
      </FormField>

      <FormField label={t('form.label.description')} htmlFor="description">
        <Textarea
          {...register('description')}
          id="description"
          rows={3}
          placeholder={t('form.placeholder.description')}
        />
      </FormField>

      <FormField label={t('form.label.image')} error={errors.image?.message}>
        {imagePreview ? (
          <div className="relative w-full overflow-hidden rounded-xl">
            <img
              src={imagePreview}
              alt={t('form.imagePreviewAlt')}
              className="h-56 w-full object-cover"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute right-2 top-2 rounded-full bg-black/50 p-1.5 text-white hover:bg-black/70"
              aria-label={t('form.aria.removeImage')}
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => imageInputRef.current?.click()}
            className="flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 py-10 text-gray-400 transition-colors hover:border-primary-400 hover:text-primary-500"
          >
            <UploadIcon className="h-8 w-8" />
            <span className="text-sm font-medium">
              {t('form.upload.click')}
            </span>
            <span className="text-xs">{t('form.upload.hint')}</span>
          </button>
        )}
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </FormField>

      <div className="grid gap-4 sm:grid-cols-3">
        <FormField label={t('form.label.category')} htmlFor="category">
          <Select {...register('category')} id="category">
            <option value="">{t('form.placeholder.category')}</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {t(`categories.${cat}`, cat)}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField
          label={t('form.label.cookingTime')}
          htmlFor="cookingTime"
          error={errors.cookingTime?.message}
        >
          <Input
            {...register('cookingTime')}
            id="cookingTime"
            type="number"
            min={0}
            hasError={!!errors.cookingTime}
            placeholder="30"
          />
        </FormField>

        <FormField
          label={t('form.label.servings')}
          htmlFor="servings"
          error={errors.servings?.message}
        >
          <Input
            {...register('servings')}
            id="servings"
            type="number"
            min={1}
            hasError={!!errors.servings}
            placeholder="4"
          />
        </FormField>
      </div>

      <div className="flex items-center gap-3">
        <input
          {...register('featured')}
          id="featured"
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
        />
        <label htmlFor="featured" className="text-sm font-medium text-gray-700">
          {t('form.label.featured')}
        </label>
      </div>

      <div>
        <h2 className="mb-3 text-base font-semibold text-gray-900">
          {t('form.label.ingredients')}
        </h2>
        <div className="space-y-2">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-start gap-2">
              <Input
                {...register(`ingredients.${index}.name`)}
                hasError={!!errors.ingredients?.[index]?.name}
                placeholder={t('form.placeholder.ingredient')}
                className="flex-2"
              />
              <Input
                {...register(`ingredients.${index}.amount`)}
                placeholder={t('form.placeholder.amount')}
                className="flex-1"
              />
              <Input
                {...register(`ingredients.${index}.unit`)}
                placeholder={t('form.placeholder.unit')}
                className="flex-1"
              />
              <Button
                type="button"
                variant="onlyIcon"
                onClick={() => remove(index)}
                disabled={fields.length === 1}
                className="mt-0.5"
                aria-label={t('form.aria.removeIngredient')}
              >
                <CloseIcon className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {errors.ingredients && (
            <p className="text-xs text-red-500">
              {t('form.error.checkIngredients')}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={() => append({ name: '', amount: '', unit: '' })}
          className="mt-3 flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700"
        >
          <PlusIcon className="h-4 w-4" />
          {t('form.addIngredient')}
        </button>
      </div>

      <FormField
        label={t('form.label.instructions')}
        htmlFor="instructions"
        hint={t('form.label.instructionsHint')}
      >
        <Textarea
          {...register('instructions')}
          id="instructions"
          rows={8}
          placeholder={t('form.placeholder.instructions')}
        />
      </FormField>

      {submitError && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {submitError}
        </div>
      )}

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" disabled={isSubmitting} size="lg">
          {isSubmitting ? t('form.submit.submitting') : t('form.submit.save')}
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="lg"
          onClick={() => navigate('/')}
        >
          {t('form.cancel')}
        </Button>
      </div>
    </form>
  );
};
