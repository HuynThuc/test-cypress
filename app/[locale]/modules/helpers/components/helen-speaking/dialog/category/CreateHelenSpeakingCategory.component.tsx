'use client';

import { useState } from 'react';

import { HelenSpeakingCategoryFormDialog } from '../../form';
import { useCreateHelenSpeakingCategory } from '../../../../api';

export function CreateHelenSpeakingCategoryDialog() {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const { mutate: createHelenSpeakingCategory, isLoading } =
    useCreateHelenSpeakingCategory({
      onClose: () => setIsOpenDialog(false),
    });

  return (
    <HelenSpeakingCategoryFormDialog
      btnLabel="Create category"
      isLoading={isLoading}
      onClickBtn={createHelenSpeakingCategory}
      isOpenDialog={isOpenDialog}
      toggleDialog={setIsOpenDialog}
    />
  );
}
