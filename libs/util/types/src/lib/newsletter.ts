import { NewsletterTopic } from '@worksheets/prisma';
import { z } from 'zod';

export const newsletterSubscriptionFormSchema = z.object({
  id: z.string().optional(),
  email: z.string().email(),
  topics: z.nativeEnum(NewsletterTopic).array(),
});

export type NewsletterSubscriptionForm = z.infer<
  typeof newsletterSubscriptionFormSchema
>;

export const newsletterSubscriptionSchema = z.object({
  id: z.string(),
  email: z.string(),
  topics: z.nativeEnum(NewsletterTopic).array(),
  confirmed: z.boolean(),
});

export type NewsletterSubscription = z.infer<
  typeof newsletterSubscriptionSchema
>;
