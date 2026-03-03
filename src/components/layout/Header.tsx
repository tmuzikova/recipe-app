import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import PlusIcon from '@/assets/icons/plus.svg?react';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';

export const Header = () => {
  const { t } = useTranslation();
  const { user, login, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🍳</span>
          <span className="text-lg font-bold text-gray-900">
            {t('app.name')}
          </span>
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            to="/"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-primary-600"
          >
            {t('nav.recipes')}
          </Link>
          {user ? (
            <>
              <Link
                to="/recipes/new"
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700"
              >
                <PlusIcon className="h-4 w-4" />
                {t('nav.addRecipe')}
              </Link>
              <Button variant="ghost" size="sm" onClick={logout}>
                {t('nav.logOut')}
              </Button>
            </>
          ) : (
            <Button variant="primary" size="sm" onClick={login}>
              {t('nav.logIn')}
            </Button>
          )}
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
};
