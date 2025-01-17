import ErrorConstants from './ErrorConstants';

// Helper function to create error details
const createErrorDetails = (
  src: string,
  width: number,
  title: string,
  description: string,
  btnText: string,
  back: boolean,
) => ({
  src,
  width,
  height: 350, // default height
  title,
  description,
  btnText,
  back,
});

// Default error details to be reused
const noInternetError = createErrorDetails(
  '/images/no-internet.svg',
  558,
  'NoInternetConnection',
  'message',
  'btnText',
  false,
);

const internalServerError = createErrorDetails(
  '/images/something-went-wrong.svg',
  558,
  'SomethingWentWrong',
  'message',
  'btnText',
  false,
);

const pageNotFoundError = createErrorDetails(
  '/images/page-not-found.svg',
  840,
  'PageNotFound',
  'message',
  'btnText',
  true,
);

// Object containing specific error information
const ErrorDetails: { [key: string]: ReturnType<typeof createErrorDetails> } =
  {};

// Iterate over all keys in ErrorConstants
Object.keys(ErrorConstants).forEach((key) => {
  // Get the value of each constant
  const errorCode = ErrorConstants[key as keyof typeof ErrorConstants];

  // Set all errors to internalServerError by default
  ErrorDetails[errorCode] = internalServerError;
});

// Override specific errors
ErrorDetails[ErrorConstants.ErrClientPageNotFound] = pageNotFoundError;
ErrorDetails[ErrorConstants.ErrClientNoInternet] = noInternetError;

// Set a default error
ErrorDetails.default = pageNotFoundError;

export default ErrorDetails;
