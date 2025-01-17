'use client';
import React, { useEffect, useState } from 'react';

import {
  DataTablePagination,
  Input,
  DataTableFilter,
} from '../../../../shared/components';
import { useDebounce } from '../../../../shared/hook';
import { SystemQuoteDataTable, systemQuoteColumns } from './widgets';
import { useGetAllSystemQuote } from '../../api';
import { CreateSystemQuoteDialog } from './dialog';
import { categoryList, systemQuoteStatuses } from './data';
import { SystemQuoteCategoryComponent } from './sub-table/SystemQuoteCategoryComponent';

export const SystemQuoteComponent = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [searchQuote, setSearchQuote] = useState<string>('');
  const debouncedValue = useDebounce<string>(searchQuote, 500);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('');

  const {
    data: listSystemQuote,
    meta: meta,
    refetch,
  } = useGetAllSystemQuote(
    page,
    pageSize,
    debouncedValue,
    filterCategory,
    filterStatus,
  );

  useEffect(() => {
    refetch();
  }, [page, pageSize, debouncedValue, filterCategory, filterStatus]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuote(event.target.value);
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2 border-[1px] rounded p-2 bg-white bg-opacity-35">
          <h1 className="text-2xl font-bold">System Quote</h1>
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Input
                placeholder="Filter Quote"
                value={searchQuote}
                onChange={handleInputChange}
                className="h-8"
              />
              <DataTableFilter
                title="Category"
                options={categoryList}
                defaultOptions={''}
                setStatuses={setFilterCategory}
              />
              <DataTableFilter
                title="Status"
                options={systemQuoteStatuses}
                defaultOptions={''}
                setStatuses={setFilterStatus}
              />
            </div>

            <CreateSystemQuoteDialog />
          </div>

          <div className="my-2 space-y-3">
            <SystemQuoteDataTable
              columns={systemQuoteColumns}
              data={listSystemQuote}
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
            <SystemQuoteCategoryComponent />
          </div>
        </div>
      </div>
    </>
  );
};
