import { TRPCError } from '@trpc/server';
import { Prisma, PrismaClient } from '@worksheets/prisma';

/**
 * Temporary local in-memory cache for item data
 * Use this if you're writing a function that needs to fetch item data multiple times
 */
export const itemCache = (db: PrismaClient) => {
  const items: Record<string, Prisma.ItemGetPayload<true>> = {};

  const get = async (itemId: string) => {
    if (items[itemId]) {
      return items[itemId];
    }
    const item = await db.item.findUnique({
      where: { id: itemId },
    });

    if (!item) {
      throw new Error(`Item not found: ${itemId}`);
    }

    items[itemId] = item;

    return item;
  };

  const safeGet = async (itemId: string) => {
    try {
      return await get(itemId);
    } catch (error) {
      return null;
    }
  };

  return { get, safeGet };
};

/**
 * Temporary local in-memory cache for game data
 * Use this if you're writing a function that needs to fetch game data multiple times
 */
export const gameCache = (db: PrismaClient) => {
  const games: Record<string, Prisma.GameGetPayload<true>> = {};

  const get = async (gameId: string) => {
    if (games[gameId]) {
      return games[gameId];
    }
    const game = await db.game.findUnique({
      where: { id: gameId },
    });

    if (!game) {
      throw new Error(`Game not found: ${gameId}`);
    }

    games[gameId] = game;
    return game;
  };

  const safeGet = async (gameId: string) => {
    try {
      return await get(gameId);
    } catch (error) {
      return null;
    }
  };

  return { get, safeGet };
};

/**
 * A temporary local in-memory cache for user data
 * If the user is not found in the cache, it will be fetched from the database
 */
export const userCache = (db: PrismaClient) => {
  const users: Record<string, Prisma.UserGetPayload<true>> = {};

  const get = async (userId: string) => {
    if (users[userId]) {
      return users[userId];
    }
    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (!user)
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'User not found',
        cause: { userId },
      });

    if (user) {
      users[userId] = user;
    }
    return user;
  };

  const safeGet = async (userId: string) => {
    try {
      return await get(userId);
    } catch (error) {
      return null;
    }
  };
  return { get, safeGet };
};
