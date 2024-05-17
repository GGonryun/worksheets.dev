import { TRPCError } from '@trpc/server';
import {
  Integration,
  IntegrationError,
  IntegrationStatus,
  Prisma,
  PrismaClient,
  PrismaTransactionalClient,
} from '@worksheets/prisma';
import { apiRoutes, routes } from '@worksheets/routes';
import { randomUUID } from '@worksheets/util/crypto';
import {
  APIKeyIntegrationProvider,
  OAuthIntegrationProvider,
} from '@worksheets/util/integrations';
import { isString } from '@worksheets/util/strings';
import { pick } from 'lodash';

import { API_KEY_CONFIG, OAUTH_CONFIG } from './configs';
import { CODE_CHALLENGE_METHOD, OAUTH_GRANTS } from './data';
import {
  APIKeyConfig,
  OAuthToken,
  ProviderConfig,
  UserIdentity,
} from './types';

const parseIdentity = (identity?: Prisma.JsonValue) => {
  if (!identity) {
    throw new TRPCError({
      code: 'PARSE_ERROR',
      message: 'Identity does not exist',
    });
  }

  if (
    typeof identity === 'object' &&
    'id' in identity &&
    Boolean(identity['id']) &&
    'name' in identity &&
    Boolean(identity['name'])
  ) {
    return identity as UserIdentity;
  } else {
    throw new TRPCError({
      code: 'PARSE_ERROR',
      message: 'Identity does not have required fields',
    });
  }
};

export class OAuthService {
  #db: PrismaClient | PrismaTransactionalClient;
  config: ProviderConfig;

  constructor(
    db: PrismaClient | PrismaTransactionalClient,
    provider: OAuthIntegrationProvider
  ) {
    this.#db = db;

    const config = OAUTH_CONFIG[provider];
    if (!config) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Provider ${provider} is not configured`,
      });
    }
    this.config = config;
  }

  async identity(userId: string) {
    const integration = await this.#db.integration.findFirst({
      where: {
        userId,
        provider: this.config.provider,
        status: IntegrationStatus.AUTHORIZED,
      },
      select: {
        identity: true,
      },
    });
    if (!integration) {
      return null;
    } else {
      return parseIdentity(integration?.identity);
    }
  }

  async revoke(userId: string) {
    console.info(`Revoking ${this.config.name} integration for user`, {
      userId,
    });

    const deleted = await this.#db.integration.deleteMany({
      where: {
        userId,
        provider: this.config.provider,
      },
    });

    console.info(`Revoked ${deleted.count} ${this.config.name} integrations`);
    return deleted.count > 0;
  }

  async useAccessToken<T>(
    userId: string,
    callback: (opts: {
      accessToken: string;
      identity: UserIdentity;
    }) => Promise<T>
  ) {
    const integration = await this.#db.integration.findFirst({
      where: {
        userId,
        provider: this.config.provider,
        status: IntegrationStatus.AUTHORIZED,
      },
    });

    if (!integration) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: `${this.config.name} integration is not connected`,
      });
    }

    if (!integration.accessToken) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: `${this.config.name} integration is not connected`,
      });
    }

    const identity = parseIdentity(integration.identity);

    try {
      return await callback({ accessToken: integration.accessToken, identity });
    } catch (error) {
      if (this.config.shouldRefresh?.(integration, error)) {
        const refreshed = await this.#refresh(integration);
        return await callback({
          accessToken: refreshed.accessToken,
          identity,
        });
      }
      throw error;
    }
  }

  async authorize(userId: string) {
    console.info(`Authorizing ${this.config.name} integration for user`, {
      userId,
    });

    const deleted = await this.#db.integration.deleteMany({
      where: {
        userId,
        provider: this.config.provider,
      },
    });
    console.info(`Deleted ${deleted.count} existing Twitch integrations`);

    const challenge = this.config.pkce ? randomUUID() : undefined;
    const integration = await this.#db.integration.create({
      data: {
        type: this.config.type,
        provider: this.config.provider,
        userId,
        challenge: challenge,
      },
    });

    const params = new URLSearchParams();
    params.append('response_type', 'code');
    params.append('redirect_uri', apiRoutes.oauth.callback.url());
    params.append('client_id', this.config.clientId);
    params.append('scope', this.config.scopes.join(' '));
    params.append('state', integration.id);
    if (challenge) {
      params.append('code_challenge', challenge);
      params.append('code_challenge_method', CODE_CHALLENGE_METHOD.PLAIN);
    }

    return `${this.config.authorize.url}?${params}`;
  }

  async secure(opts: {
    integration: Integration;
    code: string;
    error?: string;
  }) {
    const { integration, code, error } = opts;
    console.info(`Securing ${this.config.name} integration`);

    if (isString(error)) {
      await this.#saveError(integration.id, this.#parseError(error));
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to secure integration. Please try again later.',
        cause: error,
      });
    }

    if (!isString(code)) {
      throw new Error('Code is required');
    }

    try {
      await this.#secure({ integration, code });
      return routes.oauth.success.path();
    } catch (error) {
      console.error(
        'An unexpected error occurred while securing integration',
        error
      );
      await this.#saveError(integration.id, IntegrationError.ACCESS_DENIED);
      return routes.oauth.error.path({
        query: {
          message:
            'Failed to secure integration connection. Close this tab and try again later.',
        },
      });
    }
  }

  async #saveError(state: string, error: IntegrationError) {
    await this.#db.integration.update({
      where: {
        id: state,
      },
      data: {
        status: IntegrationStatus.ERROR,
        error,
      },
    });
  }

  async #secure(opts: { integration: Integration; code: string }) {
    const { integration, code } = opts;
    const body = new URLSearchParams({
      code,
      client_id: this.config.clientId,
      grant_type: OAUTH_GRANTS.AUTHORIZATION,
      redirect_uri: apiRoutes.oauth.callback.url(),
      client_secret: this.config.clientSecret,
    });
    if (integration.challenge) {
      body.append('code_verifier', integration.challenge);
    }

    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    for (const [key, value] of Object.entries(
      this.config.access.headers ?? {}
    )) {
      headers.append(key, value);
    }

    const result = await fetch(this.config.access.url, {
      method: 'POST',
      headers,
      body,
    });

    if (!result.ok || result.status >= 400) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `[${result.status}] Failed to retrieve access token`,
        cause: await result.text(),
      });
    }
    const json = await result.json();
    const tokens = this.config.parseToken(json);
    const identity = await this.config.identify({
      accessToken: tokens.accessToken,
      clientId: this.config.clientId,
    });
    await this.#save(integration.id, tokens, identity);
  }

  async #refresh(integration: Integration) {
    console.info(`Refreshing Twitch integration`, {
      integration: pick(integration, ['id', 'provider', 'expiresAt']),
    });

    if (integration.status !== 'AUTHORIZED') {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: `Integration is not authorized`,
      });
    }

    if (integration.refreshToken == null) {
      throw new TRPCError({
        code: 'PRECONDITION_FAILED',
        message: `Integration does not have a refresh token`,
      });
    }
    const body = new URLSearchParams({
      grant_type: OAUTH_GRANTS.REFRESH,
      refresh_token: integration.refreshToken,
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
    });

    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    for (const [key, value] of Object.entries(
      this.config.refresh.headers ?? {}
    )) {
      headers.append(key, value);
    }

    const result = await fetch(this.config.refresh.url, {
      method: 'POST',
      headers,
      body,
    });

    if (!result.ok || result.status >= 400) {
      const text = await result.text();
      console.error('Failed to refresh token', text);
      await this.#db.integration.update({
        where: {
          id: integration.id,
        },
        data: {
          status: IntegrationStatus.ERROR,
          error: IntegrationError.INVALID_REFRESH_TOKEN,
        },
      });
      throw new Error('Failed to refresh token');
    }

    return await this.#save(
      integration.id,
      this.config.parseToken(await result.json())
    );
  }

  async #save(
    id: string,
    tokens: OAuthToken,
    identity?: Prisma.InputJsonValue
  ) {
    await this.#db.integration.update({
      where: {
        id,
      },
      data: {
        accessToken: tokens.accessToken,
        expiresAt: tokens.expiresAt,
        refreshToken: tokens.refreshToken,
        scopes: tokens.scopes,
        tokenType: tokens.tokenType,
        status: IntegrationStatus.AUTHORIZED,
        authorizedAt: new Date(),
        identity,
      },
    });

    return tokens;
  }

  #parseError(error: string) {
    switch (error) {
      case 'unauthorized_client':
        return IntegrationError.UNAUTHORIZED_CLIENT;
      case 'unsupported_response_type':
        return IntegrationError.UNSUPPORTED_RESPONSE_TYPE;
      case 'invalid_scope':
        return IntegrationError.INVALID_SCOPE;
      case 'server_error':
        return IntegrationError.SERVER_ERROR;
      case 'temporarily_unavailable':
        return IntegrationError.TEMPORARILY_UNAVAILABLE;
      case 'invalid_request':
        return IntegrationError.INVALID_REQUEST;
      case 'access_denied':
        return IntegrationError.ACCESS_DENIED;
      case 'redirect_mismatch':
        return IntegrationError.REDIRECT_MISMATCH;
      default:
        return IntegrationError.UNKNOWN;
    }
  }
}

export class APIKeyService {
  #db: PrismaClient | PrismaTransactionalClient;
  config: APIKeyConfig;

  constructor(
    db: PrismaClient | PrismaTransactionalClient,
    provider: APIKeyIntegrationProvider
  ) {
    this.#db = db;

    const config = API_KEY_CONFIG[provider];
    if (!config) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Provider ${provider} is not configured`,
      });
    }
    this.config = config;
  }

  async identity(userId: string) {
    const integration = await this.#db.integration.findFirst({
      where: {
        userId,
        provider: this.config.provider,
        status: IntegrationStatus.AUTHORIZED,
      },
      select: {
        identity: true,
      },
    });
    if (!integration) {
      return null;
    } else {
      return parseIdentity(integration?.identity);
    }
  }

  async revoke(userId: string) {
    console.info(`Revoking ${this.config.name} integration for user`, {
      userId,
    });

    const deleted = await this.#db.integration.deleteMany({
      where: {
        userId,
        provider: this.config.provider,
      },
    });

    console.info(`Revoked ${deleted.count} ${this.config.name} integrations`);
    return deleted.count > 0;
  }

  // acts like an upsert which allows invalid api keys to be replaced with 1 step.
  async authorize(userId: string) {
    await this.revoke(userId);

    const integration = await this.#db.integration.create({
      data: {
        type: this.config.type,
        provider: this.config.provider,
        status: IntegrationStatus.PENDING,
        userId,
      },
    });

    return routes.connect.url({
      params: { providerId: this.config.provider },
      query: { state: integration.id },
    });
  }

  async secure(integration: Integration, apiKey: string) {
    console.info(`Securing ${this.config.name} integration for user`, {
      integrationId: integration.id,
    });

    if (integration.status === IntegrationStatus.AUTHORIZED) {
      throw new TRPCError({
        code: 'PRECONDITION_FAILED',
        message: 'Integration is already authorized',
      });
    }

    const identity = await this.config.identify({ apiKey });
    if (!identity) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Invalid API Key',
      });
    }

    const updated = await this.#db.integration.update({
      where: {
        id: integration.id,
      },
      data: {
        status: IntegrationStatus.AUTHORIZED,
        identity: parseIdentity(identity),
        accessToken: apiKey,
        authorizedAt: new Date(),
        tokenType: 'account_id',
      },
    });

    return updated;
  }

  async useApiKey<T>(
    userId: string,
    callback: (opts: { apiKey: string; identity: UserIdentity }) => Promise<T>
  ) {
    const integration = await this.#db.integration.findFirst({
      where: {
        userId,
        provider: this.config.provider,
        status: IntegrationStatus.AUTHORIZED,
      },
    });

    if (!integration) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: `${this.config.name} integration is not connected`,
      });
    }

    if (!integration.accessToken) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: `${this.config.name} integration is not connected`,
      });
    }

    const identity = parseIdentity(integration.identity);

    return callback({ apiKey: integration.accessToken, identity });
  }
}
