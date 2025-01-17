'use client';
import { useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';

import { DialogLayout } from '../../../../../../shared/components/dialog';
import { ConfirmButton } from '../../../../../../shared/components/button';
import { useDeleteHelenSpeakingTag } from '../../../../api';

interface DeleteHelenSpeakingTagDialogProps {
  id: string;
}

export function DeleteHelenSpeakingTagDialog({
  id,
}: DeleteHelenSpeakingTagDialogProps) {
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const { mutate: deleteHelenSpeakingTag, isLoading } =
    useDeleteHelenSpeakingTag({
      onClose: () => setIsOpenDialog(false),
    });

  const handleDeleteHelenSpeakingTag = () => {
    deleteHelenSpeakingTag(id);
  };

  const toggleDialog = (value: boolean) => {
    setIsOpenDialog(value);
  };

  return (
    <DialogLayout
      isOpenDialog={isOpenDialog}
      btnLabel={<MdDeleteForever style={{ fontSize: '1.15rem' }} />}
      toggleDialog={toggleDialog}
      backgroundBtnColor="bg-error"
    >
      <>
        <div className="flex-center-between">
          <h3 className="text-lg font-semibold">Delete Helen Speaking tag</h3>
        </div>

        <p className="py-2 text-md text-muted-foreground">
          Are you sure you want to delete this Helen Speaking tag?
        </p>

        <ConfirmButton
          isLoading={isLoading}
          handleClickBtn={handleDeleteHelenSpeakingTag}
          backgroundBtnColor="bg-error"
        />
      </>
    </DialogLayout>
  );
}
