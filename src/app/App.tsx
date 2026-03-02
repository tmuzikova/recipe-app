import { AuthProvider } from '@/contexts/AuthContext';
import { AppRouter } from '@/routes';

export const App = () => (
  <AuthProvider>
    <AppRouter />
  </AuthProvider>
);
