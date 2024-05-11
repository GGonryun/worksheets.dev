import { QUESTS, SeedableQuest } from '@worksheets/data/quests';
import { prisma } from '@worksheets/prisma';
import { getSeedingChanges, seedingProperties } from '@worksheets/util/seeding';

export const insertQuests = async () => {
  const stored = await prisma.questDefinition.findMany({
    select: seedingProperties,
  });

  const { updating, creating } = getSeedingChanges(QUESTS, stored);

  for (const create of creating) {
    await createQuest(create);
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

const createQuest = async (quest: SeedableQuest) => {
  await prisma.questDefinition.create({
    data: convertQuest(quest),
  });

  await prisma.loot.createMany({
    data: quest.loot.map((loot) => ({
      questDefinitionId: quest.id,
      ...loot,
    })),
    skipDuplicates: true,
  });
};

const updateQuest = async (quest: SeedableQuest) => {
  await prisma.questDefinition.update({
    where: {
      id: quest.id,
    },
    data: convertQuest(quest),
  });

  // remove any loot that no longer exists
  await prisma.loot.deleteMany({
    where: {
      questDefinitionId: quest.id,
      NOT: {
        itemId: {
          in: quest.loot.map((l) => l.itemId),
        },
      },
    },
  });
  // upsert the rest
  for (const loot of quest.loot) {
    const exists = await prisma.loot.findFirst({
      where: {
        questDefinitionId: quest.id,
        itemId: loot.itemId,
      },
    });
    if (exists) {
      await prisma.loot.update({
        where: {
          id: exists.id,
        },
        data: {
          ...loot,
        },
      });
    } else {
      await prisma.loot.create({
        data: {
          questDefinitionId: quest.id,
          ...loot,
        },
      });
    }
  }
};

const convertQuest = (quest: SeedableQuest) => {
  return {
    id: quest.id,
    version: quest.version,
    order: quest.order,
    name: quest.name,
    description: quest.description,
    type: quest.type,
    category: quest.category,
    frequency: quest.frequency,
    data: quest.data,
  };
};
