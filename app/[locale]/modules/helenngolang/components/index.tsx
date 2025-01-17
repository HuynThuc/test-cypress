import React from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '../../../shared/components/shacdn-ui/Button.components';
import LandingPage from './landingpage/Landingpage';
import { useLoggedInUser } from '../../../shared/hook/GetLoggedInUser';

const HelenNgolang = () => {
  const loggedInUser = useLoggedInUser();

  const { push } = useRouter();
  const handleSignIn = () => {
    push('/signin');
  };

  if (loggedInUser === undefined) {
    return <>Loading</>;
  }

  return (
    <div className="h-screen flex flex-col w-full">
      <>
        {loggedInUser != null ? (
          <></>
        ) : (
          <div className="flex justify-end p-4">
            <Button
              onClick={() => handleSignIn()}
              className="hover:bg-white rounded-2xl border-2 border-dashed border-black bg-white px-6 py-3 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
            >
              Sign In
            </Button>
          </div>
        )}

        <div className=" w-full bg-white">
          {loggedInUser != null ? (
            <></>
          ) : (
            <>
              <div className="">
                <LandingPage />
              </div>
            </>
          )}
        </div>
      </>
    </div>
  );
};

export default HelenNgolang;
