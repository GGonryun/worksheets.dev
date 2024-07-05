import { TRPCError } from '@trpc/server';
import { request } from '@worksheets/api/fetch';

export class SteamAPI {
  #apiKey: string;
  #maxWishlistPages = 50;
  constructor() {
    const apiKey = process.env['STEAM_API_KEY'];
    if (!apiKey) throw new Error('STEAM_API_KEY is not set');
    this.#apiKey = apiKey;
  }

  async getUser({ accountId }: { accountId: string }) {
    const params = new URLSearchParams({
      key: this.#apiKey,
      steamids: accountId,
    });

    const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?${params}`;

    const result = await request<{
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

  async getWishlist({ accountId }: { accountId: string; all?: boolean }) {
    if (!accountId) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Missing Steam account ID',
      });
    }

    const appIds: string[] = [];
    let page = 0;
    while (page < this.#maxWishlistPages) {
      const url = `https://store.steampowered.com/wishlist/profiles/${accountId}/wishlistdata/?p=${page}`;

      const result = await request<{
        [appId: string]: { name: string };
      }>(url);

      const keys = Object.keys(result);
      console.info(
        `Loaded player wishlist page ${page} with ${keys.length} games`
      );

      appIds.push(...keys);
      page++;

      // the max number of games in a wishlist page is 100, but sometimes user's have less than that per page
      // if we 0 keys in the request then we can stop asking for more pages
      if (!keys.length) {
        break;
      }
    }

    if (page >= this.#maxWishlistPages) {
      console.warn('User has too many games in wishlist.', {
        page,
        numApps: appIds.length,
      });
    }

    console.info(`Loaded player wishlist with ${appIds.length} games`, appIds);

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

    console.info(
      `[SteamAPI] Checking if game ${appId} is in wishlist for ${accountId}`
    );

    const appIds = await this.getWishlist({ accountId });

    return appIds.includes(appId);
  }
}
