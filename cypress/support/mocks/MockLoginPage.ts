import { ILoginPage } from '../../types/pages.types';
import { AuthorizationInfo, UserInfo } from '../../types/UserInfo.types';

export class MockLoginPage implements ILoginPage {
  private mockUser: UserInfo = {
    id: '123',
    fullname: 'Test User',
    email: 'test@example.com',
    photoUrl: 'https://example.com/photo.jpg',
    locale: 'en',
    isFirstLogin: false,
    audienceType: 'student',
  };

  private mockAuth: AuthorizationInfo = {
    accessToken: 'mock-token',
    accessTokenExpiresAt: new Date().toISOString(),
    refreshToken: 'mock-refresh',
    refreshTokenExpiresAt: new Date().toISOString(),
  };

  visit(): void {
    cy.log('Mock: Visiting login page');
  }

  setSignInEndpoint(endpoint: string): void {
    cy.log('Mock: Visiting login page');
  }

  getUrl(): string {
    return '/signin';
  }

  waitForPageLoad(): void {
    cy.log('Mock: Waiting for page load');
  }

  performGoogleLogin(): Cypress.Chainable<{
    user: UserInfo;
    authorization: AuthorizationInfo;
  }> {
    return cy.wrap({ user: this.mockUser, authorization: this.mockAuth });
  }

  signIn(): Cypress.Chainable {
    return cy.wrap({ status: 200 });
  }

  signInFail(): Cypress.Chainable {
    return cy.wrap({ status: 200 });
  }
}
