import { useTranslation } from 'react-i18next';
import { APP_NAME } from '@/config/constants';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-gray-100 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} {APP_NAME}. {t('footer.rights')}
        </p>
      </div>
    </footer>
  );
};
