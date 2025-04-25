import { Prisma } from '@worksheets/prisma';
import { socialLinksSchema } from '@worksheets/util/types';

export const parseTeam = (
  team: Prisma.TeamGetPayload<{
    include: {
      members: true;
      games: true;
    };
  }>
) => ({
  id: team.id,
  slug: team.slug,
  name: team.name,
  members: team.members.length,
  description: team.description,
  games: team.games.length,
  logo: team.logo,
  links: socialLinksSchema.parse(team.links),
});
