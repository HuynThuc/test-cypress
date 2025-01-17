/* eslint-disable @next/next/no-img-element */
import React from 'react';

import { ISideNav } from '@/modules/learners/types';

type IVideoChannelProps = {
  data: ISideNav;
};

const CardVideoChannel = ({ data }: IVideoChannelProps) => {
  return (
    <div className="group relative w-[238px] h-[80px] cursor-pointer overflow-hidden duration-200 border border-white/0 hover:border-white rounded-lg">
      <div className="overflow-hidden ">
        {data.image ? (
          <img
            rel="preload"
            src={data.image}
            alt={data.title || 'none'}
            className="w-full h-full transition-transform duration-200 group-hover:scale-110"
            style={{ opacity: 0.6 }}
          />
        ) : null}
      </div>
      <div className="absolute inset-0 flex items-center justify-center text-white px-4 py-2 bg-black bg-opacity-50">
        <h2 className="text-sm font-bold">{data.title}</h2>
      </div>
    </div>
  );
};

export default CardVideoChannel;
