'use client';

import { Row } from '@tanstack/react-table';
import { useState } from 'react';
import Lottie from 'lottie-react';
import React from 'react';

import { undefinedOptionCell } from '@/app/[locale]/shared/constants/DataTable.constants';

import LoadingLottie from '../../../../../../../../public/lottie/loading.json';
import {
  Button,
  OptionCell,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../../../../../shared/components';
import {
  useUpdateActiveSystemQuote,
  useUpdateInactiveSystemQuote,
} from '../../../../api';
import { ISystemQuote } from '../../../../types';
import { systemQuoteStatuses } from '../../data';

interface DataTableRowActionsProps {
  row: Row<ISystemQuote>;
}

export function SystemQuoteActiveActions({ row }: DataTableRowActionsProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false); // State for popover visibility
  const [isLoading, setIsLoading] = useState(false);

  const { mutate: updateActiveSystemQuote } = useUpdateActiveSystemQuote({
    onClose: () => {
      setIsPopoverOpen(false);
      setIsLoading(false);
    },
  });

  const { mutate: updateInactiveSystemQuote } = useUpdateInactiveSystemQuote({
    onClose: () => {
      setIsPopoverOpen(false);
      setIsLoading(false);
    },
  });

  const handleUpdateActive = () => {
    setIsLoading(true);
    updateActiveSystemQuote(row.original.id ?? '');
  };

  const handleUpdateInactive = () => {
    setIsLoading(true);
    updateInactiveSystemQuote(row.original.id ?? '');
  };

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <div
          className="cursor-pointer"
          onClick={() => setIsPopoverOpen(!isPopoverOpen)}
        >
          <OptionCell
            options={systemQuoteStatuses}
            data={row.original.status}
            defaultOption={undefinedOptionCell}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent align="end" className=" w-[520px]">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Check</h3>
        </div>
        <div className="flex flex-col gap-2 absolute top-3 right-3">
          <div className="w-40 rounded bg-black">
            {isLoading ? (
              <Lottie
                className="mx-auto w-8 scale-150"
                animationData={LoadingLottie}
              />
            ) : (
              <Button
                type="submit"
                size="sm"
                className="mx-auto w-full bg-green-200"
                onClick={handleUpdateActive}
                disabled={row.original.status == 'ACTIVE'}
              >
                <span className="">Active</span>
              </Button>
            )}
          </div>
          <div className="w-40 rounded bg-black">
            {isLoading ? (
              <Lottie
                className="mx-auto w-8 scale-150"
                animationData={LoadingLottie}
              />
            ) : (
              <Button
                type="submit"
                size="sm"
                className="mx-auto w-full bg-red-200"
                onClick={handleUpdateInactive}
                disabled={row.original.status == 'INACTIVE'}
              >
                <span className="">Inactive</span>
              </Button>
            )}
          </div>
        </div>

        <p className="py-2 text-xs text-muted-foreground">
          *Be careful to active/inactive record
        </p>
      </PopoverContent>
    </Popover>
  );
}
