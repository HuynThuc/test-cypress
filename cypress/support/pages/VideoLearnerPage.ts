// pages/VideoLearnerPage.ts
import BasePage from './BasePage';
import { PATHS, ERROR_MESSAGES, FIXTURES, UI } from '../../constants';
import { IVideoLearnerPage } from '../../types/pages.types';

export default class VideoLearnerPage
  extends BasePage
  implements IVideoLearnerPage
{
  constructor() {
    super(PATHS.LEARN);
  }

  navigateToVideo(): void {
    // Load fixture and navigate to video
    cy.fixture(FIXTURES.VIDEO_LEARNER).then((data) => {
      const videoId = data.videoId; // Lấy giá trị videoId từ fixture
      const videoUrl = `${this.url}?v=${videoId}`;
      this.withPageError(() => {
        this.url = videoUrl; // Cập nhật URL tạm thời
        this.visit(); // Gọi lại visit từ lớp cơ sở
      }, ERROR_MESSAGES.VISIT_FAILED(videoUrl));
    });
  }


  verifyVideoSection(): void {
    this.withPageError(() => {
      this.getSelector(UI.SELECTORS.VIDEO_SECTION)
      .should('exist')
      .and('be.visible');
    }, ERROR_MESSAGES.QUIZ_SECTION_VERIFY_FAILED);
  }

  verifyVocabularySection(): void {
    this.withPageError(() => {
      this.getSelector(UI.SELECTORS.VOCAB_SECTION)
      .should('exist')
      .and('be.visible');
    }, ERROR_MESSAGES.QUIZ_SECTION_VERIFY_FAILED);
  }

  verifyQuizSection(): void {
    this.withPageError(() => {
      this.getSelector(UI.SELECTORS.QUIZ_SECTION)
        .should('exist')
        .and('be.visible');
    }, ERROR_MESSAGES.QUIZ_SECTION_VERIFY_FAILED);
  }
  

  verifySubtitleSection(): void {
    this.withPageError(() => {
      this.getSelector(UI.SELECTORS.SUBTITLE_SECTION)
        .should('exist')
        .and('be.visible');
    }, ERROR_MESSAGES.SUBTITLE_SECTION_VERIFY_FAILED);
  }
}
