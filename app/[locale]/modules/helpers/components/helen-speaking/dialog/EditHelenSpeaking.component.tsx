'use client';

import { useState } from 'react';
import { Row } from '@tanstack/react-table';
import { FaEdit } from 'react-icons/fa';

import { HelenSpeakingFormDialog } from '../form';
import { useUpdateHelenSpeaking } from '../../../api';
import { IHelenSpeaking } from '../../../types';
import { helenSpeakingService } from '../../../services';
import { HelenSpeakingSchema } from '../../../schema';

interface EditHelenSpeakingDialogProps {
  row: Row<IHelenSpeaking>;
}

export function EditHelenSpeakingDialog({ row }: EditHelenSpeakingDialogProps) {
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const { mutate: updateHelenSpeaking, isLoading } = useUpdateHelenSpeaking({
    onClose: () => setIsOpenDialog(false),
  });

  const defaultValue: HelenSpeakingSchema =
    helenSpeakingService?.mapInterfaceToFormSchema(row.original);

  return (
    <HelenSpeakingFormDialog
      btnLabel={<FaEdit />}
      isLoading={isLoading}
      onClickBtn={updateHelenSpeaking}
      isOpenDialog={isOpenDialog}
      toggleDialog={setIsOpenDialog}
      defaultValue={defaultValue}
    />
  );
}
