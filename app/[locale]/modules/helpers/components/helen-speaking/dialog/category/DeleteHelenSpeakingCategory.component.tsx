'use client';
import { useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';

import {
  DialogLayout,
  ConfirmButton,
} from '../../../../../../shared/components';
import { useDeleteHelenSpeakingCategory } from '../../../../api';

interface DeleteHelenSpeakingDialogProps {
  id: string;
}

export function DeleteHelenSpeakingCategoryDialog({
  id,
}: DeleteHelenSpeakingDialogProps) {
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const { mutate: deleteHelenSpeakingCategory, isLoading } =
    useDeleteHelenSpeakingCategory({
      onClose: () => setIsOpenDialog(false),
    });

  const handleDeleteHelenSpeakingCategory = () => {
    deleteHelenSpeakingCategory(id);
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
            Delete Helen Speaking Category
          </h3>
        </div>

        <p className="py-2 text-md text-muted-foreground">
          Are you sure you want to delete this Helen Speaking Category?
        </p>

        <ConfirmButton
          isLoading={isLoading}
          handleClickBtn={handleDeleteHelenSpeakingCategory}
          backgroundBtnColor="bg-error"
        />
      </>
    </DialogLayout>
  );
}
