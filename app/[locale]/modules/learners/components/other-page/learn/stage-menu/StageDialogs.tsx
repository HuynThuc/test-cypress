/* eslint-disable no-unused-vars */
import React from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/components';
import { Button } from '@/shared/components/shacdn-ui/Button';

interface StageDialogsProps {
  showForwardDialog: boolean;
  showBackwardDialog: boolean;
  /* eslint-disable no-unused-vars */
  setShowForwardDialog: (value: boolean) => void;
  setShowBackwardDialog: (value: boolean) => void;
  /* eslint-enable no-unused-vars */
  confirmForwardChange: () => void;
  confirmBackwardChange: () => void;
}

export const StageDialogs: React.FC<StageDialogsProps> = ({
  showForwardDialog,
  showBackwardDialog,
  setShowForwardDialog,
  setShowBackwardDialog,
  confirmForwardChange,
  confirmBackwardChange,
}) => (
  <>
    <Dialog open={showForwardDialog} onOpenChange={setShowForwardDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Stage Progression</DialogTitle>
          <DialogDescription>
            The current stage is not completed yet. Are you sure you want to
            move to the next stage?
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" onClick={() => setShowForwardDialog(false)}>
            Cancel
          </Button>
          <Button onClick={confirmForwardChange}>Confirm</Button>
        </div>
      </DialogContent>
    </Dialog>

    <Dialog open={showBackwardDialog} onOpenChange={setShowBackwardDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Going Back</DialogTitle>
          <DialogDescription>
            Going back to a previous stage will reset your progress on the
            current stage. Are you sure you want to proceed?
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end space-x-2 mt-4">
          <Button
            variant="outline"
            onClick={() => setShowBackwardDialog(false)}
          >
            Cancel
          </Button>
          <Button onClick={confirmBackwardChange}>Confirm</Button>
        </div>
      </DialogContent>
    </Dialog>
  </>
);
