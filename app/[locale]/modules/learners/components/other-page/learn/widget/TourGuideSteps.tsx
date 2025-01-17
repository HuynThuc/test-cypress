import { Step } from 'react-joyride';

export const totalSteps: number = 10;
export const generateSteps = (val: number): Step[] => [
  {
    target: '#first-step',
    content: (
      <div>
        <h6>Start Video.</h6>
        <div className="absolute left-[38%] bottom-5 text-primary">
          {val} of {totalSteps}
        </div>
      </div>
    ),
    placement: 'right',
    disableBeacon: true,
  },
  {
    target: '#vocabulary-step',
    content: (
      <div>
        <h6>Vocabulary</h6>
        <div>Choose words to learn by flashcard and quiz.</div>
        <div className="absolute left-[38%] bottom-5 text-primary">
          {val} of {totalSteps}
        </div>
      </div>
    ),
    placement: 'left',
  },
  {
    target: '#overView-step',
    content: (
      <div>
        <h6>Choose Word</h6>
        <div>Click here to choose word.</div>
        <div className="absolute left-[38%] bottom-5 text-primary">
          {val} of {totalSteps}
        </div>
      </div>
    ),
    placement: 'right',
  },
  {
    target: '#flashcard-step',
    content: (
      <div>
        <h6>Choose Word</h6>
        <div>Click here to learn selected words.</div>
        <div className="absolute left-[38%] bottom-5 text-primary">
          {val} of {totalSteps}
        </div>
      </div>
    ),
    placement: 'right',
  },
  {
    target: '#quiz-step',
    content: (
      <div>
        <h6>Quiz</h6>
        <div>Click here to switch section learn words.</div>
        <div className="absolute left-[38%] bottom-5 text-primary">
          {val} of {totalSteps}
        </div>
      </div>
    ),
    placement: 'right',
  },
  {
    target: '#practice-step',
    content: (
      <div>
        <h6>Practice</h6>
        <div>Practice fill word in blank and dictation.</div>
        <div className="absolute left-[38%] bottom-5 text-primary">
          {val} of {totalSteps}
        </div>
      </div>
    ),
    placement: 'left',
  },
  {
    target: '#levelQuestion-step',
    content: (
      <div>
        <div>Click here to choose level of question.</div>
        <div className="absolute left-[38%] bottom-5 text-primary">
          {val} of {totalSteps}
        </div>
      </div>
    ),
    placement: 'right',
  },
  // {
  //   target: '#playRepeat-step',
  //   content: (
  //     <div>
  //       <div>Click here to listen the sentence.</div>
  //       <div className="absolute left-[38%] bottom-5 text-primary">
  //         {val} of {totalSteps}
  //       </div>
  //     </div>
  //   ),
  //   placement: 'right',
  // },
  // {
  //   target: '#inputWord-step',
  //   content: (
  //     <div>
  //       <div>Click here to type what you listened.</div>
  //       <div className="absolute left-[38%] bottom-5 text-primary">
  //         {val} of {totalSteps}
  //       </div>
  //     </div>
  //   ),
  //   placement: 'right',
  // },
  // {
  //   target: '#hintWord-step',
  //   content: (
  //     <div>
  //       <div>Click here to show hints of words.</div>
  //       <div className="absolute left-[38%] bottom-5 text-primary">
  //         {val} of {totalSteps}
  //       </div>
  //     </div>
  //   ),
  //   placement: 'top',
  // },
  {
    target: '#transcript-step',
    content: (
      <div className="">
        <h6>Transcript</h6>
        <div>View transcript to review what we learned.</div>
        <div className="absolute left-[38%] bottom-5 text-primary">
          {val} of {totalSteps}
        </div>
      </div>
    ),
    placement: 'left',
    hideBackButton: true,
  },
  {
    target: '#translate-step',
    content: (
      <div className="">
        <div>Lick here to translate the sentence.</div>
        <div className="absolute left-[38%] bottom-5 text-primary">
          {val} of {totalSteps}
        </div>
      </div>
    ),
    placement: 'left',
    hideBackButton: true,
  },
  {
    target: '#speak-step',
    content: (
      <div className="">
        <div>Click here to speak.</div>
        <div className="absolute left-[38%] bottom-5 text-primary">
          {val} of {totalSteps}
        </div>
      </div>
    ),
    placement: 'left',
    hideBackButton: true,
  },
];
