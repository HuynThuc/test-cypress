/* eslint-disable no-unused-vars */
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { PiGauge, PiGear } from 'react-icons/pi';

import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Sheet,
  SheetContent,
  SheetTrigger,
  Slider,
} from '@/shared/components';

// Enum for playback rates
export enum PlaybackRate {
  x0_5 = 0.5,
  x0_75 = 0.75,
  x1 = 1,
  x1_25 = 1.25,
  x1_5 = 1.5,
  x1_75 = 1.75,
  x2 = 2,
}
interface SettingsControlProps {
  playbackRate: number;
  volume: number;
  onVolumeChange: (volume: number) => void;
  onPlaybackRateChange: (rate: number) => void;
}

export default function SettingsControl({
  playbackRate,
  volume,
  onVolumeChange,
  onPlaybackRateChange,
}: SettingsControlProps) {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  const t = useTranslations('Learn');
  // Create an array of playback rates from the enum
  const playbackRates: number[] = Object.values(PlaybackRate).filter(
    (rate) => typeof rate === 'number',
  );

  return (
    <div className="flex items-center gap-2">
      {/* Speed Control */}
      <div className="hidden lg:block">
        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 justify-center"
            >
              <PiGauge className="w-6 h-6" />
              <span className="w-8 text-center">{playbackRate}x</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-40 px-1 pb-1 pt-2 bg-surface border-border/50">
            <p className="text-xs text-border font-semibold px-1 text-center mb-2">
              Playback speed:
            </p>
            <div className="flex flex-col gap-1">
              {playbackRates.map((rate: number) => (
                <Button
                  key={rate}
                  size="sm"
                  onClick={() => {
                    onPlaybackRateChange(rate);
                    setCalendarOpen(false);
                  }}
                  className={
                    playbackRate === rate
                      ? 'text-text-onPrimary bg-primary rounded'
                      : 'hover:bg-border/10 bg-surface shadow-none'
                  }
                >
                  {rate}x
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Settings */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden">
            <PiGear className="md:w-6 md:h-6 w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom">
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 text-lg font-semibold">
                {t('playbackSpeed')}
              </h3>
              <div className="flex flex-wrap gap-2">
                {playbackRates.map((rate: number) => (
                  <Button
                    key={rate}
                    variant={playbackRate === rate ? 'secondary' : 'outline'}
                    size="sm"
                    onClick={() => {
                      onPlaybackRateChange(rate);
                      setSheetOpen(false);
                    }}
                  >
                    {rate}x
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold">{t('volume')}</h3>
              <Slider
                value={[volume]}
                max={100}
                step={1}
                onValueChange={(value) => onVolumeChange(value[0])}
                className="w-full"
              />
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Focus Mode */}
      {/* <Button variant="outline" size="sm" className="hidden md:inline-flex">
        <AiOutlineFullscreen />
      </Button> */}
    </div>
  );
}
