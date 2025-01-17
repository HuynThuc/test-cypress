import React from 'react';
import { useRouter } from 'next/navigation';

import { Title } from '../widget/Title';

type IFTitle = {
  title: string;
  slug: string;
};

const listTitle: IFTitle[] = [
  {
    title: 'Helen Short Speaking',
    slug: 'helpers/helen-short-speaking',
  },
  {
    title: 'Helen Speaking',
    slug: 'helpers/helen-speaking',
  },
  {
    title: 'System Quote',
    slug: 'helpers/system-quote',
  },
];

export const HelperEndpointComponent = () => {
  const router = useRouter();

  const handleOnClick = () => {
    router.push('/helpers/helen-short-speaking');
  };

  return (
    <div className="flex flex-grow flex-col gap-1 pt-4">
      <h1 className="cursor-pointer px-2 pb-2" onClick={handleOnClick}>
        Management
      </h1>
      {listTitle.map((title) => (
        <Title key={title.slug} slug={title.slug} title={title.title} />
      ))}
    </div>
  );
};
