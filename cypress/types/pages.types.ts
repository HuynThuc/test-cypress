import { AuthorizationInfo, UserInfo } from './UserInfo.types';

export interface IBasePage {
  visit(): void;
  getUrl(): string;
  waitForPageLoad(timeout?: number): void;
}

export interface ILoginPage extends IBasePage {
  performGoogleLogin(): Cypress.Chainable<GoogleLoginResponse>;
  signIn(user: UserInfo, authorization: AuthorizationInfo): Cypress.Chainable;
  signInFail(user: UserInfo, authorization: AuthorizationInfo): Cypress.Chainable;
}

export interface IHomePage extends IBasePage {
  verifyHomePageHeader(): void;
  verifyUrl(): void;
  verifyTrendingVideosExist(): void;
  verifyTopChannelsExist(): void;
}

export interface GoogleLoginResponse {
  user: UserInfo;
  authorization: AuthorizationInfo;
}

export interface IVideoLearnerPage extends IBasePage {
  verifyVideoSection(): void;
  verifyVocabularySection(): void;
  verifyQuizSection(): void;
  verifySubtitleSection(): void;
  navigateToVideo(videoId?: string): void; // Thêm optional parameter
}
