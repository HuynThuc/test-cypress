import '@fortawesome/fontawesome-free/css/all.min.css';
import React from 'react';

import { MainLandingPage } from '@/modules/learners/components/landing-page/MainLandingPage';

export default function LearnersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLandingPage>{children}</MainLandingPage>;
}
