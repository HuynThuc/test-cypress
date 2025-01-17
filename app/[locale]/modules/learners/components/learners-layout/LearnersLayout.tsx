'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

import { useScreenSize } from '@/shared/hook';
import useRouteChangeNProgress from '@/shared/hook/UseNprogress';
import ErrorBoundary from '@/shared/components/error/ErrorBoundary';

import { Footer } from '@/app/[locale]/modules/learners/components/learners-layout/footer';
import { Header } from '@/app/[locale]/modules/learners/components/learners-layout/header';
import { CustomTransitionWrapper } from '@/modules/learners/components/learners-layout';
import { RootState } from '@/modules/learners/store';
import { setIsCollapsed } from '@/modules/learners/store/slice';
import { NewSideNav } from '@/modules/learners/components/learners-layout/side-nav';

export const LearnersLayoutMain = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { sm, xl } = useScreenSize();
  const currentSession = useSelector((state: RootState) => state.session.data);
  const isCollapsedSideNav = useSelector(
    (state: RootState) => state.collapsedSidenav.isCollapsed,
  );

  useEffect(() => {
    dispatch(setIsCollapsed(!xl || isCollapsedSideNav));
  }, [isCollapsedSideNav, xl]);

  useRouteChangeNProgress(); // Hook to track route changes
  return (
    <div className="w-full h-full">
      <Header userInfo={currentSession?.user ?? null} />
      <div className="flex w-full max-w-[1920px] mx-auto">
        <div
          className={`h-full sticky ${isCollapsedSideNav ? 'xl:top-[60px]' : 'xl:top-[68px]'} lg:top-20 sm:top-16 top-14`}
        >
          {sm && <NewSideNav isCollapsed={isCollapsedSideNav} />}
        </div>
        <div className="grow flex flex-col justify-between min-h-screen lg:px-0 sm:pr-4 sm:pl-0 px-2 overflow-hidden md:pt-3 pt-1">
          <CustomTransitionWrapper>
            <ErrorBoundary router={router}>{children}</ErrorBoundary>
          </CustomTransitionWrapper>
          <div className="w-full">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};
