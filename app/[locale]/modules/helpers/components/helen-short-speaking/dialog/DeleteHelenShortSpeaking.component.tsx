'use client';

import { useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';

import { DialogLayout, ConfirmButton } from '../../../../../shared/components';
import { useDeleteHelenShortSpeaking } from '../../../api';

interface DeleteHelenShortSpeakingDialogProps {
  id: string;
}

export function DeleteHelenShortSpeakingDialog({
  id,
}: DeleteHelenShortSpeakingDialogProps) {
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const { mutate: deleteHelenShortSpeaking, isLoading } =
    useDeleteHelenShortSpeaking({
      onClose: () => setIsOpenDialog(false),
    });

  const handleDeleteHelenShortSpeaking = () => {
    id && deleteHelenShortSpeaking(id);
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
          <h3 className="text-lg font-semibold">Delete Helen Short Speaking</h3>
        </div>

        <p className="py-2 text-md text-muted-foreground">
          Are you sure you want to delete this Helen Short Speaking?
        </p>

        <ConfirmButton
          isLoading={isLoading}
          handleClickBtn={handleDeleteHelenShortSpeaking}
          backgroundBtnColor="bg-error"
        />
      </>
    </DialogLayout>
  );
}
