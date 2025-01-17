import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useSelector } from 'react-redux';

import { Icons } from '@/shared/components/Icon/icons';
import { LanguageToString } from '@/shared/utils';
import { useScreenSize } from '@/shared/hook/ScreenSize';

import { IPopularAudios } from '@/modules/learners/types/PopularAudio.types';
import { RootState } from '@/modules/learners/store';

// Component to display a popular audio card
const CardPopularAudio = ({ video }: { video: IPopularAudios }) => {
  const isCollapsedSideNav = useSelector(
    (state: RootState) => state.collapsedSidenav.isCollapsed,
  );
  const t = useTranslations('Home');
  const { xl } = useScreenSize();

  // Function to get styles based on the difficulty level of the audio
  const getLevelStyles = (level: string) => {
    switch (level.toLowerCase()) {
      case 'hard':
        return {
          color: '#FD746C',
          imgBG: (
            <Image
              rel="preload"
              width={72}
              height={72}
              alt=""
              src={'/icons/RectangleRed.svg'}
            />
          ),
        };
      case 'medium':
        return {
          color: '#39D98A',
          imgBG: (
            <Image
              rel="preload"
              width={72}
              height={72}
              alt=""
              src={'/icons/RectangleGreen.svg'}
            />
          ),
        };
      case 'easy':
      default:
        return {
          color: '#0063F7',
          imgBG: (
            <Image
              rel="preload"
              width={72}
              height={72}
              alt=""
              src={'/icons/RectangleBlue.svg'}
            />
          ),
        };
    }
  };

  // Destructure the styles based on the video's level
  const { color, imgBG } = getLevelStyles(video.level);

  return (
    <div
      className={`${
        isCollapsedSideNav && xl
          ? 'w-[180px] h-[216px]'
          : 'w-[180px] h-[216px] sm:w-[150px] sm:h-[180px]'
      } bg-surface border-gray-200 rounded-lg overflow-hidden relative cursor-pointer`}
    >
      <div className="flex justify-between m-[10px]">
        <div className="w-[72px] h-[72px] relative items-center justify-center">
          {/* Background image based on level */}
          {imgBG}
          <div className="w-[40px] h-[40px] absolute inset-1 top-[16px] left-[16px] text-black">
            {/* Headphone icon */}
            <Icons.headphonenew />
          </div>
        </div>
        <div className="w-6 h-6">
          {/* Dots icon */}
          <Icons.dotsthree />
        </div>
      </div>
      <div className="px-2">
        {/* Video name */}
        <p className="text-sm text-ellipsis overflow-hidden h-full leading-[1.2] line-clamp-2">
          {LanguageToString(video.name)}
        </p>
        {/* Static text */}
        <p className={`text-[10px] ${isCollapsedSideNav && xl ? 'my-2' : ''}`}>
          {t('ieltsListening')}
        </p>
        {/* Video level */}
        <p className={'text-[10px]'} style={{ color: color }}>
          {video.level}
        </p>
      </div>
      <div className="flex justify-between items-center pl-2 pr-2 shrink-0 absolute bottom-1 left-0 right-0">
        {/* Video duration */}
        <div className="text-[10px] text-secondary mb-[-12px]">
          {video.durationText}
        </div>
        <div>
          {/* Play icon */}
          {isCollapsedSideNav && xl ? (
            <Icons.playcirclebig className="w-full h-full" />
          ) : (
            <Icons.playcircle className="w-full h-full" />
          )}
        </div>
      </div>
    </div>
  );
};

export default CardPopularAudio;
