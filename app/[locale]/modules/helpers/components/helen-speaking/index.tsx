'use client';
import React, { useEffect, useState } from 'react';

import {
  DataTablePagination,
  Input,
  DataTableFilter,
} from '@/shared/components';
import { useDebounce } from '@/shared/hook';
import {
  DEBOUNCED_TIME,
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
} from '@/shared/constants';

import {
  useGetAllHelenSpeaking,
  useGetAllHelenSpeakingCategory,
  useGetAllHelenSpeakingTag,
} from '@/modules/helpers/api';
import {
  HelenSpeakingDataTable,
  helenSpeakingColumns,
} from '@/modules/helpers/components/helen-speaking/widgets';
import { CreateHelenSpeakingDialog } from '@/modules/helpers/components/helen-speaking/dialog';
import {
  helenSpeakingStatuses,
  helenSpeakingTargetAudiences,
} from '@/modules/helpers/components/helen-speaking/data';
import {
  HelenSpeakingCategoryComponent,
  HelenSpeakingTagComponent,
} from '@/modules/helpers/components/helen-speaking/sub-table';

export const HelenSpeakingComponent = () => {
  const [page, setPage] = useState<number>(DEFAULT_PAGE);
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);

  const [searchTitle, setSearchTitle] = useState<string>('');
  const debouncedValue = useDebounce<string>(searchTitle, DEBOUNCED_TIME);
  const [filterCategory, setFilterCategory] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [filterTarget, setFilterTarget] = useState<string>('');
  const [filterTags, setFilterTags] = useState<string>('');
  const {
    data: listUsers,
    meta: meta,
    refetch,
  } = useGetAllHelenSpeaking({
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
  }, [debouncedValue, filterCategory, filterStatus, filterTarget, filterTags]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTitle(event.target.value);
  };

  const { data: listCategories } = useGetAllHelenSpeakingCategory();
  const { data: listTags } = useGetAllHelenSpeakingTag();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2 border rounded p-2 bg-white bg-opacity-35">
        <h1 className="text-2xl font-bold">Helen Speaking</h1>
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
              options={helenSpeakingStatuses}
              defaultOptions={''}
              setStatuses={setFilterStatus}
            />
            <DataTableFilter
              title="Target"
              options={helenSpeakingTargetAudiences}
              defaultOptions={''}
              setStatuses={setFilterTarget}
            />
            <DataTableFilter
              title="Category"
              defaultOptions={''}
              setStatuses={setFilterCategory}
              options={listCategories}
            />
            <DataTableFilter
              title="Tags"
              defaultOptions={''}
              setStatuses={setFilterTags}
              options={listTags}
            />
          </div>

          <CreateHelenSpeakingDialog />
        </div>

        <div className="my-2 space-y-3">
          <HelenSpeakingDataTable
            columns={helenSpeakingColumns}
            data={listUsers}
            pageSize={pageSize}
            page={page}
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

      <div className="flex gap-2">
        <div className="w-full">
          <HelenSpeakingCategoryComponent />
        </div>
        <div className="w-full">
          <HelenSpeakingTagComponent />
        </div>
      </div>
    </div>
  );
};
