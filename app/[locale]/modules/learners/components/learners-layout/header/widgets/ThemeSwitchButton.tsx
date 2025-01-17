import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import { IoIosColorPalette } from 'react-icons/io';
import { useState } from 'react';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/shacdn-ui';
import iconHelper from '@/shared/components/Icon/iconHelper';
import { icons } from '@/shared/components/Icon/icons';
import { useScreenSize } from '@/shared/hook';

import { ColorSwitchPrimary } from '@/modules/learners/components/learners-layout/header/widgets';

type IconPath = keyof typeof icons;
export const ThemeSwitchButton = () => {
  const { theme, setTheme } = useTheme();
  const t = useTranslations('Home');
  const { sm } = useScreenSize();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Define the menu items with keys, themes, and paths for images/icons
  const menuItems = [
    { key: 'useDeviceTheme', theme: 'system', path: 'deviceIcon' },
    { key: 'darkTheme', theme: 'dark', path: 'darkIcon' },
    { key: 'lightTheme', theme: 'light', path: 'lightIcon' },
  ];

  const Icon = iconHelper(icons);

  // Function to get the appropriate icon or image based on the theme mode and path
  const getCurrentIcon = (pathMode: IconPath) => {
    return <Icon name={pathMode} size="24px" useCurrentColor altAlignment />;
  };

  const renderDropdownMenuItem = (
    key: string,
    itemTheme: string,
    path: IconPath,
  ) => {
    const iconTheme =
      theme === itemTheme
        ? 'bg-primary text-text-onPrimary'
        : 'text-text-light';

    return (
      <DropdownMenuItem
        key={key}
        onClick={() => {
          setTheme(itemTheme);
        }}
        className={`rounded-[4px] flex gap-2 ${iconTheme}`}
      >
        <div
          className={`flex items-center justify-center ${theme === itemTheme ? 'text-text-onPrimary' : 'text-icon'}`}
        >
          {getCurrentIcon(path)}
        </div>
        {t(key)}
      </DropdownMenuItem>
    );
  };

  const dropdownMenuElement = menuItems.map(({ key, theme: itemTheme, path }) =>
    renderDropdownMenuItem(key, itemTheme, path as IconPath),
  );

  const currIconPath = menuItems.find((item) => item.theme === theme)
    ?.path as IconPath;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={sm ? 'outline' : null}
          size="icon"
          className="lg:h-10 lg:w-10 sm:h-9 sm:w-9 sm:rounded-full h-fit w-fit rounded-none text-icon focus-visible:ring-0"
        >
          {getCurrentIcon(currIconPath)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="min-w-[180px] border-none px-2 py-3 mr-2 mt-2 bg-surface dark:bg-[#2f3046] shadow-dropdown translate-x-[-10px]"
      >
        {dropdownMenuElement}
        <DropdownMenuItem
          onSelect={(event: Event) => event.preventDefault()}
          className={`flex items-center my-1 h-[36px] rounded-[4px] ${
            isModalOpen ? 'bg-primary text-text-onPrimary' : ''
          }`}
        >
          <IoIosColorPalette className="w-[24px] h-[24px]" />
          <ColorSwitchPrimary
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
