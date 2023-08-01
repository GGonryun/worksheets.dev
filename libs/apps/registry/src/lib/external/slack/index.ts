import { newMethod, newApp } from '@worksheets/apps-core';
import { z } from 'zod';
import { channelSchema } from './schemas';

const listConversations = newMethod({
  appId: 'slack',
  methodId: 'listConversations',
  input: z
    .object({
      cursor: z.string().optional(),
      excludeArchived: z.boolean().optional(),
      limit: z.number().optional(),
      teamId: z.string().optional(),
      types: z.string().optional(),
      userId: z.string().optional(),
    })
    .optional(),
  output: z.object({
    ok: z.boolean(),
    channels: z.array(channelSchema).optional(),
    responseMetadata: z
      .object({
        nextCursor: z.string().optional(),
      })
      .optional(),
    error: z.string().optional(),
  }),
});

const sendChatMessage = newMethod({
  appId: 'slack',
  methodId: 'sendChatMessage',
  input: z.object({
    channel: z.string(),
    text: z.string(),
  }),
  output: z
    .object({
      ok: z.boolean(),
      ts: z.string(),
      channel: z.string(),
      errors: z.array(z.string()),
      message: z
        .object({
          text: z.string(),
          username: z.string(),
        })
        .nonstrict(),
    })
    .deepPartial(),
});

export const slack = newApp({
  appId: 'slack',
  context: z.object({
    botToken: z.string(),
  }),
  methods: {
    listConversations,
    sendChatMessage,
  },
});
