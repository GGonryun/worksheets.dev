import { viewports } from '@worksheets/data/viewports';
import { prisma } from '@worksheets/prisma';
import { getSeedingChanges } from '@worksheets/util/seeding';
import { GameSchema } from '@worksheets/util/types';

export const insertViewports = async () => {
  const pending = Object.values(viewports);

  const stored = await prisma.viewport.findMany({
    select: { id: true },
  });

  const { creating } = getSeedingChanges(pending, stored);

  await prisma.viewport.createMany({
    data: creating.map(convertViewport),
    skipDuplicates: true,
  });

  if (creating.length > 0) {
    console.info('Inserted viewports', {
      created: creating.length,
      updated: 0, // TODO: support updating viewports.
    });
  } else {
    console.info('No changes to viewports');
  }
};
const convertViewport = (viewport: GameSchema['viewport']) => ({
  id: viewport.id,
  type: viewport.type,
  devices: viewport.devices,
  orientations: viewport.orientations,
});
