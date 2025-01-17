'use client';

import { useTranslations } from 'next-intl';

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components';

interface ShareDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onShare: () => void;
}

export function ShareDialog({ isOpen, onClose, onShare }: ShareDialogProps) {
  const t = useTranslations('Pricing');
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-background z-[201]">
        <DialogHeader>
          <DialogTitle>{t('shareToGetPro')}</DialogTitle>
          <DialogDescription>{t('shareToGetProDescription')}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onShare}>{t('shareOnFacebook')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
