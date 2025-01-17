import React from 'react';

import '@fortawesome/fontawesome-free/css/all.min.css';

import { MainOthersPage } from '@/modules/learners/components/other-page/MainOthersPage';

export default function LearnersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainOthersPage>{children}</MainOthersPage>;
}
