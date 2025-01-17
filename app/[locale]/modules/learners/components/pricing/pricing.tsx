'use client';

import { Fragment, useState } from 'react';
import { useRouter } from 'next/navigation';
import ReactConfetti from 'react-confetti';
import { useSelector } from 'react-redux';
import { useTranslations } from 'next-intl';
import { FaSpinner } from 'react-icons/fa6';

import { PackageType } from '@/modules/learners/types/pricing/Pricing.types';
import { ShareDialog } from '@/modules/learners/components/pricing/ShareDialog';
import { usePricingData } from '@/modules/learners/hook/pricing';
import { PricingCardList } from '@/modules/learners/components/pricing/PricingCardList';
import { GuestPopupDialog } from '@/modules/learners/components/other-page/learn/vocabulary/widgets/GuestPopupDialog';
import { RootState } from '@/modules/learners/store';

export default function PricingComponent() {
  const router = useRouter();
  const t = useTranslations('Pricing');
  const [showConfetti, setShowConfetti] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showGuestPopup, setShowGuestPopup] = useState(false);
  const clientSession = useSelector((state: RootState) => state.session);
  const {
    plans,
    currentSubscription,
    loading,
    error,
    handleSubscription,
    handleAffiliateSubscription,
  } = usePricingData();

  const isGuest = clientSession.data === null;

  const onSubscribe = async (plan: PackageType) => {
    if (isGuest) {
      setShowGuestPopup(true);
      return;
    }

    if (plan === PackageType.AFFILIATE) {
      setShowShareDialog(true);
    } else {
      const checkoutUrl = await handleSubscription(plan);
      if (checkoutUrl) router.push(checkoutUrl);
    }
  };

  const handleShareToFacebook = async () => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://rabitoenglish.com')}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');

    const success = await handleAffiliateSubscription();
    if (success) {
      setShowShareDialog(false);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  };

  const handleGuestPopupClose = () => setShowGuestPopup(false);

  const handleSignIn = () => router.push('/signin');

  if (loading)
    return <FaSpinner className="animate-spin text-4xl text-text-prima" />;
  if (error) return <div className="text-center text-error">{error}</div>;

  return (
    <Fragment>
      <h2 className="text-2xl font-bold text-center mb-6">
        {t('upgradeYourPlan')}
      </h2>
      <PricingCardList
        plans={plans}
        currentSubscription={currentSubscription}
        onSubscribe={onSubscribe}
      />
      {showConfetti && <ReactConfetti recycle={false} numberOfPieces={200} />}
      <ShareDialog
        isOpen={showShareDialog}
        onClose={() => setShowShareDialog(false)}
        onShare={handleShareToFacebook}
      />
      <GuestPopupDialog
        open={showGuestPopup}
        onClose={handleGuestPopupClose}
        onSignIn={handleSignIn}
      />
    </Fragment>
  );
}
