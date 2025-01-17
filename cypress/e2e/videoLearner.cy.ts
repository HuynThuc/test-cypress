import { PageFactory } from '../support/factories/PageFactory';

describe('Video Learner Page', () => {
  const loginPage = PageFactory.getLoginPage();
  const videoLearnerPage = PageFactory.getVideoLearnerPage();

  beforeEach(() => {
    cy.loginByGoogleApi();
  });

  it('should display video with learning materials', () => {
    // Login first
    loginPage.visit();
    loginPage.performGoogleLogin().then(({ user, authorization }) => {
      return loginPage.signIn(user, authorization);
    });

    // Navigate to video learner page
    videoLearnerPage.navigateToVideo(); // Có thể để trống, mặc định sẽ lấy videoId từ mock
    videoLearnerPage.waitForPageLoad();

    // Verify all required sections are present
    videoLearnerPage.verifyVideoSection();
    videoLearnerPage.verifyVocabularySection();
    videoLearnerPage.verifyQuizSection();
    videoLearnerPage.verifySubtitleSection();
  });
});
