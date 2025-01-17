import { withErrorBoundary } from '../utils/errorBoundary';
import { ERROR_MESSAGES } from '../../constants';
import { IBasePage } from '../../types/pages.types';

export default abstract class BasePage implements IBasePage {
  protected url: string;

  constructor(url: string) {
    this.url = url;
  }

  protected withPageError<T>(
    action: () => T,
    errorMessage: string,
    options: { screenshotOnFail?: boolean; videoOnFail?: boolean } = {
      screenshotOnFail: true,
      videoOnFail: true,
    },
  ): T {
    return withErrorBoundary(action, {
      ...options,
      customErrorHandler: (error) => {
        cy.log(errorMessage, error.message);
      },
    });
  }

  visit(): void {
    this.withPageError(
      () => cy.visit(this.url),
      ERROR_MESSAGES.VISIT_FAILED(this.url),
    );
  }

  getUrl(): string {
    return this.url;
  }

  waitForPageLoad(timeout = 10000): void {
    this.withPageError(
      () => cy.wait(timeout),
      ERROR_MESSAGES.PAGE_LOAD_TIMEOUT,
    );
  }

  getSelector(selector: string): Cypress.Chainable {
    return this.withPageError(
      () => cy.get(selector),
      ERROR_MESSAGES.SELECTOR_NOT_FOUND,
    );
  }
}
