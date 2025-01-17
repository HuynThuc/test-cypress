import React from 'react';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Button,
} from '@/shared/components';

interface GuestPopupDialogProps {
  open: boolean;
  onClose: () => void;
  onSignIn: () => void;
}

export const GuestPopupDialog: React.FC<GuestPopupDialogProps> = ({
  open,
  onClose,
  onSignIn,
}) => (
  <Dialog open={open} onOpenChange={onClose}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Sign in to continue</DialogTitle>
      </DialogHeader>
      <p>
        To access all features and save your progress, please sign in or create
        an account.
      </p>
      <DialogFooter>
        <Button onClick={onClose} variant="outline">
          Cancel
        </Button>
        <Button onClick={onSignIn}>Sign In</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
