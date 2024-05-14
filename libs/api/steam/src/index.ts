import { TRPCError } from '@trpc/server';

export class SteamAPI {
  #apiKey: string;
  constructor() {
    const apiKey = process.env['STEAM_API_KEY'];
    if (!apiKey) throw new Error('STEAM_API_KEY is not set');
    this.#apiKey = apiKey;
  }

  async #get<T>(url: string, opts?: RequestInit): Promise<T> {
    console.info(`Steam API GET ${url}`, opts);
    const result = await fetch(url, {
      method: 'GET',
      ...(opts ?? {}),
    });

    if (!result.ok || result.status >= 400) {
      const cause = await result.text();
      console.error(`[${result.status}] Steam API GET failed`, cause);

      if (result.status === 401) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Unauthorized access to Steam API',
          cause,
        });
      }

      if (result.status === 500) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Resource is not available.',
          cause,
        });
      }

      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to access Steam API',
        cause,
      });
    }

    return await result.json();
  }

  async getUser({ accountId }: { accountId: string }) {
    const params = new URLSearchParams({
      key: this.#apiKey,
      steamids: accountId,
    });

    const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?${params}`;

    const result = await this.#get<{
      response: {
        players: Array<{
          steamid: string;
          realname: string;
          personaname: string;
        }>;
      };
    }>(url);

    const players = result.response.players;
    if (!players || players.length < 1) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Steam user not found',
        cause: 'No players returned',
      });
    }

    if (players.length > 1) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Multiple players returned',
        cause: players,
      });
    }

    return players[0];
  }

  async getWishlist({ accountId }: { accountId: string }) {
    if (!accountId) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Missing Steam account ID',
      });
    }

    const url = `https://store.steampowered.com/wishlist/profiles/${accountId}/wishlistdata/?p=0`;

    const result = await this.#get<{
      [appId: string]: { name: string };
    }>(url);

    const appIds = Object.keys(result);
    console.log(`Loaded player wishlist with ${appIds.length} games`, appIds);

    return appIds;
  }

  async hasGameInWishlist({
    accountId,
    appId,
  }: {
    accountId: string;
    appId: string;
  }) {
    if (!accountId) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Missing Steam account ID',
      });
    }

    const url = `https://store.steampowered.com/wishlist/profiles/${accountId}/wishlistdata/?p=0`;

    const result = await this.#get<{
      [appId: string]: { name: string };
    }>(url);

    const appIds = Object.keys(result);
    console.log(`Loaded player wishlist with ${appIds.length} games`, appIds);

    return appIds.includes(appId);
  }
}
