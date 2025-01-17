'use client';

import { SideBar } from '@/modules/learners/components/learners-layout/sidebar/Sidebar';

export const MainLandingPage = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="relative flex grow">
      <div className="relative w-full lg:overflow-hidden overflow-visible lg:border-r lg:border-border/50 lg:pr-6 pb-[66px]">
        {children}
      </div>
      <div className="h-full shrink-0 w-[290px] hidden lg:block">
        <div className="h-full lg:mx-6 mx-4 pb-[70px]">
          <SideBar />
        </div>
      </div>
    </div>
  );
};
