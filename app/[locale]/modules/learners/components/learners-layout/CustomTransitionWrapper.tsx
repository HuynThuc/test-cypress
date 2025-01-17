'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

import TransitionEffect from '@/shared/components/transition/TransitionEffect';

import { CategorySlider } from '@/modules/learners/components/other-page/list-video';

export const CustomTransitionWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();

  // TriP: Sao goi api o day,??? r boc voo cai no call mọi trang???

  // const { data: listVideoCategories, isSuccess } = useGetAllVideoCategories('');
  // const dispatch = useDispatch();
  // const pathname = usePathname();

  // useEffect(() => {
  //   if (isSuccess) {
  //     dispatch(setCategories(listVideoCategories)); // Sync with Redux
  //   }
  // }, [isSuccess, listVideoCategories, dispatch]);

  const checkPathName = () => {
    // Regular expression to match the desired paths
    const regex = /^\/videos(\/c\/[^/]+)?\/?$/;

    return regex.test(pathname);
  };

  return (
    <>
      {checkPathName() && <CategorySlider />}
      <TransitionEffect>{children}</TransitionEffect>
    </>
  );
};
