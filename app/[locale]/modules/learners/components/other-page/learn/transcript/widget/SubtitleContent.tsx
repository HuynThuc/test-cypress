import React, { useRef, useEffect, useState } from 'react';

import { LoadingIndicator } from '@/shared/components';

export const dynamic = 'dynamic force';
interface SubtitleContentProps {
  isShowTranslate: boolean;
  text: string;
}

const SubtitleContent: React.FC<SubtitleContentProps> = ({
  isShowTranslate,
  text,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number | 'auto'>(0);

  useEffect(() => {
    if (contentRef.current) {
      // Update height when content or state changes
      if (isShowTranslate) {
        setContentHeight(contentRef.current.scrollHeight);
      } else {
        setContentHeight(0); // Hide content
      }
    }
  }, [isShowTranslate, text]); // Watch both `text` and `isShowTranslate`

  return (
    <div
      ref={contentRef}
      style={{
        height: isShowTranslate ? contentHeight : 0,
        overflow: 'hidden',
        transition: 'height 0.5s ease-in-out',
      }}
      className="transition-height"
    >
      {text === '' && isShowTranslate ? (
        <LoadingIndicator />
      ) : (
        <>
          <div className="bg-text-onPrimary h-[0.5px] mb-4 mt-4"></div>
          <div className="flex flex-col gap-4">
            <div
              className="break-words md:text-[16px] text-[12px] text-justify mr-7"
              dangerouslySetInnerHTML={{ __html: text }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default SubtitleContent;
