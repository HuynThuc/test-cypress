'use client';
import React, { useEffect, useState } from 'react';

import { Input } from '@/shared/components/shacdn-ui/Input.components';
import { DEBOUNCED_TIME } from '@/shared/constants/Common.constants';
import {
  DEFAULT_PAGE,
  MAX_PAGE_SIZE,
} from '@/shared/constants/DataTable.constants';
import { useDebounce } from '@/shared/hook';

import { SystemQuoteCategoryTag } from '@/modules/helpers/components/system-quote/sub-table/widgets';
import { ISystemQuoteCategory } from '@/modules/helpers/types';
import { useGetSystemQuoteCategory } from '@/modules/helpers/api';

export const SystemQuoteCategoryComponent = () => {
  const [searchCategory, setSearchCategory] = useState<string>('');

  const debouncedValue = useDebounce<string>(searchCategory, DEBOUNCED_TIME);
  const { data: listFilterSystemQuoteCategory, refetch } =
    useGetSystemQuoteCategory({
      page: DEFAULT_PAGE,
      limit: MAX_PAGE_SIZE,
      category: debouncedValue,
    });

  useEffect(() => {
    refetch();
  }, [debouncedValue]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCategory(event.target.value);
  };

  return (
    <>
      <div className="flex flex-col gap-2 border-[1px]  rounded p-2 bg-white bg-opacity-35">
        <h1 className="text-2xl font-bold">Category</h1>
        <div className="flex items-center justify-between">
          <div className="flex p-2">
            <Input
              placeholder="Filter Category"
              value={searchCategory}
              onChange={handleInputChange}
              className="h-8"
            />
          </div>
        </div>
        <div className="grid grid-cols-10 gap-4">
          {listFilterSystemQuoteCategory.map(
            (item: ISystemQuoteCategory, index) => (
              <SystemQuoteCategoryTag key={index} data={item} />
            ),
          )}
        </div>
      </div>
    </>
  );
};
