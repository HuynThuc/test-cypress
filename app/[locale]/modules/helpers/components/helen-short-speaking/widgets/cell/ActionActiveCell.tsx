'use client';

import { Row } from '@tanstack/react-table';
import { useState } from 'react';
import Lottie from 'lottie-react';
import React from 'react';

import {
  Button,
  OptionCell,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../../../../../shared/components';
import { undefinedOptionCell } from '../../../../../../shared/constants';
import LoadingLottie from '../../../../../../../../public/lottie/loading.json';
import {
  useUpdateActiveHelenShortSpeaking,
  useUpdateInactiveHelenShortSpeaking,
} from '../../../../api';
import { IHelenShortSpeaking } from '../../../../types';
import { helenShortSpeakingStatuses } from '../../data';

interface DataTableRowActionsProps {
  row: Row<IHelenShortSpeaking>;
}

export function HelenShortSpeakingActiveActions({
  row,
}: DataTableRowActionsProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false); // State for popover visibility
  const [isLoading, setIsLoading] = useState(false);

  const { mutate: updateActiveHelenShortSpeaking } =
    useUpdateActiveHelenShortSpeaking({
      onClose: () => {
        setIsPopoverOpen(false);
        setIsLoading(false);
      },
    });

  const { mutate: updateInactiveHelenShortSpeaking } =
    useUpdateInactiveHelenShortSpeaking({
      onClose: () => {
        setIsPopoverOpen(false);
        setIsLoading(false);
      },
    });

  const handleUpdateActive = () => {
    setIsLoading(true);
    updateActiveHelenShortSpeaking(row.original.id ?? '');
  };

  const handleUpdateInactive = () => {
    setIsLoading(true);
    updateInactiveHelenShortSpeaking(row.original.id ?? '');
  };

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <div
          className="cursor-pointer"
          onClick={() => setIsPopoverOpen(!isPopoverOpen)}
        >
          <OptionCell
            options={helenShortSpeakingStatuses}
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
