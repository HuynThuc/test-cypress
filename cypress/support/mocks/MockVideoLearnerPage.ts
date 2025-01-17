import { IVideoLearnerPage } from '../../types/pages.types';

export class MockVideoLearnerPage implements IVideoLearnerPage {
 

  visit(): void {
    cy.log('Mock: Visiting video learner page');
  }

  getUrl(): string {
    return '/learn';
  }

  waitForPageLoad(): void {
    cy.log('Mock: Waiting for page load');
  }

  navigateToVideo(videoId?: string): void {
    cy.log(`Mock: Navigating to video ${videoId}`);
  }

  verifyVideoSection(): void {
    cy.log('Mock: Verifying video section');
  }

  verifyVocabularySection(): void {
    cy.log('Mock: Verifying vocabulary section');
  }

  verifyQuizSection(): void {
    cy.log('Mock: Verifying quiz section');
  }

  verifySubtitleSection(): void {
    cy.log('Mock: Verifying subtitle section');
  }
}
