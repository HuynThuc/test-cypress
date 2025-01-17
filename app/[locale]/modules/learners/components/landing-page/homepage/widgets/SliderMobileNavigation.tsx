/* eslint-disable no-unused-vars */
import { cn } from '@/shared/utils';

interface SliderMobileNavigationProps {
  totalItems: number;
  currentIndex: number;
  onDotClick: (index: number) => void;
}

export const SliderMobileNavigation: React.FC<SliderMobileNavigationProps> = ({
  totalItems,
  currentIndex,
  onDotClick,
}) => {
  return (
    <div className="md:hidden absolute bottom-2 right-2 z-20 flex justify-end space-x-1">
      {Array.from({ length: totalItems }).map((_, index) => (
        <button
          key={index}
          className={cn(
            'w-1 h-1 rounded-full transition-all',
            currentIndex === index
              ? 'bg-primary'
              : 'bg-border hover:bg-primary/50',
          )}
          onClick={() => onDotClick(index)}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
};
