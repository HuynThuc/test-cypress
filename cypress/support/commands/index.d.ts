import { GoogleLoginResponse } from '../../types';

declare global {
  namespace Cypress {
    interface Chainable {
      mockGoogleLogin(): Chainable<string>;
      loginByGoogleApi(): Chainable<GoogleLoginResponse>;
    }
  }
}
