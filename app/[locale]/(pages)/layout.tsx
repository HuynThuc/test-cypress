'use client';
import '@fortawesome/fontawesome-free/css/all.min.css';
import React, { lazy } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'next-themes';

import { ToastProvider } from '@/shared/stores';

import store from '@/modules/learners/store';
import { persistor } from '@/modules/learners/store';

const LocaleLayoutMain = lazy(
  () => import('@/modules/learners/components/locale-layout/LocaleLayoutMain'),
);

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <ToastProvider>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider attribute="class" defaultTheme="system">
            <LocaleLayoutMain>{children}</LocaleLayoutMain>
          </ThemeProvider>
        </PersistGate>
      </ToastProvider>
    </Provider>
  );
}
