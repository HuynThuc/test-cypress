import React from 'react';

import { HorizontalNavigation } from '../../../../../shared/components/navigation';

export const SystemQuoteCategoryHorizontalNavigation = () => {
  const items = [
    {
      name: 'Data',
      href: 'helpers/system-quote',
    },
    {
      name: 'Category',
      href: 'helpers/system-quote/category',
    },
  ];
  return <HorizontalNavigation items={items} />;
};
