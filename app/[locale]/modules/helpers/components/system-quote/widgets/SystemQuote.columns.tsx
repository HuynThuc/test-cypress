'use client';

import { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '../../../../../shared/components';
import { ISystemQuote } from '../../../types';
import { EditSystemQuoteDialog, DeleteSystemQuoteDialog } from '../dialog';
import { SystemQuoteActiveActions } from './cell';

export const systemQuoteColumns: ColumnDef<ISystemQuote>[] = [
  {
    accessorKey: 'quote',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quote" />
    ),
    cell: ({ row }) => {
      row.getValue('quote');
    },
  },
  {
    accessorKey: 'category',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => (
      <div>
        <p className="ml-2">{row.getValue('category')}</p>
      </div>
    ),
  },
  {
    accessorKey: 'author',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Author" />
    ),
    cell: ({ row }) => (
      <div>
        <p className="ml-2">{row.getValue('author')}</p>
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => <SystemQuoteActiveActions row={row} />,
  },
  {
    id: 'action',
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title=""
        className="w-full justify-center"
      />
    ),
    cell: ({ row }) => (
      <div className="flex justify-center gap-2 w-full">
        <EditSystemQuoteDialog row={row} />
        <DeleteSystemQuoteDialog id={row.original.id ?? ''} />
      </div>
    ),
  },
];
