'use client';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

import { RootState } from '@/modules/learners/store';
import {
  initialStageStatus,
  StageId,
  vocabularyStages,
} from '@/modules/learners/constants/video-detail/vocabulary/VocabularyStageDefinition';
import { StageProgress } from '@/modules/learners/components/other-page/learn/vocabulary/widgets/StageProgress';
import { GuestPopupDialog } from '@/modules/learners/components/other-page/learn/vocabulary/widgets/GuestPopupDialog';
import { CurrentStageRenderer } from '@/modules/learners/components/other-page/learn/vocabulary/widgets/CurrentStageRenderer';
import {
  IListVideoWords,
  WordProficiencyPayload,
} from '@/modules/learners/types/video-detail/VideoDetail.types';
import { updateWordProficiency } from '@/modules/learners/services/video-detail/fetchWords.service';

interface VocabularyProps {
  wordData: IListVideoWords[];
  wordDataError: string | null;
}

const Vocabulary: React.FC<VocabularyProps> = ({ wordData, wordDataError }) => {
  const router = useRouter();
  const clientSession = useSelector((state: RootState) => state.session);
  const [currentStage, setCurrentStage] = useState<StageId>(
    vocabularyStages[0].id,
  );
  const [stageStatus, setStageStatus] = useState(initialStageStatus);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [showGuestPopup, setShowGuestPopup] = useState(false);
  const [errorMessage, setError] = useState<string | null>(null);

  const isGuest = clientSession.data === null;

  useEffect(() => {
    if (wordData) {
      const defaultSelectedWords = wordData
        .filter((item) => item.proficiencyLevel >= 1)
        .map((item) => item.word.word);
      setSelectedWords(defaultSelectedWords);
    }
  }, [wordData]);
  // Handle early return here after hooks are set
  if (wordDataError || !wordData) return null;

  const handleStageChange = (stage: StageId) => {
    if (isGuest && stage !== vocabularyStages[0].id) {
      setShowGuestPopup(true);
      return;
    }
    if (stage !== currentStage) setCurrentStage(stage);
  };

  const moveToNextStage = () => {
    const currentIndex = vocabularyStages.findIndex(
      (stage) => stage.id === currentStage,
    );
    if (currentIndex < vocabularyStages.length - 1) {
      const nextStage = vocabularyStages[currentIndex + 1].id;
      setCurrentStage(nextStage);
      setStageStatus((prev) => ({
        ...prev,
        [currentStage]: 'completed',
        [nextStage]: 'inProgress',
      }));
    } else {
      setCurrentStage(vocabularyStages[0].id);
      setStageStatus(initialStageStatus);
    }
  };

  const handleToggleAll = () => {
    if (currentStage === vocabularyStages[0].id) {
      const allWords = wordData.map((item) => item.word.word);
      setSelectedWords(
        selectedWords.length === allWords.length ? [] : allWords,
      );
    } else if (currentStage === vocabularyStages[1].id) {
      moveToNextStage();
    }
  };

  const handleWordSelection = (word: string) => {
    setSelectedWords((prev) =>
      prev.includes(word) ? prev.filter((w) => w !== word) : [...prev, word],
    );
  };

  const handleUpdateWordProficiency = async (
    payload: WordProficiencyPayload,
  ) => {
    if (isGuest) {
      setShowGuestPopup(true);
      return;
    }
    try {
      await updateWordProficiency(payload);
      // Move to the next stage after successfully updating word proficiency
      if (currentStage === vocabularyStages[0].id) moveToNextStage();
    } catch (err) {
      setError('Failed to update word proficiency');
    }
  };

  const handleGuestPopupClose = () => setShowGuestPopup(false);

  const handleSignIn = () => router.push('/signin');

  if (errorMessage)
    return <div className="text-error text-center p-4">{errorMessage}</div>;

  return (
    <div className="px-4 w-full h-full">
      <StageProgress
        stages={vocabularyStages}
        currentStage={currentStage}
        stageStatus={stageStatus}
        onStageChange={handleStageChange}
        onToggleAll={handleToggleAll}
      />

      <div className="relative m-0">
        <CurrentStageRenderer
          currentStage={currentStage}
          isLoading={false}
          wordsData={wordData}
          // setWordData={setwordData}
          selectedWords={selectedWords}
          onWordSelection={handleWordSelection}
          onMoveToNextStage={moveToNextStage}
          onUpdateWordProficiency={handleUpdateWordProficiency}
        />
      </div>

      <GuestPopupDialog
        open={showGuestPopup}
        onClose={handleGuestPopupClose}
        onSignIn={handleSignIn}
      />
    </div>
  );
};

export default Vocabulary;
