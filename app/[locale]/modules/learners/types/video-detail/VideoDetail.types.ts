import { ApiResponse2 } from '@/shared/types';

import { IVideoDetail } from '@/modules/learners/types';

export interface ISubtitle {
  id: string;
  text: string;
  startTime: number;
  endTime: number;
  duration: number;
}

export interface IProcessedSubtitle {
  text: string[];
  startTime: number;
  endTime: number;
  duration: number;
}

export interface IQuizSubtitleInfo {
  startTime: number;
  endTime: number;
  duration: number;
}

export interface ISubtitlesOfVideoDetail {
  mediaInfo: IVideoDetail;
  subtitles: ISubtitle[];
}

export interface IGetSubtitlesOfVideoDetailResponse
  extends ApiResponse2<ISubtitlesOfVideoDetail> {}

export interface IDefinition {
  id: string;
  pronunciationUK: string;
  pronunciationUS: string;
  pronunciationKK: string;
  wordPlural: string;
  wordPast: string;
  wordDone: string;
  wordIng: string;
  wordThird: string;
  meaningId: number;
  pronunciationIPA: string;
  pos: string;
  posFullName: string;
  englishExample: string;
  englishDefinition: string;
  chineseTraditionalDefinition: string;
  chineseSimplifiedDefinition: string;
  japaneseDefinition: string;
  vietnameseDefinition: string;
  pronunciationUKMp3: string;
  pronunciationUSMp3: string;
  pronunciationTTSMp3: string;
  word: string;
}

export interface IWord {
  word: string;
  cefrLevel: string;
  termFrequency: number;
  definitions: IDefinition[];
}

export interface IListVideoWords {
  word: IWord;
  proficiencyLevel: number;
  similarWords: string[];
}

export interface IPracticeQuiz {
  id?: string;
  question: string;
  choices: string[];
  correctAnswers: string[];
  quizType: 'QUIZ_PRACTICE_EASY' | 'QUIZ_PRACTICE_MEDIUM';
  score: number;
  subtitleInfo: IQuizSubtitleInfo;
}

export interface IPracticeQuizHistory {
  id?: string;
  selectedAnswer: string[];
}

export interface IGetVideoQuizResponse extends ApiResponse2<IPracticeQuiz[]> {}

export interface IGetVideoWordsResponse
  extends ApiResponse2<IListVideoWords[]> {}

export interface WordProficiencyPayload {
  wordAndProficency: Array<{
    word: string;
    proficiencyLevel: number;
  }>;
}

export interface IGetTranslateResponse extends ApiResponse2<string> {}
