import React from 'react';
import { useRouter } from 'next/navigation';

import { Title } from '../widget/Title';

type IFTitle = {
  title: string;
  slug: string;
};

const listTitle: IFTitle[] = [
  {
    title: 'Helper History Actions',
    slug: 'admin/helper-activity',
  },
  {
    title: 'User',
    slug: 'admin/user',
  },
  {
    title: 'User Agents',
    slug: 'admin/user-agents',
  },
  {
    title: 'Subscription plans',
    slug: 'admin/subscription-plans',
  },
  {
    title: 'Contact / Report',
    slug: 'admin/contact-report',
  },
];

export const AdminEndpointComponent = () => {
  const router = useRouter();

  const handleOnClick = () => {
    router.push('/admin/user');
  };

  return (
    <div className="flex flex-grow flex-col gap-1 pt-4">
      <h1 className="cursor-pointer px-2 pb-2" onClick={handleOnClick}>
        Admin management
      </h1>
      {listTitle.map((title) => (
        <Title key={title.slug} slug={title.slug} title={title.title} />
      ))}
    </div>
  );
};
