import Image from 'next/image';
import { useSelector } from 'react-redux';

import { LanguageToString } from '@/shared/utils';
import { useScreenSize } from '@/shared/hook';

import { IAudioTopics } from '@/modules/learners/types/AudioTopics.types';
import { RootState } from '@/modules/learners/store';

const CardAudio = ({ video }: { video: IAudioTopics }) => {
  const isCollapsedSideNav = useSelector(
    (state: RootState) => state.collapsedSidenav.isCollapsed,
  );
  const { xl } = useScreenSize();
  return (
    <div
      className={`relative cursor-pointer ${isCollapsedSideNav && xl ? 'h-[132px] w-[320px]' : 'h-[100px] w-[240px]'}`}
    >
      <Image
        rel="preload"
        src={video.imageUrl}
        alt={LanguageToString(video.name)}
        width={320}
        height={132}
        quality={100}
        className="rounded w-auto h-full relative"
      />
      <p
        className={`absolute font-semibold drop-shadow-[0_1px_4px_rgba(0,0,0,0.25)] w-full max-h-full text-white text-center align-middle top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-full tracking-[2px] ${isCollapsedSideNav && xl ? 'p-2.5 text-2xl leading-[29px]' : 'p-2 text-xl leading-6'}`}
      >
        {LanguageToString(video.name).toUpperCase()}
      </p>
    </div>
  );
};

export default CardAudio;
