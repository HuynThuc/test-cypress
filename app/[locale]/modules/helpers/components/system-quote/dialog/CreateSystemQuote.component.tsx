'use client';

import { useState } from 'react';

import { SystemQuoteFormDialog } from '../form';
import { useCreateSystemQuote } from '../../../api';

export function CreateSystemQuoteDialog() {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const { mutate: createSystemQuote, isLoading } = useCreateSystemQuote({
    onClose: () => setIsOpenDialog(false),
  });

  return (
    <SystemQuoteFormDialog
      btnLabel="Create System Quote"
      isLoading={isLoading}
      onClickBtn={createSystemQuote}
      isOpenDialog={isOpenDialog}
      toggleDialog={setIsOpenDialog}
    />
  );
}
