'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components';

type Card = {
  id: number;
  name: string;
  designation: string;
  content: React.ReactNode;
};

export const CardStack = ({
  items,
  selectedIndex,
  offset,
  scaleFactor,
}: {
  items: Card[];
  selectedIndex: number;
  offset?: number;
  scaleFactor?: number;
}) => {
  const CARD_OFFSET = offset || 10;
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState<Card[]>(items);

  useEffect(() => {
    const newCards = [...items];
    const selectedCard = newCards.splice(selectedIndex, 1)[0];
    newCards.unshift(selectedCard);
    setCards(newCards);
  }, [items, selectedIndex]);

  return (
    <div className="relative h-60 w-60 md:h-60 md:w-96">
      <AnimatePresence initial={false}>
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            className="absolute dark:bg-black bg-white h-60 w-60 md:h-60 md:w-96 rounded-3xl p-6 shadow-xl border border-neutral-200 dark:border-white/[0.1] shadow-black/[0.1] dark:shadow-white/[0.05] flex flex-col justify-between"
            style={{
              transformOrigin: 'top center',
            }}
            initial={{
              scale: 1 - (cards.length - 1) * SCALE_FACTOR,
              y: (cards.length - 1) * CARD_OFFSET,
              zIndex: 0,
              opacity: 0,
            }}
            animate={{
              scale: 1 - index * SCALE_FACTOR,
              y: index * -CARD_OFFSET,
              zIndex: cards.length - index,
              opacity: 1,
            }}
            exit={{
              scale: 1 + SCALE_FACTOR,
              y: -CARD_OFFSET,
              zIndex: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.25,
              ease: 'easeInOut',
            }}
          >
            <div className="font-normal text-neutral-700 dark:text-neutral-200">
              {card.content}
            </div>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage
                  src="/placeholder.svg?height=40&width=40"
                  alt={card.name}
                />
                <AvatarFallback>
                  {card.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-neutral-500 font-medium dark:text-white">
                  {card.name}
                </p>
                <p className="text-neutral-400 text-sm font-normal dark:text-neutral-200">
                  {card.designation}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
