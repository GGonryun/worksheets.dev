import { Mob, MOBS } from '@worksheets/data/mobs';
import { prisma } from '@worksheets/prisma';
import { getSeedingChanges, seedingProperties } from '@worksheets/util/seeding';

export const insertMobs = async () => {
  const stored = await prisma.mob.findMany({
    select: seedingProperties,
  });

  const { updating, creating } = getSeedingChanges(MOBS, stored);

  for (const create of creating) {
    await createMob(create);
  }

  for (const update of updating) {
    await updateMob(update);
  }

  if (creating.length === 0 && updating.length === 0) {
    console.info(`No changes to mobs`);
  } else {
    console.info(`Inserted mobs`, {
      created: creating.length,
      updated: updating.length,
    });
  }
};

const createMob = async (mob: Mob) => {
  await prisma.mob.create({
    data: convertMob(mob),
  });

  await prisma.loot.createMany({
    data: mob.loot.map((loot) => ({
      mobId: mob.id,
      ...loot,
    })),
    skipDuplicates: true,
  });
};

const updateMob = async (mob: Mob) => {
  await prisma.mob.update({
    where: {
      id: mob.id,
    },
    data: convertMob(mob),
  });
};

const convertMob = (mob: Mob) => {
  return {
    id: mob.id,
    version: mob.version,
    name: mob.name,
    imageUrl: mob.imageUrl,
    type: mob.type,
    description: mob.description,
    maxHp: mob.maxHp,
    level: mob.level,
    race: mob.race,
    element: mob.element,
    size: mob.size,
    attack: mob.attack,
    defense: mob.defense,
    baseExp: mob.baseExp,
    mvpExp: mob.mvpExp,
  };
};
