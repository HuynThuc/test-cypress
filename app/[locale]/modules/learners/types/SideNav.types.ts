import { SideNavIcons } from '@/app/[locale]/shared/components/Icon/icons';
import { IListResponseBody2 } from '@/app/[locale]/shared/types';

export interface ISideNav {
  value: string;
  title: string;
  color: string;
  iconUrl: string;
  image: string;
}
export interface ISideNavAudio {
  channelId: string;
  name: string;
  imageUrl: string;
}
export interface IListHelenSpeakingChannelResponse
  extends IListResponseBody2<ISideNav> {}
export interface IListSideNavAudioResponse
  extends IListResponseBody2<ISideNavAudio> {}
export function mapAudioToNav(audio: ISideNavAudio): ISideNav {
  return {
    value: audio.channelId,
    title: audio.name,
    color: '',
    iconUrl: '',
    image: audio.imageUrl,
  };
}

export type SubSection = {
  id: string;
  name: string;
  icon: keyof typeof SideNavIcons.outlined | keyof typeof SideNavIcons.filled;
  path: string;
};

export type Section<T> = {
  id: string;
  title: string;
  subSections: T[];
};
