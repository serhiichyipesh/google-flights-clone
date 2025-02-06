import './index.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, ViewProvider } from './providers';

import { App } from './App';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

export const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <ViewProvider>
          <App />
        </ViewProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
