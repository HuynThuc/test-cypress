'use client';

import { useState } from 'react';
import { Row } from '@tanstack/react-table';
import { FaEdit } from 'react-icons/fa';

import { SystemQuoteFormDialog } from '../form';
import { ISystemQuote } from '../../../types';
import { systemQuoteService } from '../../../services';
import { SystemQuoteSchema } from '../../../schema';
import { useUpdateSystemQuote } from '../../../api';

interface EditSystemQuoteDialogProps {
  row: Row<ISystemQuote>;
}

export function EditSystemQuoteDialog({ row }: EditSystemQuoteDialogProps) {
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const { mutate: updateSystemQuote, isLoading } = useUpdateSystemQuote({
    onClose: () => setIsOpenDialog(false),
  });

  const defaultValue: SystemQuoteSchema =
    systemQuoteService.mapInterfaceToFormSchema(row.original);

  return (
    <SystemQuoteFormDialog
      btnLabel={<FaEdit />}
      onClickBtn={updateSystemQuote}
      isLoading={isLoading}
      isOpenDialog={isOpenDialog}
      toggleDialog={setIsOpenDialog}
      defaultValue={defaultValue}
    />
  );
}
