import { Dispatch, SetStateAction } from 'react';

import VoicetubeEndpointComponent from '@/modules/learners/components/learners-layout/side-nav/VoicetubeEndpoint';
import { ISideNav, ISideNavAudio } from '@/modules/learners/types';

export const SideNav = ({
  channels,
  audios,
  isFetchingChannel,
  isFetchingAudio,
  indexSelectedMenu,
  setIndexSelectedMenu,
}: {
  channels: ISideNav[];
  audios: ISideNavAudio[];
  isFetchingChannel: boolean;
  isFetchingAudio: boolean;
  indexSelectedMenu: number;
  setIndexSelectedMenu: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <div className="sticky h-[100vh] flex flex-col border-zinc-300 top-0 left-0">
      <VoicetubeEndpointComponent
        channels={channels}
        audios={audios}
        isFetchingChannel={isFetchingChannel}
        isFetchingAudio={isFetchingAudio}
        indexSelectedMenu={indexSelectedMenu}
        setIndexSelectedMenu={setIndexSelectedMenu}
      />
    </div>
  );
};
