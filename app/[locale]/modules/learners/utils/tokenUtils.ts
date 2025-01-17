// import { useDeviceUUID } from '@/app/[locale]/shared/hook';
// import { AppDispatch } from '@/modules/learners/store';
// import { clearLoginResponse, setLoginResponse } from '@/modules/learners/store/slice';

// // Function to check and refresh token
// export const checkAndRefreshToken = async (dispatch: AppDispatch) => {
//   // Get token information from state or cookies/localStorage
//   const tokenData = getTokenFromStateOrStorage(); // Replace with your method of getting the token
//   const deviceUUID = useDeviceUUID();
//   if (tokenData) {
//     const tokenExpiresAt = tokenData.accessTokenExpiresAt;

//     if (new Date() >= new Date(tokenExpiresAt)) {
//       try {
//         // Refresh token
//         const newTokenData = await refreshAccessToken(tokenData.refreshToken, deviceUUID);
//         dispatch(setLoginResponse(newTokenData));
//       } catch (error) {
//         console.error('Token refresh failed:', error);
//         dispatch(clearLoginResponse());
//       }
//     }
//   }
// };

// // Function to get token from state or cookies/localStorage
// const getTokenFromStateOrStorage = () => {
//   // Replace with your method of getting the token
//   return {
//     accessTokenExpiresAt: '2024-09-08T17:00:49.819866Z',
//     refreshToken: 'your-refresh-token',
//   };
// };

// // Function to call API to refresh token
// const refreshAccessToken = async (refreshToken: string, deviceUUID: string) => {
//   const response = await fetch('/api/refresh-token', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ refreshToken, deviceUUID }),
//   });

//   if (!response.ok) {
//     throw new Error('Token refresh failed');
//   }

//   return response.json();
// };
