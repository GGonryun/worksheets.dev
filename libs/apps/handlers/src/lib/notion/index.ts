import { TRPCError } from '@trpc/server';
import { ApplicationExecutors } from '../framework';
import { Client } from '@notionhq/client';

export const notion: ApplicationExecutors<'notion'> = {
  async listUsers({ context: { apiKey }, input }) {
    const notion = new Client({ auth: apiKey });

    const response = await notion.users.list({
      start_cursor: input?.startCursor,
      page_size: input?.pageSize,
    });

    return {
      nextCursor: response.next_cursor ?? undefined,
      hasMore: response.has_more ?? undefined,
      results: response.results.map((user) => {
        if (user.type === 'person') {
          return {
            object: 'user',
            type: 'person',
            id: user.id,
            person: { email: user.person?.email ?? undefined },
            name: user.name ?? undefined,
            avatarUrl: user.avatar_url ?? undefined,
          };
        } else {
          return {
            object: 'user',
            type: 'bot',
            id: user.id,
            name: user.name ?? undefined,
            avatarUrl: user.avatar_url ?? undefined,
          };
        }
      }),
    };
  },

  async getUser({ context: { apiKey }, input: { userId } }) {
    const notion = new Client({ auth: apiKey });

    const response = await notion.users.retrieve({ user_id: userId });

    if (response.type === 'bot') {
      return {
        object: 'user',
        type: 'bot',
        id: response.id,
        name: response.name ?? undefined,
        avatarUrl: response.avatar_url ?? undefined,
      };
    } else {
      return {
        object: 'user',
        type: 'person',
        id: response.id,
        person: { email: response.person.email ?? undefined },
        name: response.name ?? undefined,
        avatarUrl: response.avatar_url ?? undefined,
      };
    }
  },

  async getBot({ context: { apiKey } }) {
    const notion = new Client({ auth: apiKey });

    const response = await notion.users.me({});

    return {
      object: 'user',
      type: 'bot',
      id: response.id,
      name: response.name ?? undefined,
      avatarUrl: response.avatar_url ?? undefined,
    };
  },

  async getDatabase({ context: { apiKey }, input: { databaseId } }) {
    const notion = new Client({ auth: apiKey });
    const response = await notion.databases.retrieve({
      database_id: databaseId,
    });

    if (response.object !== 'database') {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Notion API returned unexpected response',
      });
    }

    return {
      id: response.id,
      object: response.object,
      properties: response.properties,
    };
  },

  async createPage({ context: { apiKey }, input: { parent, properties } }) {
    const notion = new Client({ auth: apiKey });
    const response = await notion.pages.create({
      parent: {
        database_id: parent.databaseId,
      },
      properties: properties,
    });

    return {
      object: 'page',
      id: response.id,
    };
  },
};
