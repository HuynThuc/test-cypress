import { PageFactory } from '../support/factories/PageFactory';

describe('Login Fail', () => {
  const loginPage = PageFactory.getLoginPage(); // new LoginPage()
  const homePage = PageFactory.getHomePage(); // new HomePage()

  beforeEach(() => {
    cy.loginByGoogleApi();
  });

  it('should login successfully and redirect the user', () => {
    loginPage.visit();

    loginPage
      .performGoogleLogin()
      .then(({ user, authorization }) => {
        return loginPage.signInFail(user, authorization);
      })
      .then((response) => {
        cy.log('Response:', JSON.stringify(response.body, null, 2));
      });

    homePage.visit();
    homePage.verifyUrl();

    homePage.verifyHomePageHeader();
  });
});
