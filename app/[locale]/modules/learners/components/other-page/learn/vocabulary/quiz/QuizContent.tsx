/* eslint-disable no-unused-vars */
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { Button } from '@/shared/components';
import { Icons } from '@/shared/components/Icon/icons';
import { cn } from '@/shared/utils';

interface QuizContentProps {
  currentWord:
    | {
        word: string;
        definitions: Array<{
          pronunciationUSMp3: string;
        }>;
      }
    | undefined;
  answerOptions: string[];
  selectedAnswer: string | null;
  isCorrect: boolean | null;
  isLastQuestion: boolean;
  playAudio: () => void;
  handleAnswerSelect: (answer: string) => void;
  handleNextQuestion: () => void;
}

export default function QuizContent({
  currentWord,
  answerOptions,
  selectedAnswer,
  isCorrect,
  isLastQuestion,
  playAudio,
  handleAnswerSelect,
  handleNextQuestion,
}: QuizContentProps) {
  const t = useTranslations('Learn');

  if (!currentWord) {
    return <div>Loading...</div>;
  }

  return (
    <div className="text-text-secondary flex flex-col gap-3 mt-3">
      <div className="min-h-[108px] rounded-lg overflow-hidden shadow-e1">
        {/* <div className="bg-primary">
          <CustomImage
            src="/images/quiz.png"
            alt="Quiz"
            className="w-full h-[calc(15vh-10px)] md:h-[calc(25vh-20px)] object-fit"
            width={490}
            height={490}
            priority
          />
        </div> */}
        <Image
          src="/images/quiz.png"
          alt="Quiz"
          className="w-full h-full object-fit"
          width={490}
          height={490}
        />
        <div
          className="flex justify-between items-center gap-1 px-4"
          style={{
            paddingTop: 'clamp(5px, 1vw, 10px)',
            paddingBottom: 'clamp(5px, 0.8vw, 10px)',
          }}
        >
          <span className="text-xs">
            {t('listenAndChooseTheCorrectAnswer')}
          </span>
          <Button
            onClick={playAudio}
            className="bg-black dark:bg-white rounded-full dark:text-black text-white"
            style={{ height: 'clamp(20px,2vw,36px)' }}
          >
            <Icons.volumn className="mr-2 md:h-5 md:w-5 w-4 h-[calc(5vh-2px)]" />
            {t('voice')}
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {answerOptions.map((answer, index) => (
          <Button
            key={index}
            onClick={() => handleAnswerSelect(answer)}
            className={cn(
              'w-full mb-2 flex justify-center items-center bg-surface md:gap-2 border-border border-[1px] ms:h-9 h-[calc(6vh-10px)] ',
              selectedAnswer === answer
                ? isCorrect
                  ? 'border-2 border-primary text-primary'
                  : 'border-2 border-error text-error'
                : 'shadow-e1',
            )}
            disabled={selectedAnswer !== null}
          >
            {selectedAnswer === answer &&
              (isCorrect ? (
                <Icons.circleCheck className="h-5 w-5 text-primary" />
              ) : (
                <Icons.circleX className="h-5 w-5 text-error" />
              ))}

            <span
              className={cn(
                selectedAnswer &&
                  !isCorrect &&
                  answer === currentWord.word &&
                  'text-primary',
              )}
            >
              {answer}
            </span>
          </Button>
        ))}
        {selectedAnswer && (
          <Button
            onClick={handleNextQuestion}
            className="sm:mt-4 mt-8 bg-primary text-primary-foreground h-[calc(6vh-10px)] self-end"
          >
            {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
          </Button>
        )}
      </div>
    </div>
  );
}
