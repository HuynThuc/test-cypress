import { MenuIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/shared/components/shacdn-ui';
import { APP_NAME } from '@/shared/constants';
import { useScreenSize } from '@/shared/hook';

import { toggleSideNav } from '@/modules/learners/store/slice';
import { NewSideNav } from '@/modules/learners/components/learners-layout/side-nav';

export const HamburgerMenu = () => {
  const { xl } = useScreenSize();
  const router = useRouter();
  const dispatch = useDispatch();

  const [openSidenav, setOpenSidenav] = useState(false);

  const scrollableDivRef = useRef<HTMLDivElement>(null);

  const toggleCollapsedSideNav = () => {
    dispatch(toggleSideNav());
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (scrollableDivRef.current) {
        const handleScroll = () => {
          const divElement = scrollableDivRef.current;
          const logoSection = document.getElementById('logo-section');

          if (divElement && logoSection) {
            if (divElement.scrollTop > 12) {
              logoSection.classList.add('shadow-e3', 'bg-surface');
            } else {
              logoSection.classList.remove('shadow-e3', 'bg-surface');
            }
          }
        };

        const divElement = scrollableDivRef.current;
        if (divElement) {
          divElement.addEventListener('scroll', handleScroll);
        }

        // Cleanup event listener when the sheet is closed
        return () => {
          if (divElement) {
            divElement.removeEventListener('scroll', handleScroll);
          }
        };
      }
    }, 100); // Delay to ensure the ref is mounted

    return () => clearTimeout(timer);
  }, [openSidenav]);

  return !xl ? (
    <Sheet open={openSidenav} onOpenChange={setOpenSidenav}>
      <SheetTrigger className="focus-visible:outline-none">
        <MenuIcon
          className="h-7 w-7 cursor-pointer text-icon"
          onClick={() => setOpenSidenav(!openSidenav)}
        />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="z-[120] w-fit h-[100dvh] p-0 flex flex-col gap-0 border-none focus-visible:outline-none"
      >
        <div
          className="flex gap-3 items-center shrink-0 h-20 pl-6 duration-300"
          id="logo-section"
        >
          <MenuIcon
            className="h-7 w-7 cursor-pointer text-icon"
            onClick={() => setOpenSidenav(!openSidenav)}
          />
          <div className="flex gap-1.5 select-none">
            <div
              onClick={() => router.replace('/')}
              className="flex gap-1.5 items-center text-lg font-semibold"
            >
              <Image
                rel="preload"
                src={'/images/rabito-english.ico'}
                alt="Rabito English"
                width={39.5}
                height={39.5}
                priority
              />
              <h1 className="text-sm font-bold w-32">
                {APP_NAME.toUpperCase()}
              </h1>
            </div>
          </div>
        </div>
        <div
          className="grow overflow-auto scrollbar-hidden"
          ref={scrollableDivRef}
        >
          <NewSideNav isCollapsed={false} />
        </div>
      </SheetContent>
    </Sheet>
  ) : (
    <MenuIcon
      className="h-7 w-7 cursor-pointer text-icon"
      onClick={() => toggleCollapsedSideNav()}
    />
  );
};
