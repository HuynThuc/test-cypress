/* eslint-disable no-unused-vars */
import { ErrorKeys } from '@/modules/learners/constants/ErrorConstants';

// feat: Add AsyncStatus enum and AsyncState interface for managing async states

// - Created AsyncStatus enum to standardize async operation statuses.
//   - Includes: 'Idle', 'Loading', 'Succeeded', and 'Failed'.

// - Created generic AsyncState<T> interface to represent common async state structure.
//   - Includes: data, status (using AsyncStatus enum), success, and error fields.

// These changes provide a reusable and consistent way to manage async operation state across the application.

export enum AsyncStatus {
  Idle = 'idle',
  Loading = 'loading',
  Succeeded = 'succeeded',
  Failed = 'failed',
}

export interface AsyncState<T> {
  code: number;
  data: T | null;
  success: boolean;
  error: ErrorKeys | null;
}
