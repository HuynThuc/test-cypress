## **Test Overview**

### **Objective**

The test is designed to ensure that the **Video Learner Page** functions correctly. It verifies that the page is accessible after login and that all necessary learning materials (video, vocabulary, quiz, subtitles) are properly displayed.

### **Test Description**

The test scenario will perform the following steps:

1. Log in via Google API to authenticate the user.
2. Navigate to the **Video Learner Page**.
3. Verify that all required sections (video, vocabulary, quiz, and subtitles) are correctly loaded and displayed.

## Related Files

- **Fixtures**:
  - `videoLeaner.json`: Contains test data related to login information.
- **Test File**:
  - `videoLearner.cy.ts`: The file containing test cases for the login functionality.
- **Page Object**:
  - `BasePage.ts`: The base class containing common methods for other pages, such as opening a page (`visit`), getting the current page URL (`getUrl`), and waiting for the page to load (`waitForPageLoad`).
  - `HomePage.ts`: The class representing the home page, containing methods to verify elements on the home page, such as the page title.
  - `LoginPage.ts`: The class representing the login page, containing methods to handle the login process, including login via Google and logging in with user credentials.
  - `VideoLearnerPage.ts`: Contains methods for interacting with the video learner page. This page includes functionalities like navigating to the page and verifying each section.
- **Commands**:
  - `auth.commands.ts`: The class containing custom commands for the authentication process, such as `loginWithGoogle`, simplifying the handling of Google login.
- **Factories**:
  - `PageFactory.ts`: The factory class to create instances of pages (LoginPage, HomePage, VideoLearnerPage). Supports switching between mock and real implementations based on the USE_MOCKS environment variable.
- **Mocks**:
  - `MockLoginPage.ts`: Mock implementation of the LoginPage.
  - `MockVideoLearnerPage.ts`: Mock implementation of the VideoLearnerPage.
- **Types**:
  - `UserInfo.types.ts`: Contains data types and interfaces related to user information, such as `UserInfo` and `AuthorizationInfo`.
  - `pages.types.ts`: Contains types and interfaces for pages in the application, such as `IBasePage`, `ILoginPage`, and `IHomePage`.

### **Assertions**

The following assertions are verified during the test:

- **Video Section**: Confirms the video player is loaded.
- **Vocabulary Section**: Confirms the vocabulary section is displayed.
- **Quiz Section**: Ensures the quiz section is present.
- **Subtitle Section**: Verifies the subtitles are available.

---

### **Scenario 1: Video Learner Page - Verify Learning Materials**

- **Goal**: Ensure that the **Video Learner Page** loads all necessary sections after a successful login.
- **Steps**:
  1. Perform Google login.
  2. Navigate to the **Video Learner Page**.
  3. Retrieve `videoId` from the **fixtures/videoLearner.json** file.
  4. Verify that all required sections are displayed:
     - **Video Section**: Using `UI.SELECTORS.VIDEO_SECTION`, confirms that the video player is loaded (defined in the `constants/index.ts` file).
     - **Vocabulary Section**: Using `UI.SELECTORS.VOCAB_SECTION`, confirm that the vocabulary section is displayed (defined in the `constants/index.ts` file).
     - **Quiz Section**: Using `UI.SELECTORS.QUIZ_SECTION` ensure that the quiz section is present (defined in the `constants/index.ts` file).
     - **Subtitle Section**: Using `UI.SELECTORS.SUBTITLE_SECTION` verify that the subtitles are available (defined in the `constants/index.ts` file).

## Supporting Components

- **Mock and Data Mocks**:  
   If necessary, the `MockLoginPage.ts` file in the **mocks/** directory can be used to mock server responses instead of performing actual login.

## File Structure

### **Types and Interfaces**

1. **IBasePage**:  
   Base interface for pages. Pages like `LoginPage` and `HomePage` will inherit from this interface to access basic methods such as `visit()`, `getUrl()`, and `waitForPageLoad()`.

2. **ILoginPage**:  
   Interface for the login page, inheriting from `IBasePage`. It adds methods like `performGoogleLogin()` to handle Google login and `signIn()` to log in the user with credentials.

3. **GoogleLoginResponse**:  
   The response when performing Google login, including user information and authentication details.

4. **VideoLearnerPage**:  
   Interface for the video learner page, which extends `IBasePage` and provides specific methods for interacting with the video learning content such as verifying the video section, vocabulary section, quiz section, and subtitles.
