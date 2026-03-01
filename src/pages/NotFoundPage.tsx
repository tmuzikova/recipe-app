import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';

export const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-2 text-6xl font-bold text-gray-200">404</h1>
      <h2 className="mb-4 text-2xl font-semibold text-gray-900">
        {t('notFound.heading')}
      </h2>
      <p className="mb-8 max-w-md text-gray-500">{t('notFound.description')}</p>
      <Link to="/">
        <Button>{t('notFound.backHome')}</Button>
      </Link>
    </div>
  );
};
