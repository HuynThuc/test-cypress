'use client';
import { useState } from 'react';

import { useCreateHelenSpeakingTag } from '../../../../api';
import { HelenSpeakingTagFormDialog } from '../../form';

export function CreateHelenSpeakingTagDialog() {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const { mutate: createHelenSpeakingTag, isLoading } =
    useCreateHelenSpeakingTag({
      onClose: () => setIsOpenDialog(false),
    });

  return (
    <HelenSpeakingTagFormDialog
      btnLabel="Create tag"
      isLoading={isLoading}
      onClickBtn={createHelenSpeakingTag}
      isOpenDialog={isOpenDialog}
      toggleDialog={setIsOpenDialog}
    />
  );
}
