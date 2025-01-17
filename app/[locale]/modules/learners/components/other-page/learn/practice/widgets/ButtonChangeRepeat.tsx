import { useDispatch, useSelector } from 'react-redux';

import { Icons } from '@/shared/components/Icon/icons';
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/shacdn-ui';

import { RootState } from '@/modules/learners/store';
import { setRepeatTime } from '@/modules/learners/store/slice';

export const ButtonChangeRepeat = () => {
  const { repeatTime } = useSelector((state: RootState) => state.youtubePlayer);
  const dispatch = useDispatch();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative h-8 w-8 text-primary border-primary rounded-lg hover:bg-primary hover:text-surface"
        >
          <Icons.arrowClockwise
            size={20}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
          <span className="text-label-medium" style={{ fontWeight: 700 }}>
            {repeatTime ?? 3}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-24 px-1 pb-1 pt-2 bg-surface border-border/50">
        <p className="text-xs text-border font-semibold px-1 text-center mb-2">
          Repeat:
        </p>
        <div className="flex flex-col gap-1">
          {[1, 2, 3, 4, 5].map((repeatChoice) => (
            <Button
              key={repeatChoice}
              size="sm"
              onClick={() => {
                dispatch(setRepeatTime(repeatChoice));
              }}
              className={
                repeatTime === repeatChoice
                  ? 'text-text-onPrimary bg-primary rounded pointer-events-none'
                  : 'hover:bg-border/10 bg-surface shadow-none'
              }
            >
              {repeatChoice}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
