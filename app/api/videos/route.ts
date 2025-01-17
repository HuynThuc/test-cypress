import { NextResponse } from 'next/server';
import axios from 'axios';

import { LEARNER_API_ROUTES } from '@/modules/learners/utils';

// Handle GET request
export async function GET(req: Request): Promise<NextResponse> {
  try {
    const url = new URL(req.url);
    const queryString = url.search;
    const response = await axios.get(
      `${LEARNER_API_ROUTES.GET_VIDEO_LEARNERS}?${queryString}`,
    );
    // Return data as JSON
    return NextResponse.json(response.data);
  } catch (error) {
    let errorMessage = 'AUTHORIZATION_HEADER_NOT_FOUND';

    if (axios.isAxiosError(error) && error.response) {
      errorMessage =
        error.response.data.error || 'AUTHORIZATION_HEADER_NOT_FOUND';
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({ error: errorMessage });
  }
}
