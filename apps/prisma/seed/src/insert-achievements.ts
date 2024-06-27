import { games } from '@worksheets/data/games';
import { prisma } from '@worksheets/prisma';
import { getSeedingChanges, seedingProperties } from '@worksheets/util/seeding';
import { SeedableGameAchievementSchema } from '@worksheets/util/types';

export const insertAchievements = async () => {
  const storedAchievements = await prisma.gameAchievement.findMany({
    select: seedingProperties,
  });

  const achievements = games.flatMap((g) => g.achievements);

  const { creating, updating } = getSeedingChanges(
    achievements,
    storedAchievements
  );

  for (const create of creating) {
    await insertAchievement(create);
  }
  for (const update of updating) {
    await updateAchievement(update);
  }

  if (creating.length > 0 || updating.length > 0) {
    console.info(`Inserted achievements`, {
      created: creating.length,
      updated: updating.length,
    });
  } else {
    console.info(`No changes to achievements`);
  }
};

const insertAchievement = async (
  achievement: SeedableGameAchievementSchema
) => {
  await prisma.$transaction(async (tx) => {
    await tx.gameAchievement.create({
      data: {
        version: achievement.version,
        id: achievement.id,
        name: achievement.name,
        description: achievement.description,
        iconUrl: achievement.iconUrl,
        secret: achievement.secret,
        game: {
          connect: {
            id: achievement.gameId,
          },
        },
      },
    });

    await tx.loot.createMany({
      data: achievement.loot.map((loot) => ({
        achievementId: achievement.id,
        itemId: loot.itemId,
        quantity: loot.quantity,
        chance: loot.chance,
      })),
    });
  });
};

const updateAchievement = async (
  achievement: SeedableGameAchievementSchema
) => {
  await prisma.$transaction(async (tx) => {
    await tx.gameAchievement.update({
      where: {
        id: achievement.id,
      },
      data: {
        version: achievement.version,
        name: achievement.name,
        description: achievement.description,
        iconUrl: achievement.iconUrl,
      },
    });

    await tx.loot.deleteMany({
      where: {
        achievementId: achievement.id,
      },
    });

    await tx.loot.createMany({
      data: achievement.loot.map((loot) => ({
        achievementId: achievement.id,
        itemId: loot.itemId,
        quantity: loot.quantity,
        chance: loot.chance,
      })),
    });
  });
};
