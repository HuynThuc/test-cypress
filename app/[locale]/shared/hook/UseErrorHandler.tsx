/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from 'axios';
import { useCallback } from 'react';
import { toast } from 'react-toastify';

import usePopUp from './UsePopUp';
import { ErrorPopup } from '../components/error/ErrorPopup';

export function useErrorHandler() {
  const { openPopUp } = usePopUp();

  const handle = useCallback(
    (error: any) => {
      const errorToMessage: { [key: string]: string } = {
        [AxiosError.ERR_BAD_REQUEST]:
          error?.response?.data?.error ?? 'Có lỗi xảy ra',
        [AxiosError.ERR_NETWORK]: 'Bạn hiện đang mất kết nối internet',
        [AxiosError.ECONNABORTED]: 'Truy cập bị từ chối',
        [AxiosError.ETIMEDOUT]:
          'Truy cập vượt quá thời gian quy định. Vui lòng liên lạc admin để biét thêm chi tiết',
      };

      const message =
        errorToMessage[error.code] ??
        'Hệ thống của chúng tôi đang không hoạt động. Vui lòng liên lạc admin để biét thêm chi tiết';

      if (error.code === AxiosError.ERR_BAD_REQUEST) {
        toast.error(message);
        return;
      }

      openPopUp({
        content: <ErrorPopup message={message} />,
      });
    },
    [openPopUp],
  );

  return {
    handle,
  };
}
