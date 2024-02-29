import './wdyr';
import { AppWithRouter } from './providers';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import './globals.css';

const rootNode = document.getElementById('root');

if (!rootNode) {
  throw new Error('Root element with id "root" not found');
}

const queryClient = new QueryClient();

createRoot(rootNode)
  .render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <AppWithRouter />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </StrictMode>,
  );
