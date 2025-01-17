import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { APP_NAME } from '@/shared/constants';
// import { Icons } from '@/shared/components/Icon/icons';

import { footerData } from '@/modules/learners/constants';
import { FooterSubSection, Section } from '@/modules/learners/types';

export const Footer = () => {
  const t = useTranslations('Footer');
  const router = useRouter();

  const handleNavigation = (path: string) => {
    if (path.startsWith('http')) {
      window.open(path, '_blank');
    } else {
      router.push(path);
    }
  };
  const handleClick = () => {
    router.push('/faq');
  };

  const renderSubSections = (subSections: FooterSubSection[]) =>
    subSections.map((subSection: FooterSubSection, index) => (
      <div
        key={index}
        onClick={() => handleNavigation(subSection.path)}
        className="text-body-16pt text-text-light cursor-pointer select-none hover:underline hover:underline-offset-2"
      >
        {t(subSection.name)}
      </div>
    ));

  const footerSectionElements = footerData.map(
    (section: Section<FooterSubSection>, index) => (
      <div key={index} className="flex flex-col gap-6 w-fit min-w-[152px] ">
        <h5 className="flex whitespace-nowrap">{t(section.title)}</h5>
        <div className="flex flex-col gap-6 py-2.5">
          {renderSubSections(section.subSections)}
        </div>
      </div>
    ),
  );

  return (
    <footer className="w-full lg:pr-[60px] pr-0 lg:pt-[60px] pt-4 border-t border-border/50">
      <div className="w-full flex flex-col justify-normal gap-6 xl:flex-row xl:justify-between xl:gap-0 pb-[30px] border-b border-border/25">
        <div className="flex flex-col lg:gap-8 gap-4 w-[292px]">
          <h2 className="text-primary">{APP_NAME.toUpperCase()}</h2>
          <p className="text-body-16pt text-text-secondary">
            {t('introduction')}
          </p>
        </div>

        <div className="flex xl:gap-[80px] xl:justify-normal md:flex-row md:gap-0 flex-col justify-between gap-6">
          {/* Store temporarily */}
          {/* <button className="flex xl:pl-4 -mt-3">
            <div className="flex items-center gap-2 px-2 py-1 border-2 border-primary whitespace-nowrap rounded">
              <Icons.donate />
            </div>
          </button> */}

          {footerSectionElements}
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-between pt-3 pb-6 text-stylized-lead">
        <p className="text-12pt">
          {`©2024 RABITO English. ${t('copyRight')}`}
        </p>
        <div className="flex lg:gap-[60px] gap-[18px] lg:flex-row flex-row-reverse self-start">
          <p
            className="w-fit cursor-pointer select-none "
            onClick={handleClick}
          >
            {t('privacyPolicy')}
          </p>
          <p
            className="w-fit cursor-pointer select-none "
            onClick={handleClick}
          >
            {t('termsCondition')}
          </p>
        </div>
      </div>
    </footer>
  );
};
