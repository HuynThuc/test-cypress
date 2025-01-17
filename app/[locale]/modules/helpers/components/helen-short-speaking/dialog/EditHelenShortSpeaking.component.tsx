'use client';

import { useState } from 'react';
import { Row } from '@tanstack/react-table';
import { FaEdit } from 'react-icons/fa';

import { HelenShortSpeakingFormDialog } from '../form';
import { useUpdateHelenShortSpeaking } from '../../../api';
import { IHelenShortSpeaking } from '../../../types';
import { helenShortSpeakingService } from '../../../services';
import { HelenShortSpeakingSchema } from '../../../schema';

interface EditHelenShortSpeakingDialogProps {
  row: Row<IHelenShortSpeaking>;
}

export function EditHelenShortSpeakingDialog({
  row,
}: EditHelenShortSpeakingDialogProps) {
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const { mutate: updateHelenShortSpeaking, isLoading } =
    useUpdateHelenShortSpeaking({
      onClose: () => setIsOpenDialog(false),
    });

  const defaultValue: HelenShortSpeakingSchema =
    helenShortSpeakingService?.mapInterfaceToFormSchema(row.original);

  return (
    <HelenShortSpeakingFormDialog
      btnLabel={<FaEdit />}
      isLoading={isLoading}
      onClickBtn={updateHelenShortSpeaking}
      isOpenDialog={isOpenDialog}
      toggleDialog={setIsOpenDialog}
      defaultValue={defaultValue}
    />
  );
}
