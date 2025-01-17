'use client';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Icons, SideNavIcons } from '@/shared/components/Icon/icons';
import { useGetCurrentLocale, useScreenSize } from '@/shared/hook';
import { SUPPORTED_LOCALES } from '@/shared/constants';

import { SubSection } from '@/modules/learners/types';
import { GetLocaleFullname } from '@/modules/learners/utils';

export const LanguageDropdown = ({
  subSection,
  isCollapsed,
  isOpen,
}: {
  subSection: SubSection;
  isCollapsed: boolean;
  isOpen: boolean;
}) => {
  const t = useTranslations('SideNav');
  const { sm } = useScreenSize();
  const currentLocale = useGetCurrentLocale();
  const { push } = useRouter();

  // const [open, setOpen] = useState(false);
  const Icon = SideNavIcons.outlined[subSection.icon];

  const renderDropdownMenuItem = (locale: string) => {
    const localeFullname = GetLocaleFullname(locale);

    const selectedItemStyle =
      currentLocale === locale ? 'text-primary' : 'text-text-light';

    return (
      <div
        key={locale}
        onClick={() => push(`/${locale}`)}
        className={`ml-4 mt-4 flex gap-3 ${selectedItemStyle}`}
      >
        <Image
          rel="preload"
          className="rounded-full object-cover shrink-0 h-6 w-6"
          src={`/images/${locale}.svg`}
          alt={localeFullname}
          width={24}
          height={24}
        />
        {localeFullname}
      </div>
    );
  };

  const dropdownMenuElement = SUPPORTED_LOCALES.map((locale) =>
    renderDropdownMenuItem(locale),
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
          <p className="relative text-sm leading-6 font-medium w-full overflow-hidden whitespace-nowrap">
            {t(subSection.name) +
              ': ' +
              GetLocaleFullname(currentLocale).toUpperCase()}
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
