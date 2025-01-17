import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React, { useMemo } from 'react';

const SideBarComponent = () => {
  const t = useTranslations('Home');

  // Use useMemo to memoize the render of each image
  const activeUsersImage = useMemo(
    () => (
      <Image
        rel="preload"
        alt="active users"
        src="/images/active-users.webp"
        width={242}
        height={407}
        className="w-auto h-auto"
        priority
      />
    ),
    [],
  );

  const advertisement1Image = useMemo(
    () => (
      <Image
        rel="preload"
        alt="advertisement 1"
        src="/images/advertisement-1.webp"
        width={242}
        height={430}
        className="w-auto h-auto"
        priority
      />
    ),
    [],
  );

  // const advertisement2Image = useMemo(
  //   () => (
  //     <Image
  //       rel="preload"
  //       alt="advertisement 2"
  //       src="/images/advertisement-2.webp"
  //       width={242}
  //       height={432}
  //       className="w-auto h-auto"
  //       priority
  //     />
  //   ),
  //   [],
  // );

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h5>{t('topActiveUsers')}</h5>
        <div className="w-full">{activeUsersImage}</div>
      </div>
      <div className="flex flex-col gap-4">
        <h5>{t('activeLiveRooms')}</h5>
      </div>
      <div className="flex flex-col gap-3">
        {advertisement1Image}
        {/* {advertisement2Image} */}
      </div>
    </div>
  );
};

export const SideBar = React.memo(SideBarComponent);
