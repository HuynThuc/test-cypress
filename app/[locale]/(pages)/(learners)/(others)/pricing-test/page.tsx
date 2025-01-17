'use client';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button } from '@/shared/components';
import { apiClient } from '@/shared/api';

import { openDialog } from '@/modules/learners/store/slice/pricing/pricingDialogSlice';

interface ApiResponse {
  code: number;
  success: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  error?: string;
}

export default function PricingPage() {
  const dispatch = useDispatch();
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   apiClient.setDispatch(dispatch);
  // }, [dispatch]);

  const handleOpenDialog = () => dispatch(openDialog());

  const handleApiCall = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.post<ApiResponse>(
        `/videos/video-detail/translate-word`,
        {
          youtubeSubtitleId: 'example-subtitle-id',
          languageCode: 'vi',
        },
      );
      setApiResponse(response);
      if (response.code === 403 && response.error === 'Forbidden')
        dispatch(openDialog());
    } catch (error) {
      setApiResponse({
        code: 500,
        success: false,
        data: null,
        error: 'API call failed',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">Pricing Page</h1>
      <div className="flex flex-col items-center space-y-4">
        <div className="flex justify-center space-x-4">
          <Button onClick={handleOpenDialog}>Open Pricing Dialog</Button>
          <Button onClick={handleApiCall} disabled={isLoading}>
            {isLoading ? 'Calling API.. .' : 'Test API Call'}
          </Button>
        </div>
        {apiResponse && (
          <div className="mt-4 p-4 bg-gray-100 rounded-md max-w-md w-full">
            <h2 className="text-xl font-semibold mb-2">API Response:</h2>
            <pre className="whitespace-pre-wrap">
              {JSON.stringify(apiResponse, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
