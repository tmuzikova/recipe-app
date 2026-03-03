import 'i18next';
import type csTranslation from './locales/cs/translation.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: typeof csTranslation;
    };
  }
}
