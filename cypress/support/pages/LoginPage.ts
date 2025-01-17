import BasePage from './BasePage';
import { AuthorizationInfo, UserInfo } from '../../types/UserInfo.types';
import { PATHS, ERROR_MESSAGES, HTTP } from '../../constants';
import { ILoginPage } from '../../types/pages.types';

export default class LoginPage extends BasePage implements ILoginPage {
  constructor() {
    super(PATHS.SIGNIN);
  }


  performGoogleLogin(): Cypress.Chainable<{
    user: UserInfo;
    authorization: AuthorizationInfo;
  }> {
    return this.withPageError(
      () => cy.loginByGoogleApi(),
      ERROR_MESSAGES.LOGIN_FAILED,
    );
  }

  signIn(user: UserInfo, authorization: AuthorizationInfo): Cypress.Chainable {
    return this.withPageError(
      () =>
        cy
          .request({
            method: HTTP.METHODS.POST,
            url: PATHS.API.SIGNIN,
            body: { user, authorization },
            failOnStatusCode: false,
          })
          .then((response) => {
            expect(response.status).to.eq(HTTP.STATUS.OK);
            return response;
          }),
      ERROR_MESSAGES.SIGNIN_FAILED,
    );
  }


  signInFail(user: UserInfo, authorization: AuthorizationInfo): Cypress.Chainable {
    return this.withPageError(
      () =>
        cy
          .request({
            method: HTTP.METHODS.POST,
            url: PATHS.API.MOCK_FAIL,
            body: { user, authorization },
            failOnStatusCode: false,
          })
          .then((response) => {
            expect(response.status).to.eq(HTTP.STATUS.OK);
            return response;
          }),
      ERROR_MESSAGES.SIGNIN_FAILED,
    );
  }
}
