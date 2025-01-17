'use client';
import React, { useEffect, useState } from 'react';

import { DataTablePagination, Input } from '@/shared/components';
import { useDebounce } from '@/shared/hook';
import {
  DEBOUNCED_TIME,
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
} from '@/shared/constants';

import { CreateHelenSpeakingCategoryDialog } from '@/modules/helpers/components/helen-speaking/dialog/category';
import { useGetHelenSpeakingCategory } from '@/modules/helpers/api';
import {
  helenSpeakingCategoryColumns,
  HelenSpeakingCategoryDataTable,
} from '@/modules/helpers/components/helen-speaking/sub-table/category-table/widgets';

export const HelenSpeakingCategoryComponent = () => {
  const [page, setPage] = useState<number>(DEFAULT_PAGE);
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);

  const [searchTitle, setSearchTitle] = useState<string>('');
  const debouncedValue = useDebounce<string>(searchTitle, DEBOUNCED_TIME);

  const {
    data: listHelenSpeakingCategories,
    meta: meta,
    refetch,
  } = useGetHelenSpeakingCategory({
    page,
    limit: pageSize,
    title: debouncedValue,
  });

  useEffect(() => {
    refetch();
  }, [page, pageSize, debouncedValue]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTitle(event.target.value);
  };

  return (
    <div className="flex flex-col gap-2 border-[1px]  rounded p-2 bg-white bg-opacity-35">
      <h1 className="text-2xl font-bold">Category</h1>
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Input
            placeholder="Filter title"
            value={searchTitle}
            onChange={handleInputChange}
            className="h-8"
          />
        </div>

        <CreateHelenSpeakingCategoryDialog />
      </div>
      <div className="w-full py-1">
        <div className="space-y-4">
          <HelenSpeakingCategoryDataTable
            columns={helenSpeakingCategoryColumns}
            data={listHelenSpeakingCategories}
            pageSize={pageSize}
            page={page}
            debouncedValue={debouncedValue}
          />
          <DataTablePagination
            page={page}
            pageSize={pageSize}
            setPage={setPage}
            setPageSize={setPageSize}
            totalPages={meta?.totalPages ?? DEFAULT_PAGE_SIZE}
          />
        </div>
      </div>
    </div>
  );
};
