'use client';

import { useDispatch, useSelector } from 'react-redux';

import { Dialog, DialogContent } from '@/shared/components';

import PricingComponent from '@/modules/learners/components/pricing/pricing';
import { RootState } from '@/modules/learners/store';
import { closeDialog } from '@/modules/learners/store/slice/pricing/pricingDialogSlice';

export function PricingDialog() {
  const dispatch = useDispatch();
  const isDialogOpen = useSelector(
    (state: RootState) => state.pricingDialog.isDialogOpen,
  );

  const handleClose = () => dispatch(closeDialog());

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleClose}>
      <DialogContent className="fixed flex-grow z-[200] w-full h-full bg-background/80 overflow-y-auto overflow-x-hidden max-w-full px-0 py-5 flex flex-col items-center justify-center">
        <div className="lg:w-3/4 h-full my-5 md:flex md:flex-col md:items-center md:justify-center">
          <PricingComponent />
        </div>
      </DialogContent>
    </Dialog>
  );
}
