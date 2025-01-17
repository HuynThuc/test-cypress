import { Fragment, useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { createPortal } from 'react-dom';

import { LanguageToString } from '@/shared/utils';

import { IGameUnity } from '@/modules/learners/types';
import PopupGame from '@/modules/learners/components/other-page/gamepage/widget/PopupGame';

type CardGameProps = {
  game: IGameUnity;
};

const CardGame = ({ game }: CardGameProps) => {
  const t = useTranslations('GamePage');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePlayGameClick = () => {
    if (!game.isLocked) setIsModalOpen(!isModalOpen);
  };
  useEffect(() => {
    if (isModalOpen) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.paddingRight = '';
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.paddingRight = '';
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  const renderBlock = () =>
    game.isLocked && (
      <Fragment>
        <div className="absolute inset-0 z-10 bg-black opacity-50 group-hover:opacity-50 transition-opacity duration-300"></div>
        <div className="font-bold bg-primary absolute inset-0 w-36 h-9 rounded-md z-[11] text-text-onPrimary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {t('inDevelopment')}
        </div>
      </Fragment>
    );

  const renderOpenModal = () =>
    isModalOpen &&
    createPortal(
      <div className="fixed inset-0 z-[9999] w-[100vw] h-[100vh] bg-background/50 mx-auto">
        <div
          className="w-full h-full rounded-lg flex justify-center items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <PopupGame onClose={handlePlayGameClick} />
        </div>
      </div>,
      document.body,
    );

  return (
    <Fragment>
      <div className="relative w-full h-full rounded overflow-hidden shadow-lg min-w-[250px] max-w-[251px] group ">
        {/* Overlay for locked game */}
        {renderBlock()}
        <Image
          src={game.srcImg}
          alt="Unity Game"
          width={400}
          height={250}
          className="w-full object-cover"
        />
        <div className="px-6 py-4">
          <h5 className="font-bold text-xl mb-2">{game.title}</h5>
          <p className="text-base">{LanguageToString(game.description)}</p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <button
            aria-disabled={game.isLocked}
            onClick={handlePlayGameClick}
            className={`inline-block font-bold py-2 px-4 rounded transition duration-300 ${
              game.isLocked
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-primary hover:bg-primary/90'
            }`}
          >
            {t('playGame')}
          </button>
        </div>
      </div>
      {/* Modal */}
      {renderOpenModal()}
    </Fragment>
  );
};

export default CardGame;
