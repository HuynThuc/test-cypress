import { useEffect, useState } from 'react';

import { apiClient } from '@/shared/api';

export function useDeviceUUID(): string {
  const [deviceUUID, setDeviceUUID] = useState<string>('');

  useEffect(() => {
    // Create an async function to handle the API call
    const fetchDeviceUUID = async () => {
      try {
        // Get UUID from the server
        const response = await apiClient.get<{ deviceId: string }>(
          '/auth/device-id',
        );
        // If UUID does not exist, generate a new one and save it
        if (!response?.deviceId) {
          const newUUID = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
            /[xy]/g,
            function (c) {
              const r = (Math.random() * 16) | 0,
                v = c == 'x' ? r : (r & 0x3) | 0x8;
              return v.toString(16);
            },
          );

          // Save the new UUID to the server
          await apiClient.post('/auth/device-id', { deviceId: newUUID });
          // Update the state with the new UUID
          setDeviceUUID(newUUID);
        } else setDeviceUUID(response.deviceId); // If UUID exists, update the state with it
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching device UUID:', error);
      }
    };

    fetchDeviceUUID(); // Call the async function
  }, []);

  return deviceUUID;
}
