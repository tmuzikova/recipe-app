import { BrowserRouter, Routes, Route } from 'react-router';
import { PageLayout } from '@/components/layout/PageLayout';
import { HomePage } from '@/pages/HomePage';
import { RecipePage } from '@/pages/RecipePage';
import { CreateRecipePage } from '@/pages/CreateRecipePage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export const AppRouter = () => (
  <BrowserRouter>
    <PageLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipes/new" element={<CreateRecipePage />} />
        <Route path="/recipes/:slug" element={<RecipePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </PageLayout>
  </BrowserRouter>
);
