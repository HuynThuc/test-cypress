'use client';
import { useState } from 'react';

import { HelenShortSpeakingFormDialog } from '../form';
import { useCreateHelenShortSpeaking } from '../../../api';

export function CreateHelenShortSpeakingDialog() {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const { mutate: createHelenShortSpeaking, isLoading } =
    useCreateHelenShortSpeaking({
      onClose: () => setIsOpenDialog(false),
    });

  return (
    <HelenShortSpeakingFormDialog
      isLoading={isLoading}
      btnLabel="Create Helen Short Speaking"
      onClickBtn={createHelenShortSpeaking}
      isOpenDialog={isOpenDialog}
      toggleDialog={setIsOpenDialog}
    />
  );
}
