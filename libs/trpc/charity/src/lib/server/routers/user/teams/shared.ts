import { Prisma } from '@worksheets/prisma';
import { z } from 'zod';

export const socialLinks = z.object({
  twitter: z.string().optional(),
  facebook: z.string().optional(),
  itchio: z.string().optional(),
  instagram: z.string().optional(),
  discord: z.string().optional(),
});

export const createTeamSchema = z.object({
  name: z.string(),
  description: z.string(),
  links: socialLinks,
});

export const teamSchema = createTeamSchema.extend({
  id: z.string(),
  slug: z.string(),
  logo: z.string(),
  members: z.number(),
  games: z.number(),
  links: socialLinks,
});

export const parseTeam = (
  team: Prisma.TeamGetPayload<{
    include: {
      logo: true;
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
  logo: team.logo?.url ?? '/logos/charity-games-square.png',
  links: socialLinks.parse(team.links),
});
