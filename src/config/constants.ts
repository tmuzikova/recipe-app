export const APP_NAME = 'Recipes App';
export const APP_DESCRIPTION =
  'Discover and explore delicious recipes from around the world.';

export const SUPPORTED_LANGUAGES = ['cs', 'en'] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];
