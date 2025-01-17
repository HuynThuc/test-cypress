# Login Test Overview

## Objective

Test the login functionality of the application, ensuring that the user can successfully log in through the authentication process and is redirected to the home page.

## Test Description

The test file **login.cy.ts** will perform the following steps:

1. Open the login page.
2. Enter the user's login information (from the `auth.json` fixture).
3. Perform the login process via Google.
4. Ensure the user is redirected to the home page after a successful login.

## Related Files

- **Fixtures**:
  - `auth.json`: Contains test data related to login information.
- **Test File**:
  - `login.cy.ts`: The file containing test cases for the login functionality.
- **Page Object**:
  - `BasePage.ts`: The base class containing common methods for other pages, such as opening a page (`visit`), getting the current page URL (`getUrl`), and waiting for the page to load (`waitForPageLoad`).
  - `HomePage.ts`: The class representing the home page, containing methods to verify elements on the home page, such as the page title.
  - `LoginPage.ts`: The class representing the login page, containing methods to handle the login process, including login via Google and logging in with user credentials.
- **Commands**:
  - `auth.commands.ts`: The class containing custom commands for the authentication process, such as `loginWithGoogle`, simplifying the handling of Google login.
- **Factories**:
  - `PageFactory.ts`: The factory class to create instances of pages (LoginPage, HomePage, VideoLearnerPage). Supports switching between mock and real implementations based on the USE_MOCKS environment variable.
- **Mocks**:
  - `MockLoginPage.ts`: Mock implementation of the LoginPage.
- **Types**:
  - `UserInfo.types.ts`: Contains data types and interfaces related to user information, such as `UserInfo` and `AuthorizationInfo`.
  - `pages.types.ts`: Contains types and interfaces for pages in the application, such as `IBasePage`, `ILoginPage`, and `IHomePage`.

## Step

1. **Open the login page**:  
   The test will begin by opening the application's login page.

2. **Enter login information**:  
   The user's information will be retrieved from the **fixtures/auth.json** file. This file contains sample account details (email, password) for testing.

3. **Login via Google**:  
   The custom command `loginWithGoogle` defined in `auth.commands.ts` will be used to perform the login process via the user's Google account.

4. **Verify successful login**:  
   After a successful login, the test will verify that the user is redirected to the home page. Verifications include:

   - The page title must be correct ("Home").
   - The URL of the page must contain `/home`.
   - Trending videos and top channels must be displayed on the page.

5. **Error handling**:  
   If there is an error during login (e.g., incorrect login information), the system should display an appropriate error message, which is verified in the **ERROR_MESSAGES** section in the `constants/index.ts` file.

## Supporting Components

- **Mock and Data Mocks**:  
   If necessary, the `MockLoginPage.ts` file in the **mocks/** directory can be used to mock server responses instead of performing actual login.

## File Structure

### **Types and Interfaces**

1. **IBasePage**:  
   Base interface for pages. Pages like `LoginPage` and `HomePage` will inherit from this interface to access basic methods such as `visit()`, `getUrl()`, and `waitForPageLoad()`.

2. **ILoginPage**:  
   Interface for the login page, inheriting from `IBasePage`. It adds methods like `performGoogleLogin()` to handle Google login and `signIn()` to log in the user with credentials.

3. **IHomePage**:  
   Interface for the home page after successful user login, providing methods to verify elements on the home page such as the page title, URL, and displayed videos and channels.

4. **GoogleLoginResponse**:  
   The response when performing Google login, including user information and authentication details.

5. **UserInfo**:  
   Detailed information about the user, including ID, full name, email, image URL, and other attributes.

6. **AuthorizationInfo**:  
   The user's authentication information, including access token and refresh token.
