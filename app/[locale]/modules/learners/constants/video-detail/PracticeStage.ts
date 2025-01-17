import { IPracticeQuiz } from '@/modules/learners/types/video-detail';

export const MissingWord = '______';
export const PracticeLevels = ['Easy🔥', 'Medium🔥🔥', 'Hard🔥🔥🔥'];
export const QuizTypes = ['QUIZ_PRACTICE_EASY', 'QUIZ_PRACTICE_MEDIUM'];
export const DefaultPracticeQuiz: IPracticeQuiz = {
  question: '',
  choices: [],
  correctAnswers: [],
  quizType: 'QUIZ_PRACTICE_EASY',
  score: 0,
  subtitleInfo: {
    startTime: 0,
    duration: 0,
    endTime: 0,
  },
};
