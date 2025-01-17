'use client';
import { useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';

import { ConfirmButton, DialogLayout } from '../../../../../shared/components';
import { useDeleteHelenSpeaking } from '../../../api';

interface DeleteHelenSpeakingDialogProps {
  id: string;
}

export function DeleteHelenSpeakingDialog({
  id,
}: DeleteHelenSpeakingDialogProps) {
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const { mutate: deleteHelenSpeaking, isLoading } = useDeleteHelenSpeaking({
    onClose: () => setIsOpenDialog(false),
  });

  const handleDeleteHelenSpeaking = () => {
    deleteHelenSpeaking(id);
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
          <h3 className="text-lg font-semibold">Delete Helen Speaking</h3>
        </div>

        <p className="py-2 text-md text-muted-foreground">
          Are you sure you want to delete this Helen Speaking?
        </p>

        <ConfirmButton
          isLoading={isLoading}
          handleClickBtn={handleDeleteHelenSpeaking}
          backgroundBtnColor="bg-error"
        />
      </>
    </DialogLayout>
  );
}
