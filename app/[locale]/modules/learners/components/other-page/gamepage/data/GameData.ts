import { IGameUnity } from '@/modules/learners/types';

const GameData: IGameUnity[] = [
  {
    id: 1,
    title: 'Halloween Game',
    srcImg: '/images/picture-game.jpg',
    description: {
      vi: 'Chơi game Halloween vui nhộn và hấp dẫn. Nhấn để chơi!',
      en: 'This is a spooky Halloween game. Click on the image to play.',
      ja: '楽しいハロウィンゲームをプレイしてください。クリックしてプレイ！',
    },
    isLocked: false,
  },
  {
    id: 2,
    title: 'Ghostly Adventures',
    srcImg: '/images/picture-game.jpg',
    description: {
      vi: 'Trải nghiệm những cuộc phiêu lưu ma quái trong game này. Nhấn để chơi!',
      en: 'Experience ghostly adventures in this game. Click to play!',
      ja: 'このゲームで幽霊の冒険を体験してください。クリックしてプレイ！',
    },
    isLocked: true,
  },
  {
    id: 3,
    title: 'Witch’s Brew',
    srcImg: '/images/picture-game.jpg',
    description: {
      vi: 'Hãy thử sức với game Witch’s Brew. Nhấn để chơi!',
      en: 'Test your skills with Witch’s Brew game. Click to play!',
      ja: 'ウィッチのブルーでスキルを試してください。クリックしてプレイ！',
    },
    isLocked: true,
  },
];

export default GameData;
