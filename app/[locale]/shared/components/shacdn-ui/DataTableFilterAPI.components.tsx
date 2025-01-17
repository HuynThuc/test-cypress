/* eslint-disable no-unused-vars */
import * as React from 'react';
import { Check, LucideIcon, PlusCircle } from 'lucide-react';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from './Command.components';
import { Popover, PopoverContent, PopoverTrigger } from './Popover.components';
import { Separator } from './Separator.components';
import { Button } from './Button.components';
import { Badge } from './Badge.components';
import { cn } from '../../utils/common.utils';

type DataTableFilterAPIProps = {
  title?: string;
  options: {
    label: string;
    value: string;
    icon?: LucideIcon;
  }[];
  defaultOptions: string;
  setStatuses: (statusStr: string) => void;
  setSearchCategory: (value: string) => void;
  refetch: () => void;
};

export function DataTableFilterAPI({
  title,
  options,
  defaultOptions,
  setStatuses,
  setSearchCategory,
  refetch,
}: DataTableFilterAPIProps) {
  const [selectedValues, setSelectedValues] = React.useState<string[]>([]);

  const firstRender = React.useRef(true);
  React.useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false; // Set the ref to false after the initial render
      setStatuses(defaultOptions);
      if (defaultOptions) setSelectedValues([defaultOptions]);
    }

    if (selectedValues.length == 0) setStatuses('');
    else setStatuses(selectedValues.join(','));
  }, [selectedValues]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircle className="mr-2 h-4 w-8" />
          {title}
          {selectedValues?.length > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedValues.length}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValues.length > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selectedValues.length} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.includes(option.value))
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option.value}
                        className="rounded-sm px-1 font-normal"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput
            placeholder={title}
            onValueChange={(value) => {
              setSearchCategory(value);
              refetch();
            }}
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.includes(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (isSelected) {
                        const newSelected = selectedValues.filter(
                          (e) => e != option.value,
                        );

                        setSelectedValues(newSelected);
                      } else {
                        const newSelected = [...selectedValues, option.value];
                        setSelectedValues(newSelected);
                      }
                    }}
                  >
                    <div
                      className={cn(
                        'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                        isSelected
                          ? 'bg-white text-primary-foreground'
                          : 'opacity-50 [&_svg]:invisible',
                      )}
                    >
                      <Check className={cn('h-4 w-4')} />
                    </div>
                    <span>{option.label}</span>
                    {/* {facets?.get(option.value) && (
                      <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                        {facets.get(option.value)}
                      </span>
                    )} */}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => {
                      setSelectedValues([]);
                    }}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
