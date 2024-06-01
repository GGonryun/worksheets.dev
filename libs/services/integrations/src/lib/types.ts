import { Integration, IntegrationProvider } from '@worksheets/prisma';

export type OAuthToken = {
  accessToken: string;
  expiresAt: Date;
  refreshToken: string;
  scopes: string[];
  tokenType: string;
};

export type UserIdentity = { id: string; name: string; email?: string };

export type ProviderConfig = {
  type: 'OAUTH';
  provider: IntegrationProvider;
  name: string;
  clientId: string;
  clientSecret: string;
  scopes: string[];
  authorize: { url: string; params?: Record<string, string> };
  access: { url: string; headers?: Record<string, string> };
  refresh: { url: string; headers?: Record<string, string> };
  pkce?: boolean;
  identify: (opts: {
    accessToken: string;
    clientId: string;
  }) => Promise<UserIdentity>;
  shouldRefresh?: (integration: Integration, error: unknown) => boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parseToken: (json: any) => OAuthToken;
};

export type APIKeyConfig = {
  type: 'API_KEY';
  name: string;
  provider: IntegrationProvider;
  label: string;
  placeholder: string;
  identify: (opts: { apiKey: string }) => Promise<UserIdentity>;
};
