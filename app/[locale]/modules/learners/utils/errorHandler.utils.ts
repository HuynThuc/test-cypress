/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';

export const errorHandler = {
  handleTokenRefreshError() {
    throw NextResponse.redirect(new URL('/signin', process.env.BASE_URL));
  },

  handleApiError(error: any) {
    if (error.response) {
      return Promise.reject({
        status: error.response.status,
        error: error.response.statusText || 'Internal Server Error',
        data: error.response.data || null,
      });
    }
    return Promise.reject({
      status: 500,
      error: 'Client No Internet',
      data: null,
    });
  },
};
