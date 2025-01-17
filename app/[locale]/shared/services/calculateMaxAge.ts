export function calculateMaxAge(refreshTokenExpiresAt: string): number {
  // Convert the expiration time from string to Date object
  const expiresAt = new Date(refreshTokenExpiresAt).getTime();
  const now = Date.now(); // Current time

  // Calculate the remaining time
  const remainingTime = expiresAt - now;

  // If remainingTime is less than or equal to 0, return 0 so the cookie does not exist
  return remainingTime > 0 ? Math.floor(remainingTime / 1000) : 0; // Convert milliseconds to seconds
}
