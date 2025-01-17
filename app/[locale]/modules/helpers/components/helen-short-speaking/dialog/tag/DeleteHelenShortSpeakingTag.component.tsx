'use client';
import { useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';

import { DialogLayout } from '../../../../../../shared/components/dialog';
import { ConfirmButton } from '../../../../../../shared/components/button';
import { useDeleteHelenShortSpeakingTag } from '../../../../api';

interface DeleteHelenShortSpeakingTagDialogProps {
  id: string;
}

export function DeleteHelenShortSpeakingTagDialog({
  id,
}: DeleteHelenShortSpeakingTagDialogProps) {
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const { mutate: deleteHelenShortSpeakingTag, isLoading } =
    useDeleteHelenShortSpeakingTag({
      onClose: () => setIsOpenDialog(false),
    });

  const handleDeleteHelenShortSpeakingTag = () => {
    deleteHelenShortSpeakingTag(id);
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
          <h3 className="text-lg font-semibold">
            Delete Helen Short Speaking tag
          </h3>
        </div>

        <p className="py-2 text-md text-muted-foreground">
          Are you sure you want to delete this Helen Short Speaking tag?
        </p>

        <ConfirmButton
          isLoading={isLoading}
          handleClickBtn={handleDeleteHelenShortSpeakingTag}
          backgroundBtnColor="bg-error"
        />
      </>
    </DialogLayout>
  );
}
