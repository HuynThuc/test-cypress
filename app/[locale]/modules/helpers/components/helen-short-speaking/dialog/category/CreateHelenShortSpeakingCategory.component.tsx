'use client';

import { useState } from 'react';

import { HelenShortSpeakingCategoryFormDialog } from '../../form';
import { useCreateHelenShortSpeakingCategory } from '../../../../api';

export function CreateHelenShortSpeakingCategoryDialog() {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const { mutate: createHelenShortSpeakingCategory, isLoading } =
    useCreateHelenShortSpeakingCategory({
      onClose: () => setIsOpenDialog(false),
    });

  return (
    <HelenShortSpeakingCategoryFormDialog
      btnLabel="Create category"
      isLoading={isLoading}
      onClickBtn={createHelenShortSpeakingCategory}
      isOpenDialog={isOpenDialog}
      toggleDialog={setIsOpenDialog}
    />
  );
}
