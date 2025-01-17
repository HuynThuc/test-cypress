import React from 'react';
import { Monitor } from 'lucide-react';
import { FaSignal } from 'react-icons/fa6';
import { FaBook, FaComment, FaFont } from 'react-icons/fa';
import { HiVolumeUp } from 'react-icons/hi';

import { ISideNav, Section, SubSection } from '@/modules/learners/types';

export const listLevels: ISideNav[] = [
  {
    value: 'a1',
    title: 'A1',
    color: '',
    iconUrl: '',
    image: '',
  },
  {
    value: 'a2',
    title: 'A2',
    color: '',
    iconUrl: '',
    image: '',
  },
  {
    value: 'b1',
    title: 'B1',
    color: '',
    iconUrl: '',
    image: '',
  },
  {
    value: 'b2',
    title: 'B2',
    color: '',
    iconUrl: '',
    image: '',
  },
  {
    value: 'c1',
    title: 'C1',
    color: '',
    iconUrl: '',
    image: '',
  },
  {
    value: 'c2',
    title: 'C2',
    color: '',
    iconUrl: '',
    image: '',
  },
];
export const lstAudio: ISideNav[] = [
  {
    value: 'ielts',
    title: 'IELTS',
    color: '',
    iconUrl: '',
    image: '',
  },
  {
    value: 'toiec',
    title: 'TOIEC',
    color: '',
    iconUrl: '',
    image: '',
  },
  {
    value: 'toefl',
    title: 'TOEFL',
    color: '',
    iconUrl: '',
    image: '',
  },
  {
    value: 'dailyconversations',
    title: 'Daily Conversations',
    color: '',
    iconUrl: '',
    image: '',
  },
];

export interface MenuSide {
  label: string; //Tile menu
  icon: React.ReactNode; // iconMenu
  indexOf: number; // indexOf item menu
  path: string; // dùng cho routing
  isIconAngle: boolean;
  heightChildItem: string; // để định dạng sẳn kích thước height khi show item con
}
export const listMenuSide: MenuSide[] = [
  {
    label: 'Channels',
    icon: <Monitor className="w-6 h-6" />,
    indexOf: 0,
    path: '/channels',
    isIconAngle: true,
    heightChildItem: 'h-[532px]',
  },
  {
    label: 'Levels',
    icon: <FaSignal className="w-6 h-6" />,
    indexOf: 1,
    path: '/',
    isIconAngle: true,
    heightChildItem: 'h-[332px]',
  },
  {
    label: 'Audio',
    icon: <HiVolumeUp className="w-6 h-6" />,
    indexOf: 2,
    path: '/audios',
    isIconAngle: true,
    heightChildItem: 'h-[490px]',
  },
  {
    label: 'Pronunciation Challenge',
    icon: <FaComment className="w-6 h-6" />,
    indexOf: 3,
    path: '/',
    isIconAngle: false,
    heightChildItem: 'h-[0px]',
  },
  {
    label: 'Save&Review',
    icon: <FaBook className="w-6 h-6" />,
    indexOf: 4,
    path: '/',
    isIconAngle: false,
    heightChildItem: 'h-[0px]',
  },
  {
    label: 'Search Vocabulary',
    icon: <FaFont className="w-6 h-6" />,
    indexOf: 5,
    path: '/',
    isIconAngle: false,
    heightChildItem: 'h-[0px]',
  },
];

export const sidenavData: Section<SubSection>[] = [
  {
    id: 'menu',
    title: 'menu',
    subSections: [
      {
        id: 'home',
        name: 'home',
        icon: 'home',
        path: '/',
      },
      // {
      //   id: 'live-room',
      //   name: 'game',
      //   icon: 'liveRooms',
      //   path: '/game',
      // },
      {
        id: 'videos',
        name: 'videos',
        icon: 'videos',
        path: '/videos',
      },
      // {
      //   id: 'audio',
      //   name: 'audio',
      //   icon: 'audio',
      //   path: '/audio',
      // },
      // {
      //   id: 'dictionary',
      //   name: 'dictionary',
      //   icon: 'dictionary',
      //   path: '/dictionary',
      // },
    ],
  },
  // {
  //   id: 'your-learning',
  //   title: 'yourLearning',
  //   subSections: [
  //     {
  //       id: 'favorites',
  //       name: 'favorites',
  //       icon: 'favorites',
  //       path: '/favorites',
  //     },
  //     {
  //       id: 'vocabularies',
  //       name: 'vocabularies',
  //       icon: 'vocabularies',
  //       path: '/vocabularies',
  //     },
  //   ],
  // },
  {
    id: 'general',
    title: 'general',
    subSections: [
      //     {
      //       id: 'language',
      //       name: 'language',
      //       icon: 'language',
      //       path: '',
      //     },
      //     {
      //       id: 'appearance',
      //       name: 'appearance',
      //       icon: 'appearance',
      //       path: '',
      //     },
      //     {
      //       id: 'download-app',
      //       name: 'downloadApp',
      //       icon: 'downloadApp',
      //       path: '/download-app',
      //     },
      {
        id: 'log-out',
        name: 'logOut',
        icon: 'logOut',
        path: '/log-out',
      },
    ],
  },
];
