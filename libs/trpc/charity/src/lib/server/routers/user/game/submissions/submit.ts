import { sendDiscordMessage } from '@worksheets/services/discord';
import {
  DISCORD_WEBHOOK_URL,
  IS_PRODUCTION,
} from '@worksheets/services/environment';
import { routes } from '@worksheets/ui/routes';
import { gameSubmissionFormSchema } from '@worksheets/util/types';
import { makeOptionalPropsNullable } from '@worksheets/zod';
import { z } from 'zod';

import { protectedProcedure } from '../../../../procedures';

export default protectedProcedure
  .input(
    z
      .object({
        id: z.string(),
      })
      .extend(
        makeOptionalPropsNullable(gameSubmissionFormSchema.partial()).shape
      )
  )
  .output(
    z.object({
      okay: z.boolean(),
    })
  )
  .mutation(async ({ input, ctx: { user, db } }) => {
    const userId = user.id;
    console.info('Submitting game submission', {
      id: input.id,
      userId,
    });

    await db.gameSubmission.update({
      where: {
        id: input.id,
        userId,
      },
      data: {
        slug: input.slug,
        title: input.title,
        headline: input.headline,
        projectType: input.projectType,
        externalWebsiteUrl: input.externalWebsiteUrl,
        viewport: input.viewport,
        viewportWidth: input.viewportWidth,
        viewportHeight: input.viewportHeight,
        devices: input.devices ?? [],
        orientations: input.orientations ?? [],
        description: input.description,
        instructions: input.instructions,
        categories: input.categories ?? [],
        status: 'PENDING',
        markets: JSON.stringify(input.markets ?? {}),
      },
    });

    try {
      if (IS_PRODUCTION) {
        await sendDiscordMessage({
          content: `A new game submission has been created by ${userId}.`,
          embeds: [
            {
              title: input.title ?? 'Untitled',
              url: routes.admin.submission.path({
                params: {
                  submissionId: input.id,
                },
              }),
            },
          ],
          webhookUrl: DISCORD_WEBHOOK_URL,
        });
      } else {
        console.log('Would have sent discord message');
      }
    } catch (error) {
      console.warn('Failed to send discord message', error);
    }

    return {
      okay: true,
    };
  });
