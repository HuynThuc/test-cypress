import { NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';

import ErrorConstants from '@/modules/learners/constants/ErrorConstants';
import { wordService } from '@/modules/learners/services/video-detail/Words.service';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const mediaUrl = searchParams.get('mediaUrl');
    const practice = searchParams.get('practice') === 'true';
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

    const response = await wordService.fetchServerWords(mediaUrl, practice);

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

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { wordAndProficency } = body;

    if (!wordAndProficency || !Array.isArray(wordAndProficency)) {
      return NextResponse.json(
        {
          code: 400,
          success: false,
          error: 'Invalid payload',
        },
        { status: 400 },
      );
    }

    const success = await wordService.updateServerWordProficiency({
      wordAndProficency,
    });

    if (success) {
      return NextResponse.json(
        {
          code: 200,
          success: true,
          message: 'Word proficiency updated successfully',
        },
        { status: 200 },
      );
    }

    return NextResponse.json(
      { code: 400, success: false, error: 'Failed to update word proficiency' },
      { status: 400 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        code: 500,
        success: false,
        error: ErrorConstants.ErrSomethingWentWrong,
      },
      { status: 500 },
    );
  }
}
