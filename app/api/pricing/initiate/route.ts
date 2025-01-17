import { NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';

import ErrorConstants from '@/modules/learners/constants/ErrorConstants';
import { initiateServerSubscription } from '@/modules/learners/services/pricing/Pricing.service';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { plan } = await request.json();

    if (!plan) {
      return NextResponse.json(
        {
          code: 400,
          success: false,
          error: 'Invalid payload or missing token',
        },
        { status: 400 },
      );
    }

    const response = await initiateServerSubscription(plan);

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
