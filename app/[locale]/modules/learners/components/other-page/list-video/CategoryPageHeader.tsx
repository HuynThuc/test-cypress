/* eslint-disable no-unused-vars */
import React from 'react';

import { LanguageToString } from '@/shared/utils';

import { ICategoryInfo } from '@/modules/learners/types';

interface CategoryPageHeaderProps {
  categoryInfo: ICategoryInfo;
}

export const CategoryPageHeader: React.FC<CategoryPageHeaderProps> = ({
  categoryInfo,
}) => {
  return (
    <div className="w-full">
      <div
        className="w-full h-[200px] bg-cover bg-center relative"
        style={{ backgroundImage: `url(${categoryInfo.artworkBannerImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-between px-6 pt-4">
          <div className="text-white z-10 flex flex-col gap-1">
            <h3>{LanguageToString(categoryInfo.title)}</h3>
            <p className="text-base font-normal">
              {LanguageToString(categoryInfo.description)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
