'use client';
import React from 'react';

import EndpointComponent from './Endpoint';
import { InProgressComponent } from '../../../../shared/components';
import { useScreenSize, useLoggedInUser } from '../../../../shared/hook';

export const DocsSideSection = () => {
  const { sm, md } = useScreenSize();
  const loggedInUser = useLoggedInUser();

  return !sm && !md ? (
    <div className="sticky h-[100vh] grow flex flex-col bg-opacity-50 p-2 top-0 left-0">
      <div className="text-md pb-20">
        {loggedInUser && <EndpointComponent />}
      </div>
    </div>
  ) : (
    <div className="fixed z-10 h-screen w-full items-center justify-center bg-white">
      <InProgressComponent />
    </div>
  );
};
