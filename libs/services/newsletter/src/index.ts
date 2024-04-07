import { NewsletterTopic, Prisma } from '@worksheets/prisma';
import { batchArray } from '@worksheets/util/arrays';
import { EmailPriority } from '@worksheets/util/types';

export const BASIC_NEWSLETTER_SUBSCRIBER_PAYLOAD = {
  select: {
    id: true,
    email: true,
  },
};

export type BasicNewsletterSubscriberPayload =
  Prisma.NewsletterSubscriptionGetPayload<
    typeof BASIC_NEWSLETTER_SUBSCRIBER_PAYLOAD
  >;

export type ScheduleNewsletterInput = {
  emails?: string[];
  topic: NewsletterTopic;
  priority: EmailPriority;
  sendAt: Date;
  subject: string;
  html: string;
};

export class NewsletterService {
  // gmail allows us to send up to 500 recipients in a single BCC field
  // we use a smaller safer number to avoid hitting the limit
  maxBccRecipients = 100;

  async schedule(opts: ScheduleNewsletterInput) {
    // get a list of all newsletter subscribers who have opted in to the topic
    await prisma.$transaction(async (tx) => {
      const subscribers = await tx.newsletterSubscription.findMany({
        where: {
          confirmed: true,
          topics: {
            has: opts.topic,
          },
          // if we have a list of emails, only target those subscribers
          email: opts.emails
            ? {
                in: opts.emails,
              }
            : undefined,
        },
        ...BASIC_NEWSLETTER_SUBSCRIBER_PAYLOAD,
      });

      const batches = batchArray(subscribers, this.maxBccRecipients);

      await tx.scheduledEmail.createMany({
        data: batches.map((batch) => ({
          bcc: batch.map((s) => s.email),
          subject: opts.subject,
          html: opts.html,
          priority: opts.priority,
          sendAt: opts.sendAt,
        })),
      });
    });
  }
}
