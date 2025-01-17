'use client';

import { GoogleOAuthProvider } from '@react-oauth/google';

import { ToastProvider } from '@/shared/stores';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GoogleOAuthProvider clientId="48843676282-h9kgrtsl9f6g46b53ln05i79ifehm5p9.apps.googleusercontent.com">
        <ToastProvider>
          <main>
            <section className="">{children}</section>
          </main>
        </ToastProvider>
      </GoogleOAuthProvider>
    </>
  );
}
