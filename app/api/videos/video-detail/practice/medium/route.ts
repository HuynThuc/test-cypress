import axios, { AxiosError } from 'axios';
import { NextResponse } from 'next/server';

import ErrorConstants from '@/modules/learners/constants/ErrorConstants';
import { videoQuizService } from '@/modules/learners/services/video-detail/VideoQuiz.service';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const mediaUrl = searchParams.get('mediaUrl');
    if (!mediaUrl) {
      return NextResponse.json(
        {
          code: 400,
          success: false,
          error: 'Media URL is required',
        },
        { status: 400 },
      );
    }

    const response = await videoQuizService.getVideoMediumQuizs(mediaUrl);

    return NextResponse.json(response);
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
