import { QUESTS } from '@worksheets/data/quests';
import { Prisma, prisma } from '@worksheets/prisma';
import { getSeedingChanges, seedingProperties } from '@worksheets/util/seeding';

export const insertQuests = async () => {
  const stored = await prisma.platformQuest.findMany({
    select: seedingProperties,
  });

  const { updating, creating } = getSeedingChanges(QUESTS, stored);

  for (const data of creating) {
    await prisma.platformQuest.create({
      data,
    });
  }

  for (const update of updating) {
    await updateQuest(update);
  }

  if (creating.length === 0 && updating.length === 0) {
    console.info(`No changes to quests`);
  } else {
    console.info(`Inserted quests`, {
      created: creating.length,
      updated: updating.length,
    });
  }
};

const updateQuest = async (quest: Prisma.PlatformQuestUncheckedCreateInput) => {
  // delete all loot for this quest before updating
  await prisma.loot.deleteMany({
    where: {
      questId: quest.id,
    },
  });

  await prisma.platformQuest.update({
    where: {
      id: quest.id,
    },
    data: quest,
  });
};
