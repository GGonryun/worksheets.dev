import { TASKS } from '@worksheets/data/tasks';
import { prisma } from '@worksheets/prisma';
import { getSeedingChanges, seedingProperties } from '@worksheets/util/seeding';

export const insertTasks = async () => {
  const stored = await prisma.task.findMany({
    select: seedingProperties,
  });

  const { updating, creating } = getSeedingChanges(TASKS, stored);

  for (const create of creating) {
    await prisma.task.create({
      data: create,
    });
  }

  for (const update of updating) {
    await prisma.task.update({
      where: {
        id: update.id,
      },
      data: update,
    });
  }

  if (creating.length === 0 && updating.length === 0) {
    console.info(`No changes to tasks`);
  } else {
    console.info(`Inserted tasks`, {
      created: creating.length,
      updated: updating.length,
    });
  }
};
