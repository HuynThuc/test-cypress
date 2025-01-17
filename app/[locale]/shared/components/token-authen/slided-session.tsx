'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';

import { apiClient } from '@/shared/api';

import { RootState } from '@/modules/learners/store';
import { LoginResponse } from '@/modules/helenngolang/types';
import { setTokenRefreshInterval } from '@/modules/learners/store/slice/tokenRefreshIntervalSlice';
import { clearLoginResponse } from '@/modules/learners/store/slice';

export default function SlidedSession() {
  const dispatch = useDispatch();

  const session = useSelector((state: RootState) => state.session.data);
  const tokenRefreshIntervalSlice = useSelector(
    (state: RootState) =>
      state.tokenRefreshIntervalSlice.intervalInMilliseconds,
  );

  const t = useTranslations('ToastMessage');

  useEffect(() => {
    // Minimum value is 60 seconds
    const intervalDuration = Math.max(
      ((tokenRefreshIntervalSlice > 0 ? tokenRefreshIntervalSlice : 60) *
        1000) /
        2,
      60000,
    );

    const refreshSession = async () => {
      if (!session) return;
      const expiresAt = session.authorization?.accessTokenExpiresAt;

      if (expiresAt) {
        try {
          const res = await apiClient.post<LoginResponse>(
            '/auth/refresh-token',
          );

          const now = new Date();
          const expiresAt = new Date(
            res.authorization.accessTokenExpiresAt,
          ).getTime();

          const differenceInSeconds = Math.floor(
            (expiresAt - now.getTime()) / 1000,
          );

          dispatch(setTokenRefreshInterval(differenceInSeconds));
          await apiClient.post('/auth/signin', {
            user: res.user,
            authorization: res.authorization,
          });
        } catch (error) {
          dispatch(clearLoginResponse());
          await apiClient.post('/auth/signout');
          toast.error(t('errorRefreshToken'));
        }
      }
    };
    const intervalId = setInterval(refreshSession, intervalDuration);

    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch, tokenRefreshIntervalSlice]);

  return null;
}
