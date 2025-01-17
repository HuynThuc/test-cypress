import { NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';

import { fetchServerSubscription } from '@/modules/learners/services/pricing/Pricing.service';
import ErrorConstants from '@/modules/learners/constants/ErrorConstants';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const subscription = await fetchServerSubscription();

    return NextResponse.json(subscription.data);
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
