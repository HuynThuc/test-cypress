'use client';
import { useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';

import {
  DialogLayout,
  ConfirmButton,
} from '../../../../../../shared/components';
import { useDeleteHelenShortSpeakingCategory } from '../../../../api';

interface DeleteHelenShortSpeakingDialogProps {
  id: string;
}

export function DeleteHelenShortSpeakingCategoryDialog({
  id,
}: DeleteHelenShortSpeakingDialogProps) {
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const { mutate: deleteHelenShortSpeakingCategory, isLoading } =
    useDeleteHelenShortSpeakingCategory({
      onClose: () => setIsOpenDialog(false),
    });

  const handleDeleteHelenShortSpeakingCategory = () => {
    deleteHelenShortSpeakingCategory(id);
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
            Delete Helen Short Speaking Category
          </h3>
        </div>

        <p className="py-2 text-md text-muted-foreground">
          Are you sure you want to delete this Helen Short Speaking Category?
        </p>

        <ConfirmButton
          isLoading={isLoading}
          handleClickBtn={handleDeleteHelenShortSpeakingCategory}
          backgroundBtnColor="bg-error"
        />
      </>
    </DialogLayout>
  );
}
