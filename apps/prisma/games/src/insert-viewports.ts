import { viewports } from '@worksheets/data/viewports';
import { prisma } from '@worksheets/prisma';
import { getSeedingChanges, seedingProperties } from '@worksheets/util/seeding';
import { GameSchema } from '@worksheets/util/types';

export const insertViewports = async () => {
  const pending = Object.values(viewports);

  const changes = await prisma.$transaction(async (tx) => {
    const stored = await tx.viewport.findMany({
      select: seedingProperties,
    });

    const { creating } = getSeedingChanges(pending, stored);

    await prisma.viewport.createMany({
      data: creating.map(convertViewport),
      skipDuplicates: true,
    });

    return {
      pending: pending.length,
      stored: stored.length,
      created: creating.length,
      updated: 0, // TODO: support updating viewports.
    };
  });

  console.info('Inserted viewports', changes);
};
const convertViewport = (viewport: GameSchema['viewport']) => ({
  id: viewport.id,
  type: viewport.type,
  devices: viewport.devices,
  orientations: viewport.orientations,
});
