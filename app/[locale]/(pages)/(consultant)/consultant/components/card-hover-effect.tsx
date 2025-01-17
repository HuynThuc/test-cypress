import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { type LucideIcon } from 'lucide-react';

import { cn } from '@/shared/utils';
import { Card, CardContent } from '@/shared/components/shacdn-ui/Card';

interface Item {
  title: string;
  insight: string;
  solution: string;
  icon: LucideIcon;
  link: string;
}

export const HoverEffect = ({
  items,
  className,
}: {
  items: Item[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [maxHeight, setMaxHeight] = useState<number>(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const updateMaxHeight = () => {
      const heights = cardRefs.current.map((ref) => ref?.offsetHeight ?? 0);
      setMaxHeight(Math.max(...heights));
    };

    updateMaxHeight();
    window.addEventListener('resize', updateMaxHeight);
    return () => window.removeEventListener('resize', updateMaxHeight);
  }, [items]);

  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
        className,
      )}
    >
      {items.map((item, idx) => (
        <Link
          href={item.link}
          key={item.link}
          className="group block w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div className="relative">
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.div
                  className="absolute inset-0 rounded-xl bg-primary"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                />
              )}
            </AnimatePresence>
            <Card
              className="relative h-full transition-colors duration-300 group-hover:bg-transparent"
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              style={{ minHeight: maxHeight > 0 ? `${maxHeight}px` : 'auto' }}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 transition-colors duration-300 ">
                    <item.icon className="w-6 h-6 text-primary transition-colors duration-300 group-hover:text-white" />
                  </div>
                  <h3 className="text-lg font-semibold transition-colors duration-300 group-hover:text-primary-foreground">
                    {item.title}
                  </h3>
                </div>
                <AnimatePresence mode="wait">
                  {hoveredIndex === idx ? (
                    <motion.div
                      key="solution"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-sm transition-colors duration-300 group-hover:text-primary-foreground">
                        {item.solution}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="insight"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-sm text-muted-foreground">
                        {item.insight}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </div>
        </Link>
      ))}
    </div>
  );
};
