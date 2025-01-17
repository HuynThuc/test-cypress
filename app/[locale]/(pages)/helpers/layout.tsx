'use client';

import { QueryClient, QueryClientProvider } from 'react-query';
import { NextSeo } from 'next-seo';

import { ToastProvider } from '../../shared/stores';
import { PopupContextProvider } from '../../shared/context/pop-up';
import { DocsSideSection } from '../../modules/helpers/components/side-section';

export default function HelpersLayout({
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
      <ToastProvider>
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
            <div
              className="flex min-h-[100vh] w-screen max-w-full"
              style={{ backgroundColor: 'rgb(225, 250, 255)' }}
            >
              <DocsSideSection />

              <div className="w-[85%] pt-5 pb-10 px-2">{children}</div>
            </div>
          </div>
        </PopupContextProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
}
