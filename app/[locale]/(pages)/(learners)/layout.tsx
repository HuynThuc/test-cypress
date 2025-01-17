'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { NextSeo } from 'next-seo';

import '@fortawesome/fontawesome-free/css/all.min.css';
import '@/styles/nprogress.css';

import { PopupContextProvider } from '@/shared/context/pop-up';

import { LearnersLayoutMain } from '@/modules/learners/components/learners-layout';

export default function LearnersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 0,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <PopupContextProvider>
        <div>
          <NextSeo
            title="MDD"
            additionalMetaTags={[
              {
                property: 'keywords',
                content:
                  'GiaDinhDev, Software Developer, Sofware Engineer, Developer, Portfolio, Devops, Cloud Native',
              },
            ]}
          />
          <div className="min-h-[100vh] w-full bg-background">
            <LearnersLayoutMain>{children}</LearnersLayoutMain>
          </div>
        </div>
      </PopupContextProvider>
    </QueryClientProvider>
  );
}
