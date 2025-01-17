import BasePage from './BasePage';
import { PATHS, ERROR_MESSAGES, UI, FIXTURES } from '../../constants';
import { IHomePage } from '../../types/pages.types';

export default class HomePage extends BasePage implements IHomePage {
  constructor() {
    super(PATHS.HOME);
  }

  verifyHomePageHeader(): void {
    cy.fixture(FIXTURES.AUTH).then((authData) => {
      this.withPageError(() => {
        cy.get(UI.SELECTORS.HEADER).should('contain.text', authData.headerText);
      }, ERROR_MESSAGES.HEADER_VERIFY_FAILED);
    });
  }

  verifyUrl(): void {
    this.withPageError(() => {
      cy.url().should('eq', Cypress.config('baseUrl') + PATHS.HOME);
    }, ERROR_MESSAGES.URL_VERIFY_FAILED);
  }

  verifyTrendingVideosExist(): void {
    this.withPageError(() => {
      cy.get(UI.SELECTORS.TRENDING_SECTION).should('exist').and('be.visible');
    }, ERROR_MESSAGES.TRENDING_SECTION_NOT_FOUND);
  }

  verifyTopChannelsExist(): void {
    this.withPageError(() => {
      cy.get(UI.SELECTORS.TOPCHANNELS_SECTION)
        .should('exist')
        .and('be.visible');
    }, ERROR_MESSAGES.TOPCHANNELS_NOT_FOUND);
  }
}
