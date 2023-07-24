import { newMethod, newApp } from '@worksheets/apps-core';
import { z } from 'zod';
import { channelSchema } from './schemas';

const listConversations = newMethod({
  appId: 'slack',
  methodId: 'listConversations',
  label: 'List Conversations',
  description: `Returns a list of all channel-like conversations accessible to the user or app tied to the presented token. This method helps answer questions like: 1) Which conversations am I a member of? 2) Which public channels is my bot user in? 3) Do I have any direct messages open with my friend Suzy? 4) Is my bot a member of any private channels?`,
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

const postChatMessage = newMethod({
  appId: 'slack',
  methodId: 'postChatMessage',
  label: 'Publish a message to a channel',
  description:
    'Sends a message to a specific channel. This does not allow for direct messages to users. This function returns a timestamp of the new message, which also serves as a confirmation that the message was sent.',
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
  logo: 'https://storage.googleapis.com/worksheets-test-app-logos/slack.svg',
  label: 'Slack',
  description:
    "Slack keeps your team's communication organized, efficient, and fun. Slack is where all your people, tools and partners stay connected",
  context: z.object({
    botToken: z.string(),
  }),
  methods: {
    listConversations,
    postChatMessage,
  },
});
