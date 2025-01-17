import {
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  CircleX,
  User,
  Volume2,
} from 'lucide-react';
import {
  PiBell,
  PiBellSimpleFill,
  PiCaretLeft,
  PiCaretRight,
  PiCompass,
  PiDevices,
  PiListChecks,
} from 'react-icons/pi';
import { FaCirclePlay, FaCircleStop } from 'react-icons/fa6';

import arrowDown from '@/public/icons/arrow-down.svg';
import Filter from '@/public/icons/Funnel.svg';
import audioWave from '@/public/icons/audioWave.svg';
import CaretDown from '@/public/icons/CaretDown.svg';
import CaretUp from '@/public/icons/CaretUp.svg';
import CaretLeft from '@/public/icons/CaretLeft.svg';
import CaretRight from '@/public/icons/CaretRight.svg';
import ArrowLeft from '@/public/icons/ArrowLeft.svg';
import Eye from '@/public/icons/Eye.svg';
import Note from '@/public/icons/Note.svg';
import Check from '@/public/icons/Check.svg';
import Pray from '@/public/icons/Pray.svg';
import ArrowCounterClockwise from '@/public/icons/ArrowCounterClockwise.svg';
import ArrowClockwise from '@/public/icons/ArrowClockwise.svg';
import darkIcon from '@/public/icons/dark-theme.svg';
import DotsThree from '@/public/icons/DotsThree.svg';
import Donate from '@/public/icons/Donate.svg';
import Users from '@/public/icons/Users.svg';
import BookOpenFill from '@/public/icons/filled/BookOpen.svg';
import BoxArrowDownFill from '@/public/icons/filled/BoxArrowDown.svg';
import CaretCircleLeftFill from '@/public/icons/filled/CaretCircleLeft.svg';
import CaretCircleRightFill from '@/public/icons/filled/CaretCircleRight.svg';
import CellToweverFill from '@/public/icons/filled/CellTower.svg';
import HeartFill from '@/public/icons/filled/Heart.svg';
import HouseFill from '@/public/icons/filled/House.svg';
import MagnifyingGlassFill from '@/public/icons/filled/MagnifyingGlass.svg';
import NotebookFill from '@/public/icons/filled/Notebook.svg';
import SignOutFill from '@/public/icons/filled/SignOut.svg';
import VideoFill from '@/public/icons/filled/Video.svg';
import WaveformFill from '@/public/icons/filled/Waveform.svg';
import IconFire from '@/public/icons/fireIcon.svg';
import headphones from '@/public/icons/headphones.svg';
import Headphonesnew from '@/public/icons/Headphonesnew.svg';
import lightIcon from '@/public/icons/light-theme.svg';
import Appearance from '@/public/icons/outlined/Appearance.svg';
import BookOpen from '@/public/icons/outlined/BookOpen.svg';
import BoxArrowDown from '@/public/icons/outlined/BoxArrowDown.svg';
import CaretCircleLeft from '@/public/icons/outlined/CaretCircleLeft.svg';
import CaretCircleRight from '@/public/icons/outlined/CaretCircleRight.svg';
import CellTower from '@/public/icons/outlined/CellTower.svg';
import Heart from '@/public/icons/outlined/Heart.svg';
import House from '@/public/icons/outlined/House.svg';
import Language from '@/public/icons/outlined/Language.svg';
import MagnifyingGlass from '@/public/icons/outlined/MagnifyingGlass.svg';
import Notebook from '@/public/icons/outlined/Notebook.svg';
import SignOut from '@/public/icons/outlined/SignOut.svg';
import Video from '@/public/icons/outlined/Video.svg';
import Waveform from '@/public/icons/outlined/Waveform.svg';
import PlayCircle from '@/public/icons/PlayCircle.svg';
import PlayCircleBig from '@/public/icons/PlayCircleBig.svg';
import RectangleBlue from '@/public/icons/RectangleBlue.svg';
import RectangleGreen from '@/public/icons/RectangleGreen.svg';
import RectangleRed from '@/public/icons/RectangleRed.svg';
import ArrowSquareLeft from '@/public/icons/ArrowSquareLeft.svg';
import ArrowSquareRight from '@/public/icons/ArrowSquareRight.svg';
import DocSuccess from '@/public/icons/DocSuccess.svg';
import CardTwo from '@/public/icons/CardTwo.svg';
import Quiz from '@/public/icons/Quiz.svg';

export const Icons = {
  arrowDown: arrowDown,
  noti: PiBell,
  notiFill: PiBellSimpleFill,
  search: MagnifyingGlass,
  devices: PiDevices,
  prev: CaretCircleLeft,
  prevfill: CaretCircleLeftFill,
  next: CaretCircleRight,
  nextfill: CaretCircleRightFill,
  audioretangleRed: RectangleRed,
  audioretangleGreen: RectangleGreen,
  audioretangleBlue: RectangleBlue,
  dotsthree: DotsThree,
  headphonenew: Headphonesnew,
  playcircle: PlayCircle,
  iconFire: IconFire,
  caretdown: CaretDown,
  caretup: CaretUp,
  caretLeft: CaretLeft,
  caretRight: CaretRight,
  caretLeftLight: PiCaretLeft,
  caretRightLight: PiCaretRight,
  login: User,
  playcirclebig: PlayCircleBig,
  arrowLeft: ArrowLeft,
  arrowcounterclockwise: ArrowCounterClockwise,
  arrowClockwise: ArrowClockwise,
  filter: Filter,
  arrowSquareLeft: ArrowSquareLeft,
  arrowSquareRight: ArrowSquareRight,
  videos: Video,
  users: Users,
  listCheck: PiListChecks,
  docSuccess: DocSuccess,
  cardTwo: CardTwo,
  quiz: Quiz,
  volumn: Volume2,
  circleCheck: CircleCheck,
  circleX: CircleX,
  eye: Eye,
  circlePlay: FaCirclePlay,
  circleStop: FaCircleStop,
  note: Note,
  check: Check,
  pray: Pray,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  donate: Donate,
  compass: PiCompass,
};

export const SideNavIcons = {
  outlined: {
    home: House,
    liveRooms: CellTower,
    courses: BookOpen,
    videos: Video,
    audio: Waveform,
    dictionary: MagnifyingGlass,
    favorites: Heart,
    vocabularies: Notebook,
    downloadApp: BoxArrowDown,
    logOut: SignOut,
    language: Language,
    appearance: Appearance,
  },
  filled: {
    home: HouseFill,
    liveRooms: CellToweverFill,
    courses: BookOpenFill,
    videos: VideoFill,
    audio: WaveformFill,
    dictionary: MagnifyingGlassFill,
    favorites: HeartFill,
    vocabularies: NotebookFill,
    downloadApp: BoxArrowDownFill,
    logOut: SignOutFill,
  },
};

export const icons = {
  audioWave,
  headphones,
  deviceIcon: PiDevices,
  darkIcon,
  lightIcon,
};
