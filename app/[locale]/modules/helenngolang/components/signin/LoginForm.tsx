'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useGoogleLogin } from '@react-oauth/google';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useTranslations } from 'next-intl';

import { Button } from '@/shared/components';
import { apiClient } from '@/shared/api';
import { useDeviceUUID } from '@/shared/hook';

import LoadingLottie from '@/lottie/loading.json';

import { authServices } from '@/modules/helenngolang/services';
import { setLoginResponse } from '@/modules/learners/store/slice';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

const SignInForm = () => {
  const t = useTranslations('Login');
  const router = useRouter();
  const dispatch = useDispatch();
  const deviceUUID = useDeviceUUID();

  const [isLoading, setLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (deviceUUID) setIsReady(true);
  }, [deviceUUID]);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      if (tokenResponse.access_token && isReady) {
        try {
          const res = await authServices.ssoLogin(
            tokenResponse.access_token,
            deviceUUID,
          );

          if (res?.user && res?.authorization) {
            const cookieRes: { code: number; message: string } =
              await apiClient.post('/auth/signin', {
                user: res.user,
                authorization: res.authorization,
              });
            if (cookieRes.code === 200) {
              toast.success(t('Success'));
              dispatch(setLoginResponse(res));
              router.push('/');
              router.refresh();
              setLoading(true); // Start loading animation
            } else toast.error(t('ErrorCookie'));
          } else toast.error(t('ErrorLogin'));
        } catch (error) {
          toast.error(t('ErrorLogin'));
        }
      }
    },
    onError: () => toast.error(t('ErrorGoogle')),
  });

  const renderLoading = () =>
    isLoading && (
      <div className="absolute flex w-full items-center justify-center">
        <Lottie
          className="mx-auto w-20 scale-125"
          animationData={LoadingLottie}
        />
      </div>
    );

  return (
    <div className="mx-auto h-screen border-gray-200 shadow-md">
      <div className="relative h-full w-full rounded-2xl">
        {renderLoading()}
        <div className="mx-auto w-fit pt-40">
          <Image
            rel="preload"
            src="/images/rabito-english.ico"
            alt="Google logo"
            className="mx-auto max-w-xs h-auto object-cover"
            width={120}
            height={200}
            priority={true}
          />
        </div>
        <p className="mx-auto w-fit px-2 pb-3 pt-5 text-3xl font-bold text-text-light">
          Rabito English
        </p>
        <div className="mx-auto w-72 py-5">
          <Button
            disabled={!isReady}
            onClick={() => {
              if (isReady) login();
              else router.refresh();
            }}
            className="primary-custom-btn flex w-full gap-2 py-5 border-[1px] border-blue-100 bg-white text-black hover:bg-gray-100"
          >
            <Image
              src="/images/logo_googleg_48dp.svg"
              alt="Google logo"
              width={25}
              height={25}
              className="max-w-7 h-auto object-cover"
            />
            <p className="text-base">
              {isReady ? t('LoginWithGoogle') : 'Loading ...'}
            </p>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
