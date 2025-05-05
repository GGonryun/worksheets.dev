import { SeedableTeam, teams } from '@worksheets/data/teams';
import { prisma } from '@worksheets/prisma';
import { getSeedingChanges, seedingProperties } from '@worksheets/util/seeding';

export const insertTeams = async () => {
  const pendingTeam = Object.values(teams);

  const storedTeams = await prisma.team.findMany({
    select: seedingProperties,
  });

  const { creating, updating } = getSeedingChanges(pendingTeam, storedTeams);

  await prisma.team.createMany({
    data: creating.map(convertTeam),
    skipDuplicates: true,
  });

  for (const update of updating) {
    await prisma.team.update({
      where: { id: update.id },
      data: convertTeam(update),
    });
  }

  if (creating.length > 0 || updating.length > 0) {
    console.info(`Inserted teams`, {
      created: creating.length,
      updated: updating.length,
    });
  } else {
    console.info(`No changes to teams`);
  }
};

const convertTeam = (team: SeedableTeam) => ({
  id: team.id,
  name: team.name,
  logo: team.logo,
  description: team.description,
  links: team.links,
});
