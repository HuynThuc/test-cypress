import React from 'react';

import { ListOption } from '../../types';

interface OptionCellProps {
  defaultOption: ListOption;
  data: string;
  options: ListOption[];
}

export function OptionCell({ defaultOption, data, options }: OptionCellProps) {
  const item =
    options.find((status: ListOption) => status.value === data) ??
    defaultOption;

  return (
    <span
      className="max-w-[500px] truncate px-2 py-1 font-medium rounded-lg border"
      style={{ backgroundColor: item.color }}
    >
      {item.title}
    </span>
  );
}
