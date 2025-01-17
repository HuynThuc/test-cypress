// lib/errorConstants.js

const ErrorConstants = {
  ErrAuthorizationHeaderNotFound: 'AUTHORIZATION_HEADER_NOT_FOUND', // no bearer token
  ErrInvalidAuthorizationHeader: 'INVALID_AUTHORIZATION_HEADER', // Must follow format "Bearer <token>"
  ErrUnsupportedAuthorizationType: 'UNSUPPORT_TYPE', // Must be "Bearer"

  ErrInvalidToken: 'TOKEN_IS_INVALID',
  ErrExpiredToken: 'ACCESS_TOKEN_HAS_EXPIRED',
  ErrExpiredRefreshToken: 'REFRESH_TOKEN_HAS_EXPIRED',

  ErrUserAccountNotFound: 'NOT_AUTHORIZED:USER_ACCOUNT_NOT_FOUND',
  ErrRefreshTokenNotFound: 'METHOD_NOT_ALLOWED:REFRESH_TOKEN_NOT_FOUND',
  ErrGoogleAuthenticationFailed: 'GOOGLE_AUTHENTICATION_FAILED',
  ErrRefreshTokenAndUserNotMatch:
    'METHOD_NOT_ALLOWED:REFRESH_TOKEN_AND_USER_NOT_MATCH',

  // Admin only
  ErrAdminAccountNotFound: 'NOT_AUTHORIZED:ADMIN_ACCOUNT_NOT_FOUND',
  ErrYouAreNotAdmin: 'NOT_AUTHORIZED:YOU_ARE_NOT_ADMIN',
  ErrYouAreNotHelper: 'NOT_AUTHORIZED:YOU_ARE_NOT_HELPER_OR_ADMIN',

  ErrInternalServerError: 'INTERNAL_SERVER_ERROR',
  ErrMethodNotAllowed: 'METHOD_NOT_ALLOWED',

  // New errors as requested
  ErrPageNotFound: 'PAGE_NOT_FOUND',
  ErrSomethingWentWrong: 'SOMETHING_WENT_WRONG',

  ErrVideoNotFound: 'VIDEO_NOT_FOUND',
  ErrWordNotFound: 'WORD_NOT_FOUND',
  ErrAudioNotFound: 'AUDIO_NOT_FOUND',
  ErrChannelNotFound: 'CHANNEL_NOT_FOUND',

  // For backend only
  ErrInvalidUUID: 'INVALID_UUID',
  ErrRecordNotFound: 'record not found',
  ErrRecordExist: 'record exist',
  ErrSystemConfigVarNotFound: 'SYSTEM_CONFIG_VAR_NOT_FOUND',

  ErrInvalidPage: 'INVALID_PAGE',
  ErrInvalidLimit:
    'INVALID_LIMIT. Limit must be greater than 0 and less than or equal to 20',

  // Client-side errors
  ErrClientPageNotFound: 'PAGE_NOT_FOUND',
  ErrClientNoInternet: 'NO_INTERNET_CONNECTION',
};

export type ErrorKeys = keyof typeof ErrorConstants;

export default ErrorConstants;
