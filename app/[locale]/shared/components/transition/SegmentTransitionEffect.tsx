import { AnimatePresence, motion } from 'framer-motion';

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

export const SegmentTransitionEffect = ({
  trigger,
  children,
}: {
  trigger: string;
  children: React.ReactNode;
}) => {
  // const pathname = usePathname(); // use usePathname instead of useRouter for the path

  return (
    <AnimatePresence initial={false} mode="popLayout" onExitComplete={() => {}}>
      <motion.div
        key={trigger}
        className="transition-effect"
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
