import { ErrorKeys } from '@/modules/learners/constants';
import ErrorConstants from '@/modules/learners/constants/ErrorConstants';

// Function to check if the error code is in ErrorConstants
export function validateErrorCode(errorCode: string): ErrorKeys {
  // If the error code exists in ErrorConstants, return the error code; otherwise, return the default error code
  return Object.values(ErrorConstants).includes(errorCode)
    ? (errorCode as ErrorKeys)
    : 'ErrSomethingWentWrong';
}
