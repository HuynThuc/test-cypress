/* eslint-disable no-console */
'use client';

import Image from 'next/image';
import React from 'react';

const marks = [
  { label: 'B', position: 100 },
  { label: 'A', position: 130 },
  { label: 'A+', position: 160 },
];

type ScoreMeterProps = {
  point?: number;
  pointMax?: number;
  size?: 'small' | 'medium' | 'large'; // Add size option
};

export const ScoreMeter = ({
  point = 800,
  pointMax = 1200,
  size = 'medium',
}: ScoreMeterProps) => {
  const width = Math.min(184, Math.max(0, (point / pointMax) * 184));

  // Size is scaled based on the size prop
  const sizeScale = size === 'small' ? 0.75 : size === 'large' ? 1.25 : 1;

  return (
    <div className="w-full flex justify-end items-center relative">
      <div
        className={`flex flex-row items-center absolute right-0`}
        style={{
          width: `${184 * sizeScale}px`,
          height: `${36 * sizeScale}px`,
        }}
      >
        {/* Star */}
        <div
          className="absolute bg-primary p-0.5 rounded-full"
          style={{
            left: `${-16 * sizeScale}px`,
            width: `${36 * sizeScale}px`,
            height: `${36 * sizeScale}px`,
          }}
        >
          <div
            className="rounded-full bg-[#2A4D69] flex items-center justify-center"
            style={{
              width: `${32 * sizeScale}px`,
              height: `${32 * sizeScale}px`,
            }}
          >
            <Image
              src="/images/star.png"
              alt="Score Meter"
              width={20 * sizeScale}
              height={20 * sizeScale}
              priority
            />
          </div>
        </div>
        {/* Water bar */}
        <div
          className="bg-[#8F90A626]/15 rounded-r-[14px] p-px overflow-hidden"
          style={{
            width: `${184 * sizeScale}px`,
            height: `${24 * sizeScale}px`,
          }}
        >
          <div
            className="bg-primary"
            style={{
              width: `${width * sizeScale}px`,
              height: `${22 * sizeScale}px`,
            }}
          ></div>
        </div>
        {/* Score Marks */}
        {marks.map((mark) => (
          <div
            key={mark.label}
            className="absolute flex flex-row justify-between items-center"
            style={{
              width: `${(mark.label.length > 1 ? 12 : 10) * sizeScale}px`,
              height: `${22 * sizeScale}px`,
              left: `${mark.position * sizeScale}px`,
            }}
          >
            <span
              className="font-semibold"
              style={{
                fontSize: `${8 * sizeScale}px`,
              }}
            >
              {mark.label}
            </span>
            <div
              className="w-[0.5px] h-full"
              style={{
                backgroundColor: mark.label === 'B' ? 'black' : '#8F90A6BF',
                opacity: mark.label === 'B' ? 1 : 0.75,
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};
