'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useTranslations } from 'next-intl';

import { Icons } from '@/shared/components/Icon/icons';

import { RootState } from '@/modules/learners/store';
import ErrorDetails from '@/modules/learners/constants/ErrorDetails';

const ErrorSvg = () => {
  const error = useSelector((state: RootState) => state.error.errorCode);
  const router = useRouter();
  const t = useTranslations('Error');

  // Retrieve error information from the object
  const { src, width, height, title, back } =
    error && ErrorDetails[error] ? ErrorDetails[error] : ErrorDetails.default;

  const handleClick = () => {
    router.push('/');
  };

  return (
    <div className="min-w-full flex flex-col grow justify-center items-center mx-auto pt-10 pb-32">
      <Image
        rel="preload"
        src={src}
        alt={title}
        width={width}
        height={height}
      />
      <div className="mt-12 flex flex-col items-center">
        <h4 className="uppercase">{t(`${title}.title`)}</h4>
        <div className="text-body-16pt py-4 text-center text-text-secondary">
          {t(`${title}.message`)}
        </div>
        <button
          onClick={handleClick}
          className={`flex items-center uppercase gap-1 bg-primary text-text-onPrimary font-bold text-[14px] ${back ? `px-[29px]` : `px-[54px]`} py-[10px] rounded-[4px] hover:bg-primary-dark max-h-11`}
        >
          {back ? (
            <Icons.arrowLeft size={24} />
          ) : (
            <Icons.arrowcounterclockwise size={24} />
          )}
          <div>{t(`${title}.btnText`)}</div>
        </button>
      </div>
    </div>
  );
};

export default ErrorSvg;
