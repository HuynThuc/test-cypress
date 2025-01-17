/* eslint-disable no-unused-vars */
'use client';
import React, { useState, useMemo } from 'react';
import { FaCirclePlay } from 'react-icons/fa6';
import { MdTranslate } from 'react-icons/md';
import { FaMicrophone } from 'react-icons/fa';
import { AiOutlineLoading } from 'react-icons/ai';
import { useLocale } from 'next-intl';
import { useSelector } from 'react-redux';

import { apiClient } from '@/shared/api';
import { formatTime } from '@/shared/utils/Format.utils';
import { Button } from '@/shared/components/shacdn-ui/Button';
import { LanguageToStringLocale } from '@/shared/utils';

import {
  IGetTranslateResponse,
  ISubtitle,
} from '@/modules/learners/types/video-detail/VideoDetail.types';
import IconWrapper from '@/modules/learners/components/other-page/learn/transcript/widget/IconWrapper';
import SubtitleContent from '@/modules/learners/components/other-page/learn/transcript/widget/SubtitleContent';
import { LEARNER_APP_ROUTES } from '@/modules/learners/utils/api-app-routes';
import {
  errorMessages,
  forbiddenMessage,
  unauthorizedMessage,
} from '@/modules/learners/components/other-page/learn/transcript/data/errorMessage';
import { RootState } from '@/modules/learners/store';

interface SubtitleItemProps {
  index: number;
  subtitle: ISubtitle;
  isActive: boolean;
  handleSubtitleClick: (time: number) => void;
}

const SubtitleItem = React.memo(
  ({ index, subtitle, isActive, handleSubtitleClick }: SubtitleItemProps) => {
    const [isShowTranslate, setIsShowTranslate] = useState(false);
    const [translateWords, setTranslateWords] =
      useState<string>('Translating...');
    const [isLoading, setIsLoading] = useState(false);
    const session = useSelector((state: RootState) => state.session.data);
    const locale = useLocale();
    const toggleTranslate = async (subtitleId: string) => {
      if (!isShowTranslate) {
        setIsLoading(true);
        if (!session) {
          setTranslateWords('You need login for this feature !');
          setIsLoading(false);
          setIsShowTranslate(true);
          return;
        }
        try {
          const response = await apiClient.post<IGetTranslateResponse>(
            LEARNER_APP_ROUTES.VIDEO_DETAIL_TRANSLATE_WORD,
            {
              youtubeSubtitleId: subtitleId,
              languageCode: 'vi',
            },
          );
          if (response.code === 200 && response.data) {
            setTranslateWords(response.data);
            setIsLoading(false);
            setIsShowTranslate(true);
            return;
          }
          if (response.code === 403 && response.error === 'Forbidden') {
            const stringErrror = LanguageToStringLocale(
              forbiddenMessage,
              locale,
            );
            setTranslateWords(stringErrror);
            setIsLoading(false);
            setIsShowTranslate(true);
            return;
          }
          if (response.code === 401 && response.error === 'Unauthorized') {
            const stringErrror = LanguageToStringLocale(
              unauthorizedMessage,
              locale,
            );
            setTranslateWords(stringErrror);
            setIsLoading(false);
            setIsShowTranslate(true);
            return;
          }
        } catch (error) {
          const stringErrror = LanguageToStringLocale(errorMessages, locale);
          setTranslateWords(stringErrror);
          setIsLoading(false);
          setIsShowTranslate(true);
        }
      } else {
        // If already showing, simply toggle off
        setIsShowTranslate(false);
      }
    };

    const subtitleClasses = useMemo(
      () =>
        `w-[56px] min-h-[46px] flex items-center flex-col ${
          isActive && 'border-l-2 rounded-[1px] border-primary'
        }`,
      [isActive],
    );

    const containerClasses = useMemo(
      () =>
        `w-full md:p-3 p-2 rounded-lg ${
          isActive ? 'bg-primary/75 text-text-onPrimary' : 'bg-bgSecondary/15'
        } overflow-visible`,
      [isActive],
    );

    return (
      <div className="w-full flex md:gap-4 gap-1 justify-between items-center">
        <div className={subtitleClasses}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleSubtitleClick(subtitle.startTime)}
          >
            <FaCirclePlay size={24} className="text-primary" />
          </Button>
          <span className="text-[10px] font-bold leading-[14px] tracking-[0.2px]">
            {formatTime(subtitle.startTime)}
          </span>
        </div>
        <div className="w-full">
          <div className={containerClasses}>
            <div className="flex items-center justify-between">
              <div
                className="break-words md:text-[16px] text-[12px] text-justify pr-2"
                dangerouslySetInnerHTML={{ __html: subtitle.text }}
              />
              <div className="flex flex-col gap-2 items-center justify-center">
                <div
                  id={index == 1 ? 'translate-step' : ''}
                  onClick={() => subtitle.id && toggleTranslate(subtitle.id)}
                >
                  <IconWrapper>
                    {isLoading ? (
                      <AiOutlineLoading
                        size={10}
                        className="animate-spin text-primary"
                      />
                    ) : (
                      <MdTranslate size={10} />
                    )}
                  </IconWrapper>
                </div>
                <div id={index == 1 ? 'speak-step' : ''}>
                  <IconWrapper>
                    <FaMicrophone size={10} />
                  </IconWrapper>
                </div>
              </div>
            </div>
            <SubtitleContent
              isShowTranslate={isShowTranslate}
              text={translateWords || 'Translating...'}
            />
          </div>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.isActive === nextProps.isActive &&
      prevProps.subtitle.text === nextProps.subtitle.text &&
      prevProps.subtitle.startTime === nextProps.subtitle.startTime
    );
  },
);

export default SubtitleItem;
