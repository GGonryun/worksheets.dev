import { TRPCError } from '@trpc/server';
import { ApplicationExecutors } from '../framework';
import { init } from '@fullstory/server-api-client';

export const fullstory: ApplicationExecutors<'fullstory'> = {
  async createUser({ context, input }) {
    const fsClient = init({ apiKey: context.apiKey });

    const response = await fsClient.users.create({
      email: input.email,
      display_name: input.displayName,
      uid: input.userId,
      properties: input.properties,
    });

    return {
      id: response.body?.id ?? '',
    };
  },
  async getUser({ context, input }) {
    const fsClient = init({ apiKey: context.apiKey });

    const response = await fsClient.users.get(input.id);

    return {
      id: response.body?.id ?? '',
      userId: response.body?.uid ?? '',
      displayName: response.body?.display_name ?? '',
      email: response.body?.email ?? '',
      properties: (response.body?.properties ?? {}) as Record<string, unknown>,
    };
  },
  async listUsers({ context }) {
    const fsClient = init({ apiKey: context.apiKey });

    const response = await fsClient.users.list();

    return {
      results:
        response.body?.results.map((r) => ({
          id: r.id,
          userId: r.uid,
          displayName: r.display_name,
          email: r.email,
          properties: r.properties as Record<string, unknown>,
        })) ?? [],
      totalRecords: response.body?.total_records,
      nextPageToken: response.body?.next_page_token,
    };
  },
  async deleteUser({ context, input }) {
    const fsClient = init({ apiKey: context.apiKey });

    const id = input?.id ?? input.userId;
    if (!id) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'id or userId must be provided',
      });
    }

    await fsClient.users.delete(id);

    return undefined;
  },
  async updateUser({ context, input }) {
    const fsClient = init({ apiKey: context.apiKey });

    const response = await fsClient.users.update(input.id, {
      email: input.email,
      display_name: input.displayName,
      uid: input.userId,
      properties: input.properties,
    });

    return {
      id: response.body?.id ?? input.id,
    };
  },
  async createEvent({ context, input }) {
    const fsClient = init({ apiKey: context.apiKey });

    await fsClient.events.create({
      user: input.user
        ? {
            id: input.user.id,
            uid: input.user.userId,
          }
        : undefined,
      session: input.session
        ? {
            id: input.session.id,
            use_most_recent: input.session.useMostRecent,
          }
        : undefined,
      events: [
        {
          name: input.name,
          properties: input.properties,
          timestamp: input.timestamp,
        },
      ],
    });

    return undefined;
  },
  async listSessions({ context, input }) {
    const url = new URL('https://api.fullstory.com/sessions/v2');

    if (input.email) {
      url.searchParams.append('email', input.email);
    } else if (input.userId) {
      url.searchParams.append('uid', input.userId);
    } else {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'email or userId must be provided',
      });
    }

    if (input.limit) {
      url.searchParams.append('limit', input.limit.toString());
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        Authorization: `Basic ${context.apiKey}`,
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      const text = await response.text();
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'unexpected failure listing fullstory sessions',
        cause: new Error(text),
      });
    }

    const json = await response.json();
    return {
      sessions: json.sessions,
    };
  },
};
