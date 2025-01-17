# Home Page Features Test

## **Test Overview**

### **Objective**

This test ensures that the **Home Page** displays all the necessary sections correctly after a successful login, verifying that the trending videos and top channels sections are displayed.

### **Test Description**

The test will perform the following steps:

1. Log in via Google API to authenticate the user.
2. Navigate to the **Home Page** after logging in.
3. Verify that the **Trending Videos** and **Top Channels** sections are present and displayed correctly.

## Related Files

- **Test File**:
  - `home.cy.ts`: The file containing test cases for the login functionality.
- **Page Object**:
  - `BasePage.ts`: The base class containing common methods for other pages, such as opening a page (`visit`), getting the current page URL (`getUrl`), and waiting for the page to load (`waitForPageLoad`).
  - `HomePage.ts`: The class representing the home page, containing methods to verify elements on the home page, such as the page title.
  - `LoginPage.ts`: The class representing the login page, containing methods to handle the login process, including login via Google and logging in with user credentials.
- **Commands**:
  - `auth.commands.ts`: The class containing custom commands for the authentication process, such as `loginWithGoogle`, simplifying the handling of Google login.
- **Factories**:
  - `PageFactory.ts`: The factory class to create instances of pages (LoginPage, HomePage, VideoLearnerPage). Supports switching between mock and real implementations based on the USE_MOCKS environment variable.
- **Types**:

  - `pages.types.ts`: Contains types and interfaces for pages in the application, such as `IBasePage`, `ILoginPage`, and `IHomePage`.

  ### **Assertions**

  The following assertions are verified during the test:

- **Trending Videos Section**: Verifies that the trending videos section is displayed correctly.
- **Top Channels Section**: Verifies that the top channels section is displayed correctly.

---

### **Scenario 1: Home Page - Verify Sections Displayed**

- **Goal**: Ensure that the **Video Learner Page** loads all necessary sections after a successful login.
- **Steps**:
  1. Perform Google login.
  2. Navigate to the **Home Page**.
  3. Verify that all required sections are displayed:
     - **Trending Videos Section**: Using `UI.SELECTORS.TRENDING_SECTION`, confirm that the trending videos section is displayed (defined in the `constants/index.ts` file).
     - **Top Channels Section**: Using `UI.SELECTORS.TOPCHANNELS_SECTION`, confirm that the top channels section is displayed (defined in the `constants/index.ts` file).

## File Structure

### **Types and Interfaces**

1. **IBasePage**:  
   Base interface for pages. Pages like `LoginPage` and `HomePage` will inherit from this interface to access basic methods such as `visit()`, `getUrl()`, and `waitForPageLoad()`.

2. **ILoginPage**:  
   Interface for the login page, inheriting from `IBasePage`. It adds methods like `performGoogleLogin()` to handle Google login and `signIn()` to log in the user with credentials.

3. **IHomePage**:  
   Interface for the home page after successful user login, providing methods to verify elements on the home page such as the page title, URL, and displayed videos and channels.
