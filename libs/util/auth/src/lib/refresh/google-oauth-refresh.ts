import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from '@worksheets/services/environment';
import { JWT } from 'next-auth/jwt';

const hasExpired = (expiresAt?: number) => {
  // If no expiration time is set, assume it never expires
  if (!expiresAt) return false;
  return Date.now() >= expiresAt;
};

export async function googleRefreshAccessToken(token: JWT): Promise<JWT> {
  if (!token.refreshToken) {
    return token;
  }

  // Return previous token if the access token has not expired yet
  if (!hasExpired(token.expiresAt)) {
    console.info('Token has not expired yet');
    return token;
  }

  console.info('Refreshing expired token');
  try {
    const url =
      'https://oauth2.googleapis.com/token?' +
      new URLSearchParams({
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken,
      });

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      // jwt tokens return the expiration time in seconds initially
      // https://stackoverflow.com/questions/39926104/what-format-is-the-exp-expiration-time-claim-in-a-jwt#comment102247100_39926886
      expiresAt: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    throw new Error('Failed to refresh Google access token');
  }
}
