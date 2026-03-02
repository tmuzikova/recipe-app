import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import netlifyIdentity, { type User } from 'netlify-identity-widget';

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  login: () => void;
  logout: () => void;
  getToken: () => Promise<string | null>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    netlifyIdentity.init({});

    const onLogin = (u?: User | null) => setUser(u ?? null);
    const onLogout = () => setUser(null);
    const onInit = (u?: User | null) => {
      setUser(u ?? null);
      setLoading(false);
    };

    netlifyIdentity.on('login', onLogin);
    netlifyIdentity.on('logout', onLogout);
    netlifyIdentity.on('init', onInit);

    const current = netlifyIdentity.currentUser();
    queueMicrotask(() => {
      onInit(current ?? null);
    });

    return () => {
      netlifyIdentity.off('login', onLogin);
      netlifyIdentity.off('logout', onLogout);
      netlifyIdentity.off('init', onInit);
    };
  }, []);

  const login = useCallback(() => {
    netlifyIdentity.open('login');
  }, []);

  const logout = useCallback(() => {
    netlifyIdentity.logout();
  }, []);

  const getToken = useCallback((): Promise<string | null> => {
    const current = netlifyIdentity.currentUser();
    if (!current) return Promise.resolve(null);
    return current.jwt().then((token: string) => token ?? null);
  }, []);

  const value: AuthContextValue = {
    user,
    loading,
    login,
    logout,
    getToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/** Hook to access auth state. Must be used within AuthProvider. */
// eslint-disable-next-line react-refresh/only-export-components -- useAuth is the public API for AuthContext
export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
};
