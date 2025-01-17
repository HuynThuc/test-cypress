'use client';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NextResponse } from 'next/server';

import { SideNavIcons } from '@/shared/components/Icon/icons';
import { useGetCurrentLocale, useScreenSize } from '@/shared/hook';
import { apiClient } from '@/shared/api';
import { useCustomRouter } from '@/shared/utils/routerCustom';

import { sidenavData } from '@/modules/learners/constants';
import { Section, SubSection } from '@/modules/learners/types';
import { RootState } from '@/modules/learners/store';
import { clearLoginResponse } from '@/modules/learners/store/slice';
import {
  AppearanceDropdown,
  LanguageDropdown,
} from '@/modules/learners/components/landing-page/homepage/widgets';

type NewSideNavProps = {
  isCollapsed: boolean;
};

export const NewSideNav = ({ isCollapsed }: NewSideNavProps) => {
  const currentPath = usePathname();
  const { pushWithLocale } = useCustomRouter(useGetCurrentLocale);
  const locale = useSelector((state: RootState) => state.locale.currentLocale);
  const t = useTranslations('SideNav');
  const { sm } = useScreenSize();
  const [openSubSection, setOpenSubSection] = useState(0);
  const dispatch = useDispatch();
  const session = useSelector((state: RootState) => state.session.data);
  const handleLogout = async () => {
    try {
      const res = await apiClient.delete('/auth/session');
      const response = NextResponse.json(res);
      if (response.status === 200) {
        dispatch(clearLoginResponse());
        pushWithLocale('/signin');
      } else dispatch(clearLoginResponse());
    } catch (error) {
      // not-found
    }
  };

  const isActive = (path: string) => {
    if (path === '/') {
      if (locale === 'en') return currentPath === '/' || currentPath === '/en';
      else return currentPath === '/' + locale;
    }
    if (locale === 'en') {
      return (
        currentPath === path ||
        currentPath.startsWith(path + '/') ||
        currentPath === '/en' + path
      );
    } else {
      const localizedPath = '/' + locale + path;
      return (
        currentPath === localizedPath ||
        currentPath.startsWith(localizedPath + '/')
      );
    }
  };

  const renderSubSectionItem = (subSection: SubSection, i: number) => {
    if (subSection.icon === 'language')
      return !sm ? (
        <div
          onClick={() => setOpenSubSection(openSubSection === 1 ? 0 : 1)}
          key={i}
        >
          <LanguageDropdown
            subSection={subSection}
            isCollapsed={isCollapsed}
            isOpen={openSubSection === 1}
          />
        </div>
      ) : null;
    if (subSection.icon === 'appearance')
      return !sm ? (
        <div
          onClick={() => setOpenSubSection(openSubSection === 2 ? 0 : 2)}
          key={i}
        >
          <AppearanceDropdown
            subSection={subSection}
            isCollapsed={isCollapsed}
            isOpen={openSubSection === 2}
          />
        </div>
      ) : null;

    const Icon = isActive(subSection.path)
      ? SideNavIcons.filled[subSection.icon]
      : SideNavIcons.outlined[subSection.icon];

    return (
      <li
        key={subSection.id}
        onClick={() => {
          if (subSection.id === 'log-out') handleLogout();
          else pushWithLocale(subSection.path);
        }}
        className={`relative flex gap-3 items-center cursor-pointer ${isCollapsed ? `${isActive(subSection.path) ? 'text-primary' : ''}` : `w-full ${isActive(subSection.path) ? 'text-text-onPrimary' : ''}`}`}
      >
        {isActive(subSection.path) && (
          <div
            className={`absolute -left-3 h-10 ${isCollapsed ? 'w-0 opacity-0' : 'w-64 opacity-100'} bg-primary rounded`}
            style={{
              transitionProperty: 'height width opacity',
              transitionDuration: '0.2s',
              transitionBehavior: 'allow-discrete',
            }}
          />
        )}
        <Icon className="relative w-7 h-7 shrink-0" />
        <p
          className={`relative font-medium w-full overflow-hidden whitespace-nowrap ${isCollapsed ? 'hidden' : ''}`}
        >
          {t(subSection.name)}
        </p>
      </li>
    );
  };

  const renderSubSections = (subSections: SubSection[]) =>
    subSections
      .filter((subSection) => !(!session && subSection.id == 'log-out'))
      .map((subSection, index) => renderSubSectionItem(subSection, index));

  const sidenavSectionElements = sidenavData
    .filter((section) => !(!session && section.id == 'general'))
    .map((section: Section<SubSection>) => (
      <div
        className={`flex flex-col transition-[border,padding] duration-200 delay-200 ${isCollapsed ? 'pb-8 border-b last:pb-0 last:border-none' : 'border-none'}`}
        key={section.id}
      >
        <h1
          className={`text-[10px] leading-[14px] text-text-light font-medium mb-3 overflow-hidden whitespace-nowrap ${isCollapsed ? 'hidden' : ''}`}
        >
          {t(section.title).toUpperCase()}
        </h1>
        <ul className="flex flex-col transition-[width] delay-200 gap-4 text-label-large">
          {renderSubSections(section.subSections)}
        </ul>
      </div>
    ));

  return (
    <div
      className={`flex flex-col gap-8 h-fit pb-6 text-icon ${isCollapsed ? 'lg:px-6 px-[18px] lg:w-[76px] w-16 xl:pt-8 pt-3' : 'px-6 w-[280px] xl:pt-6 pt-4'}`}
      style={{
        transitionProperty: 'width padding',
        transitionDuration: '0.2s',
        transitionBehavior: 'allow-discrete',
      }}
    >
      {sidenavSectionElements}
    </div>
  );
};
