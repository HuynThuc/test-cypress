import {
  ILoginPage,
  IHomePage,
  IVideoLearnerPage,
} from '../../types/pages.types';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import VideoLearnerPage from '../pages/VideoLearnerPage';
import { MockLoginPage } from '../mocks/MockLoginPage';
import { MockVideoLearnerPage } from '../mocks/MockVideoLearnerPage';

export class PageFactory {
  private static homePage: IHomePage;
  private static videoLearnerPage: IVideoLearnerPage;
  static getLoginPage(): ILoginPage {
    if (Cypress.env('USE_MOCKS')) return new MockLoginPage();

    return new LoginPage();
  }

  static getHomePage(): IHomePage {
    return this.homePage ?? (this.homePage = new HomePage());
  }

  static getVideoLearnerPage(): IVideoLearnerPage {
    if (Cypress.env('USE_MOCKS')) return new MockVideoLearnerPage();
    return (
      this.videoLearnerPage ?? (this.videoLearnerPage = new VideoLearnerPage())
    );
  }
}
