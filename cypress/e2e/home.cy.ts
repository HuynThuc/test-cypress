import { PageFactory } from '../support/factories/PageFactory';

describe('Home Page Features', () => {
  const loginPage = PageFactory.getLoginPage();
  const homePage = PageFactory.getHomePage();

  beforeEach(() => {
    cy.loginByGoogleApi();
  });

  describe('Home Page Sections', () => {
    beforeEach(() => {
      loginPage.visit();
      loginPage.performGoogleLogin().then(({ user, authorization }) => {
        return loginPage.signIn(user, authorization);
      });
      homePage.visit();
      homePage.waitForPageLoad();
    });

    it('should display Trending videos and Top channels sections', () => {
      homePage.verifyTrendingVideosExist();
      homePage.verifyTopChannelsExist();
    });
  });
});
