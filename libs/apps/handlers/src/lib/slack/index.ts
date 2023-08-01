import { ApplicationExecutors } from '../framework';
import { WebClient } from '@slack/web-api';

export const slack: ApplicationExecutors<'slack'> = {
  async listConversations({ context: { botToken }, input }) {
    const client = new WebClient(botToken);
    const response = await client.conversations.list({
      cursor: input?.cursor,
      exclude_archived: input?.excludeArchived,
      limit: input?.limit,
      types: input?.types,
      team_id: input?.teamId,
      user_id: input?.userId,
    });

    return {
      ok: response.ok,
      channels: response.channels?.map((channel) => ({
        id: channel.id,
        name: channel.name,
        isChannel: channel.is_channel,
        isGroup: channel.is_group,
        isIm: channel.is_im,
        created: channel.created,
        creator: channel.creator,
        isArchived: channel.is_archived,
        isGeneral: channel.is_general,
        unlinked: channel.unlinked,
        nameNormalized: channel.name_normalized,
        isShared: channel.is_shared,
        isExtShared: channel.is_ext_shared,
        isOrgShared: channel.is_org_shared,
        pendingShared: channel.pending_shared,
        isPendingExtShared: channel.is_pending_ext_shared,
        isPrivate: channel.is_private,
        isMpim: channel.is_mpim,
        topic: {
          value: channel.topic?.value,
          creator: channel.topic?.creator,
          lastSet: channel.topic?.last_set,
        },
        purpose: {
          value: channel.purpose?.value,
          creator: channel.purpose?.creator,
          lastSet: channel.purpose?.last_set,
        },
        previousNames: channel.previous_names,
      })),
      responseMetadata: {
        nextCursor: response.response_metadata?.next_cursor,
      },
      error: response.error,
    };
  },

  async sendChatMessage({ context: { botToken }, input: { channel, text } }) {
    const client = new WebClient(botToken);

    const result = await client.chat.postMessage({
      token: botToken,
      channel: channel,
      text: text,
      // TODO: add support for a blocks[] array to send richer content
    });

    return {
      ok: result.ok,
      ts: result.ts,
      channel: result.channel,
      message: {
        text: result.message?.text,
        username: result.message?.username,
      },
      errors: result.errors,
    };
  },
};
