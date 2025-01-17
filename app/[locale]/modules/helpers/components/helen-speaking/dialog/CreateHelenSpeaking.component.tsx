'use client';

import { useState } from 'react';

import { HelenSpeakingFormDialog } from '../form';
import { useCreateHelenSpeaking } from '../../../api';
export function CreateHelenSpeakingDialog() {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const { mutate: createHelenSpeaking, isLoading } = useCreateHelenSpeaking({
    onClose: () => setIsOpenDialog(false),
  });

  return (
    <HelenSpeakingFormDialog
      isLoading={isLoading}
      btnLabel="Create Helen Speaking"
      onClickBtn={createHelenSpeaking}
      isOpenDialog={isOpenDialog}
      toggleDialog={setIsOpenDialog}
    />
  );
}
