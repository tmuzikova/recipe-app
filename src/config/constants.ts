export const SUPPORTED_LANGUAGES = ['cs', 'en'] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];
