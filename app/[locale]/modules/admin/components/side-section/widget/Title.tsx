// https://nextjs.org/docs/app/api-reference/functions/use-router
'use client';
import React from 'react';
import { usePathname, useRouter } from 'next/navigation';

interface TagProps {
  slug: string;
  title: string;
}

export const Title = ({ slug, title }: TagProps) => {
  const baseClasses = `px-2 rounded-lg font-light text-sm cursor-pointer`;
  const oppaCity = 'bg-blue-500 text-white';
  const route = usePathname();

  const classes =
    baseClasses + (route.startsWith(`/${slug}`) && ` ${oppaCity}`);
  const router = useRouter();
  const handleNavigate = () => {
    router.push(`/${slug}`);
  };

  return route.startsWith(`/${slug}`) ? (
    <p className={classes}>{title}</p>
  ) : (
    <div onClick={handleNavigate}>
      <p className={classes}>{title}</p>
    </div>
  );
};
