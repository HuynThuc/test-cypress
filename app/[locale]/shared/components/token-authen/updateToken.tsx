'use client';

import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { fetchSession } from '@/shared/components/token-authen/fetchSession';

import { LoginResponse } from '@/modules/helenngolang/types';
import {
  clearLoginResponse,
  setLoginResponse,
} from '@/modules/learners/store/slice';

export const UpdateToken = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const updateSession = async () => {
      const session: LoginResponse | null = await fetchSession();

      if (session) {
        dispatch(setLoginResponse(session));
      } else {
        dispatch(clearLoginResponse());
      }
    };

    updateSession();
  }, [dispatch]);

  return null;
};
