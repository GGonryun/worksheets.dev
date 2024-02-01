import { DeveloperSchema } from '@worksheets/util/types';
import { z } from 'zod';

import { publicProcedure } from '../../procedures';

export default publicProcedure
  .output(z.custom<DeveloperSchema[]>())
  .query(async ({ ctx: { db } }) => {
    const developers = await db.developer.findMany({
      select: {
        id: true,
        name: true,
        logoUrl: true,
        description: true,
        links: true,
      },
    });

    return developers.map((d) => ({
      id: d.id,
      name: d.name,
      description: d.description,
      avatarUrl: d.logoUrl,
      socials: JSON.parse(d.links ?? '{}') as DeveloperSchema['socials'],
    }));
  });
