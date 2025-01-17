/* eslint-disable no-unused-vars */
import { Dispatch, SetStateAction } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

import { Button } from '../shacdn-ui/Button.components';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../shacdn-ui/Select.components';
import { PAGE_SIZE } from '../../constants';

interface DataTablePaginationProps {
  page: number;
  pageSize: number;
  setPage: Dispatch<SetStateAction<number>>;
  setPageSize: (pageSize: number) => void;
  totalPages?: number;
}

export function DataTablePagination({
  page,
  pageSize,
  setPage,
  setPageSize,
  totalPages = 0,
}: DataTablePaginationProps) {
  return (
    <div className="flex justify-between px-7">
      <div className="flex-1 text-sm text-transparent">
        {/* @2023 Copyright by NMD */}
      </div>
      <div className="flex items-center space-x-6 lg:space-x-10">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => {
              setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top" className="bg-white">
              {PAGE_SIZE.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-center text-sm font-medium">
          Page {page} of {totalPages}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden w-8 h-8 p-0 lg:flex"
            onClick={() => setPage(1)}
            disabled={page == 1}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            className="w-8 h-8 p-0"
            onClick={() => setPage((prev: number) => prev - 1)}
            disabled={page == 1}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            className="w-8 h-8 p-0"
            onClick={() => setPage((prev: number) => prev + 1)}
            disabled={page == totalPages}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden w-8 h-8 p-0 lg:flex"
            onClick={() => setPage(totalPages)}
            disabled={page == totalPages}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
