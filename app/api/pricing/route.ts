import { NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';

import ErrorConstants from '@/modules/learners/constants/ErrorConstants';
import { fetchServerAllPackagePlans } from '@/modules/learners/services/pricing/Pricing.service';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'en';

    const response = await fetchServerAllPackagePlans(locale);

    return NextResponse.json(response.data);
  } catch (error) {
    let errorMessage = ErrorConstants.ErrAuthorizationHeaderNotFound;

    if (axios.isAxiosError(error) && error.response) {
      errorMessage =
        error.response.data.error ||
        ErrorConstants.ErrAuthorizationHeaderNotFound;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ ...(error as AxiosError), error: errorMessage });
  }
}
