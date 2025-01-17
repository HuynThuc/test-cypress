'use client';
import { useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';

import { DialogLayout } from '../../../../../shared/components/dialog';
import { ConfirmButton } from '../../../../../shared/components';
import { useDeleteSystemQuote } from '../../../api';

interface DeleteSystemQuoteDialogProps {
  id: string;
}

export function DeleteSystemQuoteDialog({ id }: DeleteSystemQuoteDialogProps) {
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const { mutate: deleteSystemQuote, isLoading } = useDeleteSystemQuote({
    onClose: () => {
      setIsOpenDialog(false);
    },
  });

  const handleDeleteSystemquote = () => {
    deleteSystemQuote(id);
  };
  const toggleDialog = (value: boolean) => {
    setIsOpenDialog(value);
  };

  return (
    <DialogLayout
      isOpenDialog={isOpenDialog}
      toggleDialog={toggleDialog}
      backgroundBtnColor="bg-error"
      btnLabel={<MdDeleteForever style={{ fontSize: '1.15rem' }} />}
    >
      <>
        <div className="flex-center-between">
          <h3 className="text-lg font-semibold">Delete System Quote</h3>
        </div>

        <p className="py-2 text-md text-muted-foreground">
          Are you sure you want to delete this System Quote?
        </p>

        <ConfirmButton
          isLoading={isLoading}
          handleClickBtn={handleDeleteSystemquote}
          backgroundBtnColor="bg-error"
        />
      </>
    </DialogLayout>
  );
}
