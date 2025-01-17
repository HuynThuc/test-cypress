'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { apiClient } from '@/shared/api';

import { clearLoginResponse } from '@/modules/learners/store/slice';

const MAX_REFRESH_COUNT = 2;

const RefreshAccessToken = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isRefreshed, setIsRefreshed] = useState(false);

  useEffect(() => {
    const refreshPageOnServer = async () => {
      const refreshCount = parseInt(
        localStorage.getItem('refreshCount') || '0',
        10,
      );

      if (!isRefreshed && refreshCount < MAX_REFRESH_COUNT) {
        setIsRefreshed(true);
        // Increase the refresh count
        localStorage.setItem('refreshCount', (refreshCount + 1).toString());

        // Reload the page
        window.location.reload();
      } else if (refreshCount >= MAX_REFRESH_COUNT) {
        // If the maximum refresh count is reached, call the API to delete the session and update the Redux state
        await deleteSession();

        // Remove refreshCount from localStorage to prevent repetition
        localStorage.removeItem('refreshCount');
      }
    };

    refreshPageOnServer();
  }, [isRefreshed, router]);

  const deleteSession = async () => {
    try {
      await apiClient.post('/auth/signout');
      dispatch(clearLoginResponse());
    } catch (error) {
      //log error file
      // eslint-disable-next-line no-console
      console.error('Error deleting session:', error);
    }
  };

  return null;
};

export default RefreshAccessToken;
