import { NextResponse } from 'next/server';

import { videoContinueService } from '@/app/[locale]/modules/learners/services/landing/VideoContinue.service';
import ErrorConstants from '@/modules/learners/constants/ErrorConstants';
import { getServerSession } from '@/app/[locale]/modules/learners/services/auth/SessionSever.service';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { activities } = body;
    if (!activities) {
      return NextResponse.json(
        {
          code: 400,
          success: false,
          error: ErrorConstants.ErrAuthorizationHeaderNotFound,
        },
        { status: 400 },
      );
    }
    // Call service to handle business logic
    const response = await videoContinueService.postVideoContinue({
      activities,
    });
    if (response.success) {
      return NextResponse.json(
        {
          code: 200,
          success: true,
          data: response.data,
          message: response.message,
        },
        { status: 200 },
      );
    }

    return NextResponse.json(
      { code: 400, success: false, message: response.error },
      { status: response.code },
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

export async function GET() {
  try {
    // Get accessToken from query params of the URL
    const session = getServerSession();
    // Check if accessToken is provided
    if (!session) {
      return NextResponse.json(
        {
          code: 400,
          success: false,
          error: ErrorConstants.ErrAuthorizationHeaderNotFound,
        },
        { status: 400 },
      );
    }
    // Call service to get video continue data
    const response = await videoContinueService.getVideoContinue();
    // If service returns success
    if (response.success) {
      return NextResponse.json(
        {
          code: 200,
          success: true,
          data: response.data,
          message: response.message,
        },
        { status: 200 },
      );
    }

    // If service returns an error
    return NextResponse.json(
      { code: 400, success: false, error: response.error },
      { status: response.code || 500 },
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
