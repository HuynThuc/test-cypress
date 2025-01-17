export interface UserInfo {
  id: string;
  fullname: string;
  email: string;
  photoUrl: string;
  locale: string;
  isFirstLogin: boolean;
  audienceType: string;
}

export interface AuthorizationInfo {
  accessToken: string;
  accessTokenExpiresAt: string;
  refreshToken: string;
  refreshTokenExpiresAt: string;
}
