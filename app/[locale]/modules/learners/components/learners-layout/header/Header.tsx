'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { useSelector } from 'react-redux';

import { Icons } from '@/shared/components/Icon/icons';
import { Avatar, AvatarFallback, Button } from '@/shared/components/shacdn-ui';
import { APP_NAME } from '@/shared/constants';
import { useScreenSize } from '@/shared/hook';

import { UserInfo } from '@/modules/helenngolang/types';
import {
  Search,
  SwitchLanguage,
  ThemeSwitchButton,
} from '@/modules/learners/components/learners-layout/header/widgets';
import { HamburgerMenu } from '@/modules/learners/components/learners-layout/header/widgets';
import { RootState } from '@/modules/learners/store';

type HeaderProps = {
  userInfo: UserInfo | null;
};

export const Header = ({ userInfo }: HeaderProps) => {
  const { sm, lg } = useScreenSize();
  const route = useRouter();
  const locale = useSelector((state: RootState) => state.locale.currentLocale);
  const [isSearchActive, setIsSearchActive] = useState(false);

  useEffect(() => {
    const header = document.getElementById('main-header');
    const handleScroll = () => {
      if (header) {
        if (window.scrollY > 0) {
          header.classList.add('shadow-e3', 'bg-surface');
        } else {
          header.classList.remove('shadow-e3', 'bg-surface');
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (lg) {
      setIsSearchActive(false);
    }
  }, [lg]);

  const renderUser = () =>
    userInfo ? (
      <Avatar className="shrink-0 lg:h-12 lg:w-12 sm:h-11 sm:w-11 h-9 w-9 rounded-full border-2 border-[#96E6A1]">
        <Image
          rel="preload"
          src={userInfo.photoUrl || '/images/default_avatar.webp'}
          alt={userInfo.fullname}
          width={48}
          height={48}
        />
        <AvatarFallback>{userInfo.fullname[0]}</AvatarFallback>
      </Avatar>
    ) : (
      <Button
        variant={sm ? 'outline' : null}
        size="icon"
        className="lg:h-10 lg:w-10 sm:h-9 sm:w-9 sm:rounded-full w-fit h-fit rounded-none text-icon focus-visible:ring-0"
        onClick={() => route.push('/signin')}
      >
        <Icons.login />
      </Button>
    );
  // Store temporarily
  // const renderNotiButton = () =>
  //   userInfo && (
  //     <Button
  //       variant={sm ? 'outline' : null}
  //       size="icon"
  //       className="lg:h-10 lg:w-10 sm:h-9 sm:w-9 sm:rounded-full w-fit h-fit rounded-none text-icon focus-visible:ring-0"
  //     >
  //       {sm ? <Icons.notiFill size={24} /> : <Icons.noti size={24} />}
  //     </Button>
  //   );

  return (
    <header
      id="main-header"
      className={twMerge(
        'sticky z-[100] top-0 left-0 w-full lg:h-20 sm:h-16 h-14 lg:px-6 lg:pl-6 sm:pl-[18px] sm:pr-4 pl-3 pr-2 flex items-center xl:gap-6 lg:gap-4 gap-0 lg:justify-normal justify-between bg-background',
      )}
    >
      {isSearchActive && !lg ? (
        <div className="grow flex items-center shrink-0 xl:gap-4 gap-3 h-fit pr-1">
          <Icons.arrowLeft
            className="cursor-pointer text-icon w-6 h-6 shrink-0"
            onClick={() => setIsSearchActive(false)}
          />
          <Search />
        </div>
      ) : (
        <>
          <div className="flex sm:gap-3 gap-2 items-center shrink-0 z-20 h-11 sm:w-64 w-fit">
            <HamburgerMenu />
            <div className="flex sm:gap-1.5 gap-1 h-full sm:w-[205px] w-fit justify-center items-center mx-auto">
              <Link
                href={`/${locale}/`}
                className="flex gap-1.5 items-center text-lg font-semibold h-full w-full"
              >
                <Image
                  rel="preload"
                  src={'/images/rabito_english_logo.svg'}
                  alt="Rabito English"
                  height={sm ? 38 : 28}
                  width={sm ? 39.5 : 29.5}
                  priority
                />
                <h1 className="text-sm font-bold h-full sm:w-[156px] w-fit flex items-center tracking-[0.75px]">
                  {APP_NAME.toUpperCase()}
                </h1>
              </Link>
            </div>
          </div>
          <div className="lg:grow grow-0 flex items-center shrink-0 xl:gap-4 gap-3 h-fit">
            <div className="grow">
              {lg ? (
                <Search />
              ) : (
                <Icons.search
                  className="cursor-pointer text-icon w-6 h-6 shrink-0"
                  onClick={() => setIsSearchActive(!isSearchActive)}
                />
              )}
            </div>
            {sm && <SwitchLanguage />}
            <div className="w-[2px] h-7 bg-[#90A3BF] rounded-full sm:block hidden"></div>
            {/* Store temporarily */}
            {/* {renderNotiButton()} */}
            {sm && <ThemeSwitchButton />}
            {renderUser()}
          </div>
        </>
      )}
    </header>
  );
};

// <Button
//   variant="ghost"
//   onClick={() => setIsSearchActive(!isSearchActive)}
// >
//   <Icons.search className="cursor-pointer text-icon w-6 h-6 shrink-0" />
// </Button>;
