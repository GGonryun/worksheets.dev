import { TRPCError } from '@trpc/server';
import { PrismaClient, PrismaTransactionalClient } from '@worksheets/prisma';
import { MAX_BEST_FRIENDS, MAX_FRIENDS } from '@worksheets/util/types';

export class FriendshipService {
  #db: PrismaClient | PrismaTransactionalClient;
  constructor(db: PrismaClient | PrismaTransactionalClient) {
    this.#db = db;
  }

  async find(userId: string, code: string) {
    const profile = await this.#db.referralCode.findFirst({
      where: {
        code,
      },
      select: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    if (!profile) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'A user with that friend code does not exist.',
      });
    }

    if (userId === profile?.user.id) {
      throw new TRPCError({
        code: 'PRECONDITION_FAILED',
        message: 'Cannot add yourself as a friend.',
      });
    }

    return profile.user.username;
  }

  async remove(userId: string, friendshipId: string) {
    const friendship = await this.#db.friendship.findFirst({
      where: {
        id: friendshipId,
        userId, // makes sure the user owns the friendship.
      },
    });

    if (!friendship) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Could not find a friendship between users.',
      });
    }

    if (friendship.isFavorite) {
      throw new TRPCError({
        code: 'PRECONDITION_FAILED',
        message: 'Cannot remove a best friend.',
      });
    }

    await this.#db.friendship.delete({
      where: {
        id: friendship.id,
      },
    });
  }

  async favorite(userId: string, friendshipId: string) {
    const friend = await this.#db.friendship.findFirst({
      where: {
        id: friendshipId,
        userId,
      },
    });

    if (!friend) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'A friendship does not exist. Add them as a friend first.',
      });
    }

    // find all best friends.
    const bestFriends = await this.#db.friendship.count({
      where: {
        userId,
        isFavorite: true,
      },
    });

    const newState = !friend.isFavorite;
    // throw err if you're trying to favorite a friend and you already have the max number of best friends.
    if (newState && bestFriends >= MAX_BEST_FRIENDS) {
      throw new TRPCError({
        code: 'PRECONDITION_FAILED',
        message: `You can only have ${MAX_BEST_FRIENDS} best friends.`,
      });
    }

    await this.#db.friendship.update({
      where: {
        id: friendshipId,
      },
      data: {
        isFavorite: newState,
      },
    });

    return newState;
  }

  async link(userId: string, friendId: string) {
    const friend = await this.#db.friendship.findFirst({
      where: {
        userId,
        friendId,
      },
    });

    const follower = await this.#db.friendship.findFirst({
      where: {
        userId: friendId,
        friendId: userId,
      },
    });

    if (friend || follower) {
      throw new TRPCError({
        code: 'PRECONDITION_FAILED',
        message: 'You are already linked with this user.',
      });
    }

    await this.#db.friendship.create({
      data: {
        userId,
        friendId,
      },
    });

    await this.#db.friendship.create({
      data: {
        userId: friendId,
        friendId: userId,
      },
    });
  }

  async parseFriendCode(code: string) {
    const profile = await this.#db.referralCode.findFirst({
      where: {
        code,
      },
      select: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    if (!profile) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'A user with that friend code does not exist.',
      });
    }

    return profile;
  }

  async follow(userId: string, friendId: string) {
    const friend = await this.#db.friendship.findFirst({
      where: {
        userId,
        friendId,
      },
    });

    if (friend) {
      throw new TRPCError({
        code: 'PRECONDITION_FAILED',
        message: 'You are already friends with this user.',
      });
    }

    const friends = await this.#db.friendship.count({
      where: {
        userId,
      },
    });

    if (friends >= MAX_FRIENDS) {
      throw new TRPCError({
        code: 'PRECONDITION_FAILED',
        message: `You can only have ${MAX_FRIENDS} friends.`,
      });
    }

    await this.#db.friendship.create({
      data: {
        userId,
        friendId,
      },
    });
  }

  async get(friendshipId: string) {
    const friendship = await this.#db.friendship.findFirst({
      where: {
        id: friendshipId,
      },
      select: {
        id: true,
        userId: true,
        friendId: true,
      },
    });

    if (!friendship) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Could not find a friendship between users.',
      });
    }

    return friendship;
  }
}
