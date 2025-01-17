'use client';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { cn } from '@/shared/utils';

// Define movement patterns for both pointers - left pointer more to the left
const leftMoves = [
  { x: window.innerWidth * 0.15, y: 150 },
  { x: window.innerWidth * 0.1, y: 300 },
  { x: window.innerWidth * 0.2, y: 200 },
  { x: window.innerWidth * 0.12, y: 350 },
  { x: window.innerWidth * 0.18, y: 250 },
  { x: window.innerWidth * 0.08, y: 400 },
  { x: window.innerWidth * 0.22, y: 180 },
];

const rightMoves = [
  { x: window.innerWidth * 0.7, y: 150 },
  { x: window.innerWidth * 0.65, y: 250 },
  { x: window.innerWidth * 0.75, y: 350 },
  { x: window.innerWidth * 0.68, y: 200 },
  { x: window.innerWidth * 0.72, y: 400 },
  { x: window.innerWidth * 0.67, y: 300 },
  { x: window.innerWidth * 0.73, y: 150 },
];

export const AutoMovingPointers = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [leftPosition, setLeftPosition] = useState(0);
  const [rightPosition, setRightPosition] = useState(0);

  useEffect(() => {
    // Separate intervals for left and right pointers
    const updateLeftPosition = () => {
      setLeftPosition((prev) => (prev + 1) % leftMoves.length);
    };

    const updateRightPosition = () => {
      setRightPosition((prev) => (prev + 1) % rightMoves.length);
    };

    // Different random intervals for each pointer
    const leftInterval = setInterval(
      updateLeftPosition,
      2000 + Math.random() * 3000,
    ); // 2-5s
    const rightInterval = setInterval(
      updateRightPosition,
      4000 + Math.random() * 3000,
    ); // 4-7s

    return () => {
      clearInterval(leftInterval);
      clearInterval(rightInterval);
    };
  }, []);

  return (
    <div className={cn('relative w-full', className)}>
      <AnimatePresence>
        {/* Left Pointer - Ogie */}
        <motion.div
          className="absolute pointer-events-none"
          animate={leftMoves[leftPosition]}
          transition={{
            type: 'spring',
            stiffness: 45,
            damping: 15,
            mass: 1,
            duration: 2,
          }}
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="1"
            viewBox="0 0 16 16"
            className="h-6 w-6 text-sky-500 transform -rotate-[70deg] -translate-x-[12px] -translate-y-[10px] stroke-sky-600"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"></path>
          </svg>
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="px-2 py-1 text-white whitespace-nowrap min-w-max text-xs rounded-full bg-sky-500"
          >
            Akira
          </motion.div>
        </motion.div>

        {/* Right Pointer - Iris */}
        <motion.div
          className="absolute pointer-events-none "
          animate={rightMoves[rightPosition]}
          transition={{
            type: 'spring',
            stiffness: 50,
            damping: 20,
            mass: 1,
            duration: 2,
          }}
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="1"
            viewBox="0 0 16 16"
            className="h-6 w-6 text-teal-500 transform -rotate-[70deg] -translate-x-[12px] -translate-y-[10px] stroke-teal-600"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"></path>
          </svg>
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="px-2 py-1 text-white whitespace-nowrap min-w-max text-xs rounded-full bg-teal-500"
          >
            Helen
          </motion.div>
        </motion.div>
      </AnimatePresence>
      {children}
    </div>
  );
};
