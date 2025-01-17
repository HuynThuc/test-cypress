import { Button } from '@/shared/components';
import { Icons } from '@/shared/components/Icon/icons';
import { cn } from '@/shared/utils';

interface SliderDesktopCarouselProps {
  onPrevClick: () => void;
  onNextClick: () => void;
  currentIndex: number;
  totalItems: number;
}

export const SliderDesktopCarousel: React.FC<SliderDesktopCarouselProps> = ({
  onPrevClick,
  onNextClick,
  currentIndex,
  totalItems,
}) => {
  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex gap-1">
        {Array.from({ length: totalItems }).map((_, index) => (
          <div
            key={index}
            className={cn(
              'w-6 h-1 rounded-full transition-all',
              index === currentIndex ? 'bg-primary' : 'bg-icon opacity-20',
            )}
          />
        ))}
      </div>
      <div className="flex space-x-2">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            'text-icon',
            currentIndex === 0 && 'text-icon cursor-not-allowed',
          )}
          onClick={onPrevClick}
          disabled={currentIndex === 0}
        >
          <Icons.arrowSquareLeft className="w-8 h-8" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            'text-icon',
            currentIndex === totalItems - 1 && 'text-icon cursor-not-allowed',
          )}
          onClick={onNextClick}
          disabled={currentIndex === totalItems - 1}
        >
          <Icons.arrowSquareRight className="w-8 h-8" />
        </Button>
      </div>
    </div>
  );
};
