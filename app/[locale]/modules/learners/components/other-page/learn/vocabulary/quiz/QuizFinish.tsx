import React from 'react';

import { Button } from '@/app/[locale]/shared/components';

interface QuizFinishProps {
  message: string;
  subMessage: string;
  onResetProgress?: () => void;
  onMoveToNextStage: () => void;
}

export default function QuizFinish({
  message,
  subMessage,
  onResetProgress,
  onMoveToNextStage,
}: QuizFinishProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      <h2 className="text-2xl font-bold mb-4">{message}</h2>
      <p className="mb-4">{subMessage}</p>
      {onResetProgress && (
        <Button
          onClick={onResetProgress}
          className="bg-primary text-text-onPrimary mb-4"
        >
          Back to Overview
        </Button>
      )}
      <Button
        onClick={onMoveToNextStage}
        className="bg-primary text-text-onPrimary"
      >
        Move to Next Stage
      </Button>
    </div>
  );
}
