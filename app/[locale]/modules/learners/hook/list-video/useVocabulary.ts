import { useState, useEffect } from 'react';

import { IListVideoWords } from '@/modules/learners/types/video-detail/VideoDetail.types';
import {
  StageId,
  vocabularyStages,
} from '@/modules/learners/constants/video-detail/vocabulary/VocabularyStageDefinition';
import { fetchWords } from '@/modules/learners/services/video-detail/fetchWords.service';

export const useVocabulary = (
  videoId: string,
  isGuest: boolean,
  currentStage: StageId,
) => {
  const [wordsData, setWordsData] = useState<IListVideoWords[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWords = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
        const data = await fetchWords(
          youtubeUrl,
          currentStage !== vocabularyStages[0].id,
          isGuest,
        );
        if (data && data.data) setWordsData(data.data);
        else setError('Failed to load vocabulary data');
      } catch (err) {
        setError('An error occurred while loading vocabulary data');
      } finally {
        setIsLoading(false);
      }
    };

    if (videoId) loadWords();
  }, [videoId, currentStage, isGuest]);

  return { wordsData, isLoading, error };
};
