import { z } from 'zod';

export const channelSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    isChannel: z.boolean(),
    isGroup: z.boolean(),
    isIm: z.boolean(),
    created: z.number(),
    creator: z.string(),
    isArchived: z.boolean(),
    isGeneral: z.boolean(),
    unlinked: z.number(),
    nameNormalized: z.string(),
    isShared: z.boolean(),
    isExtShared: z.boolean(),
    isOrgShared: z.boolean(),
    pendingShared: z.array(z.unknown()),
    isPendingExtShared: z.boolean(),
    isPrivate: z.boolean(),
    isMpim: z.boolean(),
    topic: z.object({
      value: z.string(),
      creator: z.string(),
      lastSet: z.number(),
    }),
    purpose: z.object({
      value: z.string(),
      creator: z.string(),
      lastSet: z.number(),
    }),
    previousNames: z.array(z.string()),
  })
  .deepPartial();
