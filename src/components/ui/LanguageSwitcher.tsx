import { useTranslation } from 'react-i18next';
import {
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from '@/config/constants';

const LANGUAGE_LABELS = {
  cs: 'CS',
  en: 'EN',
} as const satisfies Record<SupportedLanguage, string>;

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language.slice(0, 2);

  const handleChange = (lang: SupportedLanguage) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="flex items-center gap-1 rounded-lg border border-gray-200 p-0.5">
      {SUPPORTED_LANGUAGES.map((lang) => (
        <button
          key={lang}
          onClick={() => handleChange(lang)}
          className={`rounded-md px-2 py-1 text-xs font-semibold transition-colors ${
            currentLang === lang
              ? 'bg-primary-600 text-white'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          {LANGUAGE_LABELS[lang]}
        </button>
      ))}
    </div>
  );
};
