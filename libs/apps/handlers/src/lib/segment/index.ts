import { TRPCError } from '@trpc/server';
import { ApplicationExecutors } from '../framework';
import { Analytics } from '@segment/analytics-node';

export const segment: ApplicationExecutors<'segment'> = {
  async alias({ context, input }) {
    const analytics = new Analytics({ writeKey: context.apiKey });

    analytics.alias({
      ...input,
    });

    return undefined;
  },
  async group({ context, input }) {
    const analytics = new Analytics({ writeKey: context.apiKey });
    if (input.userId) {
      analytics.group({
        ...input,
        userId: input.userId,
      });
    } else if (input.anonymousId) {
      analytics.group({
        ...input,
        anonymousId: input.anonymousId,
      });
    } else {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'userId or anonymousId must be provided',
      });
    }

    return undefined;
  },
  async page({ context, input }) {
    const analytics = new Analytics({ writeKey: context.apiKey });

    if (input.userId) {
      analytics.page({
        ...input,
        userId: input.userId,
      });
    } else if (input.anonymousId) {
      analytics.page({
        ...input,
        anonymousId: input.anonymousId,
      });
    } else {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'userId or anonymousId must be provided',
      });
    }

    return undefined;
  },
  async track({ context, input }) {
    const analytics = new Analytics({ writeKey: context.apiKey });

    if (input.userId) {
      analytics.track({
        ...input,
        userId: input.userId,
      });
    } else if (input.anonymousId) {
      analytics.track({
        ...input,
        anonymousId: input.anonymousId,
      });
    } else {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'userId or anonymousId must be provided',
      });
    }

    return undefined;
  },
  async identify({ context, input }) {
    const analytics = new Analytics({ writeKey: context.apiKey });
    if (input.userId) {
      analytics.identify({
        ...input,
        userId: input.userId,
      });
    } else if (input.anonymousId) {
      analytics.identify({
        anonymousId: input.anonymousId,
      });
    } else {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'userId or anonymousId must be provided',
      });
    }

    return undefined;
  },
};
