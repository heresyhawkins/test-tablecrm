import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ProductForm } from './components/ui/product-form/ProductForm';
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './App.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ProductForm />
    </QueryClientProvider>
  </React.StrictMode>
);
