'use client';
import { useState } from 'react';

import { useCreateHelenShortSpeakingTag } from '../../../../api';
import { HelenShortSpeakingTagFormDialog } from '../../form';

export function CreateHelenShortSpeakingTagDialog() {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const { mutate: createHelenShortSpeakingTag, isLoading } =
    useCreateHelenShortSpeakingTag({
      onClose: () => setIsOpenDialog(false),
    });

  return (
    <HelenShortSpeakingTagFormDialog
      btnLabel="Create tag"
      isLoading={isLoading}
      onClickBtn={createHelenShortSpeakingTag}
      isOpenDialog={isOpenDialog}
      toggleDialog={setIsOpenDialog}
    />
  );
}
