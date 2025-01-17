import { GoogleLoginResponse } from '../../types';
import { PATHS, AUTH, HTTP } from '../../constants';
import { randomUUID } from '../utils/supportFunc';

// Q: Why am I doing this?
// A: Testing Google Auth is a well described anti-pattern that's been asked on here several times and is not supported.
// Testing 3rd party sites you don't control is never a good idea - and there is always a better approach.
// In this case what you're describing is testing oAuth. To test that - you'll need to go through Google's programmatic API's directly with cy.request() - as opposed to using the UI.
// Trying to use Google or other 3rd party login provider is against their terms of service (they explicitly disallow logging in via bots) and they will block you. Even trying to run automated tests against www.google.com search will not work. They have advanced anti-bot protection measures that will throw up Captcha's. Worse, they do A/B testing and modify their login service UI's on a regular basis. The only way to utilize them is to use their programmatic API's directly and avoid the UI.
// With that said - ideally you wouldn't even do this - the whole purpose of logging into a 3rd party is to receive a token, which you can usually bypass entirely if your server does not actually use it for a direct integration with the provider.
// For more details see here: https://docs.cypress.io/guides/references/best-practices.html#Visiting-external-sites
Cypress.Commands.add('mockGoogleLogin', () => {
  return cy
    .request({
      method: HTTP.METHODS.POST,
      url: PATHS.API.MOCK_GOOGLE_LOGIN,
    })
    .then((response) => {
      expect(response.status).to.eq(HTTP.STATUS.OK);
      expect(response?.body?.data).to.be.a('string');

      return response?.body?.data as string;
    });
});

Cypress.Commands.add('loginByGoogleApi', () => {
  const deviceID = randomUUID();

  cy.mockGoogleLogin().then((accessToken) => {
    cy.request({
      method: HTTP.METHODS.POST,
      url: PATHS.API.SSO_LOGIN,
      body: {
        accessToken: accessToken,
        providerName: AUTH.PROVIDER.GOOGLE,
        deviceID: deviceID,
        os: AUTH.PLATFORM.OS,
        osVersion: AUTH.PLATFORM.OS_VERSION,
      },
    }).then((response) => {
      expect(response.status).to.eq(HTTP.STATUS.OK);
      return response.body.data as GoogleLoginResponse;
    });
  });
});
