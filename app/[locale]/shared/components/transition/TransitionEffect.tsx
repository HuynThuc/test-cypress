import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import TourGuide from '@/modules/learners/components/other-page/learn/widget/TourGuide';
import { openPopupVocab } from '@/modules/learners/store/slice';
import { RootState } from '@/modules/learners/store';

function FrozenRouter(props: { children: React.ReactNode }) {
  const context = useContext(LayoutRouterContext);
  if (!context) {
    return <>{props.children}</>;
  }
  return (
    <LayoutRouterContext.Provider value={context}>
      {props.children}
    </LayoutRouterContext.Provider>
  );
}

const variants = {
  hidden: {
    opacity: 0,
    scale: 1,
    y: 20,
    transition: {
      duration: 0.25,
    },
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.25,
      delay: 0.25,
    },
  },
};

const TransitionEffect = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [isTransitionComplete, setTransitionComplete] = useState(false);
  const dispatch = useDispatch();
  const session = useSelector((state: RootState) => state.session.data);

  useEffect(() => {
    (document.activeElement as HTMLElement)?.blur();
  }, []);

  const handleAnimationComplete = () => {
    const isLearnPath = pathname.match(/^\/([a-z]{2}\/)?learn(?:\?.*)?$/);
    if (
      !isTransitionComplete &&
      isLearnPath &&
      session &&
      session.user &&
      session.user.isFirstLogin === true
    ) {
      dispatch(openPopupVocab());
      setTransitionComplete(true);
    }
  };
  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={pathname}
        className="transition-effect"
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onAnimationComplete={handleAnimationComplete}
      >
        <FrozenRouter>{children}</FrozenRouter>
      </motion.div>
      <TourGuide isRun={isTransitionComplete} />
    </AnimatePresence>
  );
};

export default TransitionEffect;
