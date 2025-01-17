'use client';
import React, { useEffect, useState } from 'react';

import {
  DataTablePagination,
  DataTableFilter,
  Input,
} from '@/shared/components';
import {
  DEBOUNCED_TIME,
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
} from '@/shared/constants';
import { useDebounce } from '@/shared/hook';

import {
  helenShortSpeakingStatuses,
  helenShortSpeakingTargetAudiences,
} from '@/modules/helpers/components/helen-short-speaking/data';
import {
  useGetAllHelenShortSpeaking,
  useGetAllHelenShortSpeakingCategory,
  useGetAllHelenShortSpeakingTag,
} from '@/modules/helpers/api';
import { CreateHelenShortSpeakingDialog } from '@/modules/helpers/components/helen-short-speaking/dialog';
import {
  helenShortSpeakingColumns,
  HelenShortSpeakingDataTable,
} from '@/modules/helpers/components/helen-short-speaking/widgets';
import {
  HelenShortSpeakingCategoryComponent,
  HelenShortSpeakingTagComponent,
} from '@/modules/helpers/components/helen-short-speaking/sub-table';

export const HelenShortSpeakingComponent = () => {
  const [page, setPage] = useState<number>(DEFAULT_PAGE);
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);

  const [searchTitle, setSearchTitle] = useState<string>('');
  const debouncedValue = useDebounce<string>(searchTitle, DEBOUNCED_TIME);
  const [filterCategory, setFilterCategory] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [filterTarget, setFilterTarget] = useState<string>('');
  const [filterTags, setFilterTags] = useState<string>('');
  const {
    data: listHelenShortSpeaking,
    meta: meta,
    refetch,
  } = useGetAllHelenShortSpeaking({
    page,
    limit: pageSize,

    title: debouncedValue,
    status: filterStatus,
    category: filterCategory,
    targetAudience: filterTarget,
    tags: filterTags,
  });

  useEffect(() => {
    refetch();
  }, [page, pageSize]);

  useEffect(() => {
    if (page != DEFAULT_PAGE) setPage(DEFAULT_PAGE);
    else refetch();
  }, [debouncedValue, filterCategory, filterStatus, filterTarget]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTitle(event.target.value);
  };

  const { data: listCategories } = useGetAllHelenShortSpeakingCategory();
  const { data: listTags } = useGetAllHelenShortSpeakingTag();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2 border rounded p-2 bg-white bg-opacity-35">
        <h1 className="text-2xl font-bold">Helen Short Speaking</h1>
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Input
              placeholder="Filter title"
              value={searchTitle}
              onChange={handleInputChange}
              className="h-8"
            />
            <DataTableFilter
              title="Status"
              options={helenShortSpeakingStatuses}
              defaultOptions={''}
              setStatuses={setFilterStatus}
            />
            <DataTableFilter
              title="Target"
              options={helenShortSpeakingTargetAudiences}
              defaultOptions={''}
              setStatuses={setFilterTarget}
            />
            <DataTableFilter
              title="Category"
              options={listCategories}
              defaultOptions={''}
              setStatuses={setFilterCategory}
            />
            <DataTableFilter
              title="Tags"
              options={listTags}
              defaultOptions={''}
              setStatuses={setFilterTags}
            />
          </div>

          <CreateHelenShortSpeakingDialog />
        </div>

        <div className="w-full my-2 space-y-3">
          <HelenShortSpeakingDataTable
            columns={helenShortSpeakingColumns}
            data={listHelenShortSpeaking}
            pageSize={pageSize}
            page={page}
            debouncedValue={debouncedValue}
            filterCategory={filterCategory}
            filterStatus={filterStatus}
          />
          <DataTablePagination
            page={page}
            pageSize={pageSize}
            setPage={setPage}
            setPageSize={setPageSize}
            totalPages={meta?.totalPages ?? 10}
          />
        </div>
      </div>

      <div className="flex gap-2">
        <div className="w-full">
          <HelenShortSpeakingCategoryComponent />
        </div>
        <div className="w-full">
          <HelenShortSpeakingTagComponent />
        </div>
      </div>
    </div>
  );
};
