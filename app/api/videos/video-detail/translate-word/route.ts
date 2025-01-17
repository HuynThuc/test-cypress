import { NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';

import ErrorConstants from '@/modules/learners/constants/ErrorConstants';
import { wordService } from '@/modules/learners/services/video-detail/Words.service';

export async function POST(request: Request) {
  try {
    const { youtubeSubtitleId, languageCode } = await request.json();
    if (!youtubeSubtitleId || !languageCode) {
      return NextResponse.json(
        {
          error: 'youtubeSubtitleId and languageCode are required parameters.',
        },
        { status: 400 },
      );
    }
    const response = await wordService.getTranslatedWords(
      youtubeSubtitleId,
      languageCode,
    );
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
