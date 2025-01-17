'use server';

import { getServerSession } from '@/modules/learners/services/auth/SessionSever.service'; // Import hàm server của bạn
import { LoginResponse } from '@/modules/helenngolang/types';

export async function fetchSession(): Promise<LoginResponse | null> {
  try {
    const session: LoginResponse | null = await getServerSession();
    return session;
  } catch (error) {
    return null;
  }
}
