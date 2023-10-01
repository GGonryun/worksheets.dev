export * from './tokens';

import { z } from '@worksheets/zod';

export const userLimitsEntity = z.object({
  id: z.string(),
  maxApiTokens: z.number(),
});

const quota = (resourceName: string) =>
  z.object({
    current: z.number().describe(`how many ${resourceName} uses remaining`),
    resetTo: z
      .number()
      .describe(
        `how many ${resourceName} uses the user has in total. when the current cycle ends the user will be reset to this value`
      ),
  });

export const userQuotasEntity = z.object({
  id: z.string(),
  createdAt: z.number().describe('timestamp of creation date, in milliseconds'),
  enabled: z.boolean().default(true),
  overclocked: z.boolean().default(false),
  executions: quota('method execution'),
});

export type UserLimitsEntity = z.infer<typeof userLimitsEntity>;
export type UserQuotasEntity = z.infer<typeof userQuotasEntity>;

export const profileSchema = z.object({
  name: z.string(),
});

export const userAgentSchema = z.object({
  uid: z.string(),
  email: z.string().optional(),
  emailVerified: z.boolean(),
  disabled: z.boolean(),
  displayName: z.string().optional(),
  photoURL: z.string().optional(),
  phoneNumber: z.string().optional(),
  metadata: z.object({
    lastSignInTime: z.string(),
    creationTime: z.string(),
  }),
});

export type UserOverviewRequest = z.infer<typeof userOverviewRequestSchema>;
export const userOverviewRequestSchema = z
  .object({
    acknowledge: z.boolean().optional(),
  })
  .optional();

export type UserOverview = z.infer<typeof userOverviewSchema>;
export const userOverviewSchema = z.object({
  uid: z.string(),
  meta: z.object({
    plan: z.string(),
    cycle: z.string(),
    email: z.string().optional(),
    name: z.string().optional(),
  }),
  quotas: userQuotasEntity,
  limits: z.object({
    tokens: z.number(),
  }),
  counts: z.object({
    tokens: z.number(),
  }),
});

export type UserContactEntity = z.infer<typeof userContactEntity>;
export const userContactEntity = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  message: z.string(),
  createdAt: z.number().describe('timestamp of creation date, in milliseconds'),
});

export type NewsletterMessage = z.infer<typeof newsletterMessageSchema>;
export const newsletterMessageSchema = z.enum([
  'ALREADY_SUBSCRIBED',
  'NEW_SUBSCRIPTION',
  'UNSUBSCRIBED',
]);

export type NewsletterError = z.infer<typeof newsletterErrorSchema>;
export const newsletterErrorSchema = z.enum([
  'INTERNAL_SERVER_ERROR',
  'ALREADY_SUBSCRIBED',
  'NOT_SUBSCRIBED',
  'INVALID_EMAIL',
  'INVALID_TOPIC',
]);

export type NewsletterTopic = z.infer<typeof newsletterTopicSchema>;
export const newsletterTopicSchema = z.enum(['newsletter', 'product', 'games']);

export type NewsletterSubscriptionEntity = z.infer<
  typeof newsletterSubscriptionEntity
>;
export const newsletterSubscriptionEntity = z.object({
  id: z.string(),
  email: z.string(),
  topics: z.array(newsletterTopicSchema),
  createdAt: z.number().describe('timestamp of creation date, in milliseconds'),
});
