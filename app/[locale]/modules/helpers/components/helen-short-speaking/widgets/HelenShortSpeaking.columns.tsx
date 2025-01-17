'use client';

import { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '../../../../../shared/components';
import { IHelenShortSpeaking } from '../../../types';
import {
  DeleteHelenShortSpeakingDialog,
  EditHelenShortSpeakingDialog,
} from '../dialog';
import { HelenShortSpeakingActiveActions } from './cell';

export const helenShortSpeakingColumns: ColumnDef<IHelenShortSpeaking>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      row.getValue('title');
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => <HelenShortSpeakingActiveActions row={row} />,
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
    accessorKey: 'imageUrl',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Image URL" />
    ),
    cell: ({ row }) => {
      row.getValue('imageUrl');
    },
  },
  {
    accessorKey: 'scriptUrl',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Script" />
    ),
    cell: ({ row }) => {
      row.getValue('scriptUrl');
    },
  },
  {
    accessorKey: 'mp3Url',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mp3 URL" />
    ),
    cell: ({ row }) => {
      row.getValue('mp3Url');
    },
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
        <EditHelenShortSpeakingDialog row={row} />
        <DeleteHelenShortSpeakingDialog id={row.original.id ?? ''} />
      </div>
    ),
  },
];
