import React from 'react';

import { ISystemQuoteCategory } from '../../../../types';

type ISystemQuoteCategoryProps = {
  data: ISystemQuoteCategory;
};

export const SystemQuoteCategoryTag = ({ data }: ISystemQuoteCategoryProps) => {
  return (
    <div className="ml-4 text-xs flex justify-center items-center">
      <div className="inline-flex items-center font-bold leading-sm uppercase px-2 py-1 rounded-full  text-gray-700 border">
        {data.category}
      </div>
    </div>
  );
};
