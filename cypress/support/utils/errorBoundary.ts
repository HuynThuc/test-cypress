import { TEST } from '../../constants';

interface ErrorBoundaryOptions {
  screenshotOnFail?: boolean;
  videoOnFail?: boolean;
  customErrorHandler?: (error: Error) => void;
}

export const withErrorBoundary = <T>(
  testFn: () => T,
  options: ErrorBoundaryOptions = {
    screenshotOnFail: true,
    videoOnFail: true,
  },
): T => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const testTitle = Cypress.currentTest.title;

  try {
    return testFn();
  } catch (err) {
    const error = err as Error;

    if (options.screenshotOnFail) {
      cy.screenshot(`${TEST.SCREENSHOT_PREFIX}-${testTitle}-${timestamp}`, {
        capture: 'fullPage',
        overwrite: true,
      });
    }

    if (options.customErrorHandler) {
      options.customErrorHandler(error);
    }

    // Log lỗi với format rõ ràng
    cy.log('Test failed:', testTitle);
    cy.log('Error:', error.message);
    cy.log('Stack:', error.stack);


    throw error;
  }
};
