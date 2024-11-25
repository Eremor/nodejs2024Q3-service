export interface AuthPayload {
  userId: string;
  login: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}