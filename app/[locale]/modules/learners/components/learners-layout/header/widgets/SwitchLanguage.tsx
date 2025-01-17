'use client';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components';
import { SUPPORTED_LOCALES } from '@/shared/constants';
import { useGetCurrentLocale } from '@/shared/hook';
import { Icons } from '@/shared/components/Icon/icons';
import { useCustomRouter } from '@/shared/utils/routerCustom';

import { GetLocaleFullname } from '@/modules/learners/utils';
import { setLocale } from '@/modules/learners/store/slice';
import { RootState } from '@/modules/learners/store';

export const SwitchLanguage = () => {
  const dispatch = useDispatch();
  const currentLocale =
    useSelector((state: RootState) => state.locale.currentLocale) || 'en';
  const { pushWithReplace } = useCustomRouter(useGetCurrentLocale);

  const renderDropdownMenuItem = (locale: string) => {
    const localeFullname = GetLocaleFullname(locale);

    const selectedItemStyle =
      currentLocale === locale
        ? 'bg-primary text-text-onPrimary'
        : 'text-text-light';

    return (
      <DropdownMenuItem
        key={locale}
        onClick={() => {
          dispatch(setLocale(locale));
          pushWithReplace(locale);
        }}
        className={`rounded px-2 py-1 ${selectedItemStyle}`}
      >
        <Image
          className="rounded-full object-cover mr-2 h-6 w-6"
          src={`/images/${locale}.svg`}
          alt={localeFullname}
          width={24}
          height={24}
        />
        {localeFullname}
      </DropdownMenuItem>
    );
  };

  const dropdownMenuElement = SUPPORTED_LOCALES.map((locale) =>
    renderDropdownMenuItem(locale),
  );

  const currentLocaleFullname = GetLocaleFullname(currentLocale);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="sm:flex hidden gap-2 items-center cursor-pointer self-stretch">
          <Image
            className="rounded object-cover h-6 w-8"
            src={`/images/${currentLocale}.svg`}
            alt={currentLocaleFullname}
            width={32}
            height={24}
          />
          <span className="md:block hidden">{currentLocaleFullname}</span>
          <Icons.arrowDown className="h-6 w-6 text-icon" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[180px] flex flex-col gap-2 bg-surface border-none px-2 py-3">
        {dropdownMenuElement}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
