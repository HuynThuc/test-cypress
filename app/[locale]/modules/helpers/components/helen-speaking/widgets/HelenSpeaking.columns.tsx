'use client';

import { ColumnDef } from '@tanstack/react-table';

import {
  DataTableColumnHeader,
  ViewYoutubeButton,
  ViewImageButton,
  ViewFileButton,
  OptionCell,
} from '../../../../../shared/components';
import { undefinedOptionCell } from '../../../../../shared/constants';
import { IHelenSpeaking } from '../../../types';
import { DeleteHelenSpeakingDialog, EditHelenSpeakingDialog } from '../dialog';
import { HelenSpeakingActiveActions } from './cell';
import { helenSpeakingModes, helenSpeakingTargetAudiences } from '../data';

export const helenSpeakingColumns: ColumnDef<IHelenSpeaking>[] = [
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
    cell: ({ row }) => <HelenSpeakingActiveActions row={row} />,
  },
  {
    accessorKey: 'targetAudience',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Target" />
    ),
    cell: ({ row }) => (
      <OptionCell
        options={helenSpeakingTargetAudiences}
        data={row.original.targetAudience}
        defaultOption={undefinedOptionCell}
      />
    ),
  },
  {
    accessorKey: 'category',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Category"
        className="ml-1"
      />
    ),
    cell: ({ row }) => (
      <div>
        <p style={{ whiteSpace: 'nowrap' }}>{row.getValue('category')}</p>
      </div>
    ),
  },
  {
    accessorKey: 'youtubeUrl',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Youtube" />
    ),
    cell: ({ row }) => (
      <div className="ml-1">
        <ViewYoutubeButton url={row.getValue('youtubeUrl')} />
      </div>
    ),
  },
  {
    accessorKey: 'thumbnailUrl',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Thumbnail" />
    ),
    cell: ({ row }) => (
      <div className="flex gap-1">
        <ViewImageButton url={row.getValue('thumbnailUrl')} />
        <ViewImageButton
          url={row.original.blurThumbnailUrl}
          className="opacity-40"
        />
      </div>
    ),
  },
  // {
  //   accessorKey: 'tags',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Tags" />
  //   ),
  //   cell: ({ row }) => <>{row.getValue('tags')}</>,
  // },
  {
    accessorKey: 'scriptlUrl',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Script" />
    ),
    cell: ({ row }) => <ViewFileButton url={row.getValue('scriptlUrl')} />,
  },
  {
    accessorKey: 'mode',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mode" />
    ),
    cell: ({ row }) => (
      <OptionCell
        options={helenSpeakingModes}
        data={row.original.mode}
        defaultOption={undefinedOptionCell}
      />
    ),
  },
  {
    id: 'action',
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="" />,
    cell: ({ row }) => (
      <div className="flex justify-center gap-2 w-full">
        <EditHelenSpeakingDialog row={row} />
        <DeleteHelenSpeakingDialog id={row.original.id ?? ''} />
      </div>
    ),
  },
];
