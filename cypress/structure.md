# Cypress Project Structure

This document outlines the structure of the Cypress project, detailing the purpose of each directory and file.

## Directories and Files

### cypress/

- **constants/**: Contains project-wide constants and configuration values.

  - `index.ts`: Centralizes all constant definitions including:
    - `FIXTURES`: References to fixture files.
    - `PATHS`: URL paths and API endpoints.
    - `UI`: UI selectors and elements.
    - `AUTH`: Authentication-related constants.
    - `HTTP`: HTTP methods and status codes.
    - `ERROR_MESSAGES`: Standardized error messages.
    - `TEST`: Testing configuration values.

- **e2e/**: Contains end-to-end test files.

  - `login.cy.ts`: Test file for login functionality.
  - `videoLearner.cy.ts`: Test file for the Video Learner page functionality.
  - `home.cy.ts`

- **fixtures/**: Contains static data files used in tests.

  - `auth.json`: Contains authentication-related test data.
  - `videoLearner.json`: Contains test data for the Video Learner page.

- **support/**: Additional support files.

  - **commands/**: Custom Cypress commands.

    - `auth.commands.ts`: Commands related to authentication.
    - `index.d.ts`: Type definitions for custom commands.

  - **factories/**: Factory classes for page object instantiation.
    - `PageFactory.ts`: Central factory for page objects.
      - Creates appropriate page instances.
      - Handles mock vs. real implementation selection.
      - Maintains singleton instances where appropriate.

- **mocks/**: Mock implementations for testing.

  - `MockLoginPage.ts`: Mock login page for testing.
    - Provides mock user data.
    - Simulates authentication flow.
    - Used when `USE_MOCKS` environment variable is true.

- **pages/**: Page object implementations.

  - `BasePage.ts`: Abstract base class implementing `IBasePage`.

    - Provides error handling.
    - Implements common page methods.
    - Uses `withErrorBoundary` utility.

  - `HomePage.ts`: Home page implementation.

    - Verifies page header.
    - Validates URL.
    - Checks for trending videos.
    - Verifies top channels section.

  - `LoginPage.ts`: Login page implementation.

    - Handles Google login flow.
    - Manages sign-in process.
    - Processes authentication responses.

  - `VideoLearnerPage.ts`: Video learner page implementation.
    - Loads video using data from fixture.
    - Verifies video section, vocabulary section, quiz section, and transcript section.
    - Navigates to video based on `videoId` from the fixture.

- **utils/**: Utility functions and helpers.

  - `supportFunc.ts`: Contains utility functions like `randomUUID`.

- **types/**: TypeScript type definitions.
  - `index.ts`: Exports all type definitions.
  - `pages.types.ts`: Type definitions for page objects.
    - `IBasePage`: Base interface for all pages.
    - `ILoginPage`: Login page interface.
    - `IHomePage`: Home page interface.
    - `IVideoLearnerPage`: Video learner page interface.
    - `GoogleLoginResponse`: Google login response interface.
  - `UserInfo.types.ts`: Type definitions for user information.

### Root Files

- **cypress.config.ts**: Configuration file for Cypress settings.
- **.gitignore**: Specifies files and directories to be ignored by Git.

## Key Concepts

- **Custom Commands**: Extend Cypress with reusable commands, defined in the `support/commands` directory.
- **Fixtures**: Provide static data for tests, stored in the `fixtures` directory.
- **TypeScript Support**: Use TypeScript for type safety and better code quality, with type definitions in the `types` directory.
- **Utilities**: Helper functions to support tests, located in the `support/utils` directory.
- **Constants**: Centralize configuration and constant values used throughout the project in the `constants` directory.
- **Page Objects**: Implemented in the `pages/` directory, representing individual pages of the application and defining methods for interacting with them.
- **Mocks**: Used to simulate real data and behavior during testing, defined in the `mocks/` directory.
- **Factories**: Factory classes that handle the creation of page object instances, managing the logic for mock and real implementations.

## Best Practices

- **Organize Tests**: Group related tests in the `e2e` directory for better maintainability.
- **Use Fixtures**: Store test data in fixtures to separate data from test logic.
- **Leverage TypeScript**: Use TypeScript to catch errors early and improve code readability.
- **Modularize Commands**: Keep custom commands modular and organized in the `commands` directory.
- **Centralize Constants**: Define constants in the `constants` directory to ensure consistency and easy maintenance across the project.
- **Use Page Objects**: Implement reusable page objects for managing interactions with different pages in the application.
- **Mock Data for Testing**: Use mocks to simulate real-world data and authentication flows for testing purposes.
- **Use Factories for Page Object Instantiation**: Centralize the creation of page objects with a factory pattern for better flexibility and maintainability.
