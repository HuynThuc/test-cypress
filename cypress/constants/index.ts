export const FIXTURES = {
  AUTH: 'auth.json',
  VIDEO_LEARNER: 'videoLearner.json',
} as const;

export const PATHS = {
  SIGNIN: '/signin',
  HOME: '/',
  LEARN: '/learn',
  API: {
    MOCK_FAIL: '/api/mock-fail', // Endpoint giả lập lỗi
    MOCK_GOOGLE_LOGIN: `${Cypress.env('backendUrl')}/sso/mock-gen-google-accesstoken`,
    SSO_LOGIN: '/api/sso/login',
    SIGNIN: '/api/auth/signin',
    OAUTH_TOKEN: 'https://oauth2.googleapis.com/token',
  },
} as const;


export const TEST = {
  SCREENSHOT_PREFIX: 'error',
  DEFAULT_TIMEOUT: 10000,
} as const;

export const UI = {
  SELECTORS: {
    HEADER: 'h1',
    VIDEO_SECTION: '.aspect-video',
    VOCAB_SECTION: '#vocabulary-step',
    QUIZ_SECTION: '#practice-step',
    SUBTITLE_SECTION: '#transcript-step',
    TRENDING_SECTION: 'h6:contains("Trending videos")',
    TOPCHANNELS_SECTION: 'h6:contains("Top Channels This Week")', // Thêm selector
  },
} as const;

export const AUTH = {
  PROVIDER: {
    GOOGLE: 'google-oauth2',
  },
  PLATFORM: {
    OS: 'web',
    OS_VERSION: 'web',
  },
  GRANT_TYPE: {
    REFRESH_TOKEN: 'refresh_token',
  },
} as const;

export const HTTP = {
  METHODS: {
    POST: 'POST',
    GET: 'GET',
    PUT: 'PUT',
    DELETE: 'DELETE',
  },
  STATUS: {
    OK: 200,
  },
} as const;

export const ERROR_MESSAGES = {
  VISIT_FAILED: (url: string) => `Failed to visit ${url}:`,
  LOGIN_FAILED: 'Google login failed:',
  SIGNIN_FAILED: 'Sign in failed:',
  PAGE_LOAD_TIMEOUT: 'Page load timeout:',
  HEADER_VERIFY_FAILED: 'Header verification failed:',
  URL_VERIFY_FAILED: 'URL verification failed:',
  SELECTOR_NOT_FOUND: 'Selector not found',
  VOCAB_SECTION_VERIFY_FAILED: 'Vocab section verification failed:',
  QUIZ_SECTION_VERIFY_FAILED: 'Quiz section verification failed:',
  SUBTITLE_SECTION_VERIFY_FAILED: 'Subtitle section verification failed:',
  TRENDING_SECTION_NOT_FOUND: 'Trending videos section not found',
  TOPCHANNELS_NOT_FOUND: 'Top channels section not found',
} as const;


