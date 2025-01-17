'use client';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

import iconHelper from '@/shared/components/Icon/iconHelper';
import { icons, Icons, SideNavIcons } from '@/shared/components/Icon/icons';
import { useScreenSize } from '@/shared/hook';

import { SubSection } from '@/modules/learners/types';

type IconPath = keyof typeof icons;

export const AppearanceDropdown = ({
  subSection,
  isCollapsed,
  isOpen,
}: {
  subSection: SubSection;
  isCollapsed: boolean;
  isOpen: boolean;
}) => {
  const { theme: currentTheme, setTheme } = useTheme();
  const t = useTranslations('Home');
  const { sm } = useScreenSize();

  const Icon = SideNavIcons.outlined[subSection.icon];

  const menuItems = [
    { key: 'useDeviceTheme', theme: 'system', path: 'deviceIcon' },
    { key: 'darkTheme', theme: 'dark', path: 'darkIcon' },
    { key: 'lightTheme', theme: 'light', path: 'lightIcon' },
  ];

  const MenuIcon = iconHelper(icons);

  // Function to get the appropriate icon or image based on the theme mode and path
  const getCurrentIcon = (pathMode: IconPath) => {
    return (
      <MenuIcon
        name={pathMode}
        className="text-icon"
        size="24px"
        useCurrentColor
        altAlignment
      />
    );
  };

  const renderDropdownMenuItem = (
    key: string,
    theme: string,
    path: IconPath,
  ) => {
    const selectedItemStyle = currentTheme === theme ? 'text-primary' : '';

    return (
      <div
        key={theme}
        onClick={() => setTheme(theme)}
        className={`ml-4 pt-4 flex gap-3 ${selectedItemStyle}`}
      >
        {getCurrentIcon(path)}
        {t(key)}
      </div>
    );
  };

  const dropdownMenuElement = menuItems.map(({ key, theme, path }) =>
    renderDropdownMenuItem(key, theme, path as IconPath),
  );

  return (
    <li
      key={subSection.id}
      className={
        !sm && !isCollapsed ? 'relative cursor-pointer flex flex-col' : 'hidden'
      }
      // onClick={() => setOpen(!open)}
    >
      <div className="flex justify-between cursor-pointer items-center">
        <div className="flex gap-3 items-center">
          <Icon className="relative w-7 h-7 shrink-0" />
          <p className="relative font-medium w-full overflow-hidden whitespace-nowrap">
            {t(subSection.name)}
          </p>
        </div>
        <Icons.arrowDown
          className={`w-5 h-5 duration-200 ${isOpen ? '-rotate-180' : 'rotate-0'}`}
        />
      </div>
      <div
        className={`duration-200 overflow-hidden flex flex-col ${isOpen ? 'h-[120px]' : 'h-0'}`}
      >
        {dropdownMenuElement}
      </div>
    </li>
  );
};
