'use client';

import React, { Dispatch, SetStateAction } from 'react';

import { Loadingcustom } from '@/shared/components/loading';

import {
  MenuItemPopup,
  ListSideNavItem,
} from '@/modules/learners/components/learners-layout/side-nav/menu-item';
import {
  ISideNav,
  ISideNavAudio,
  mapAudioToNav,
} from '@/modules/learners/types';
import { listLevels, listMenuSide } from '@/modules/learners/constants';

interface VoicetubeEndpointComponentProps {
  channels: ISideNav[];
  audios: ISideNavAudio[];
  isFetchingChannel: boolean;
  isFetchingAudio: boolean;
  indexSelectedMenu: number;
  setIndexSelectedMenu: Dispatch<SetStateAction<number>>;
}

const VoicetubeEndpointComponent: React.FC<VoicetubeEndpointComponentProps> = ({
  channels,
  audios,
  isFetchingChannel,
  isFetchingAudio,
  indexSelectedMenu,
  setIndexSelectedMenu,
}) => {
  const audiosMaps = audios.map((item) => mapAudioToNav(item));
  const checkIndexOfSeclectShow = (
    index: number,
    path: string,
  ): JSX.Element | null => {
    if (index === 0) {
      return (
        <div className="pt-3 w-full">
          {isFetchingChannel && channels ? (
            <Loadingcustom title="Loading ..." />
          ) : (
            <ListSideNavItem listItem={channels} pathRouter={path} />
          )}
        </div>
      );
    }
    if (index === 1) {
      return (
        <div className="pt-3 w-full">
          {listLevels.length <= 0 ? (
            <Loadingcustom title="Loading ..." />
          ) : (
            <ListSideNavItem listItem={listLevels} pathRouter={path} />
          )}
        </div>
      );
    }
    if (index === 2) {
      return (
        <div className="pt-3 w-full">
          {isFetchingAudio && audios ? (
            <Loadingcustom title="Loading ..." />
          ) : (
            <ListSideNavItem listItem={audiosMaps} pathRouter={path} />
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="mb-5 text-xl h-full">
      <div className="w-full h-full">
        <div className="w-[350px] h-full overflow-y-auto hover:overflow-scroll scroll-smooth hide-scrollbar">
          {listMenuSide.map((item) => (
            <MenuItemPopup
              menuItem={item}
              key={item.indexOf}
              indexSetected={indexSelectedMenu}
              content={checkIndexOfSeclectShow(item.indexOf, item.path)}
              stringHeightChildMenu="h-[532px]"
              setIndexSelectedMenu={setIndexSelectedMenu}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VoicetubeEndpointComponent;
