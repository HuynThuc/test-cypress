export const handleApiResult = <T>(
  res:
    | PromiseSettledResult<{
        data?: T;
        success?: boolean;
        error?: string;
        code?: number;
        status?: number;
      }>
    | undefined,
  defaultError: string,
): { data: T | []; error: string | null; code: number | null } => {
  if (!res) {
    return { data: [], error: defaultError, code: null };
  }
  if (res.status === 'fulfilled') {
    if (res.value?.success && 'data' in res.value) {
      // Return data if available
      return {
        data: (res.value.data as T) || [],
        error: null,
        code: res.value.code || null,
      };
    } else {
      // Return error from `res.value.error` and code if available, or default error
      return {
        data: [],
        error: res.value?.error || defaultError,
        code: res.value?.code || null,
      };
    }
  }

  if (res.status === 'rejected') {
    // Check error type when rejected
    const error =
      res.reason instanceof Error
        ? res.reason.message
        : typeof res.reason === 'string'
          ? res.reason
          : defaultError;

    return { data: [], error, code: null };
  }

  return { data: [], error: defaultError, code: null };
};
