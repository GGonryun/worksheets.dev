import {
  NewsletterTopic,
  Prisma,
  PrismaClient,
  PrismaTransactionalClient,
} from '@worksheets/prisma';
import { playRoutes } from '@worksheets/routes';
import { EmailService, TemplateOptions } from '@worksheets/services/email';
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
  template: Pick<TemplateOptions, 'paragraphs' | 'title' | 'links'>;
};

export class NewsletterService {
  #db: PrismaClient | PrismaTransactionalClient;
  #email: EmailService;
  // gmail allows us to send up to 500 recipients in a single BCC field
  // we use a smaller safer number to avoid hitting the limit
  maxBccRecipients = 100;
  constructor(db: PrismaClient | PrismaTransactionalClient) {
    this.#email = new EmailService(db);
    this.#db = db;
  }

  async schedule(opts: ScheduleNewsletterInput) {
    // get a list of all newsletter subscribers who have opted in to the topic
    const subscribers = await this.#db.newsletterSubscription.findMany({
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

    const template = (id: string) =>
      EmailService.template({
        ...opts.template,
        unsubscribe:
          opts.topic !== 'Transactional'
            ? playRoutes.newsletter.unsubscribe.url({
                query: {
                  id,
                },
              })
            : undefined,
      });

    this.#email.scheduleMany(
      subscribers.map((sub) => ({
        to: [sub.email],
        subject: opts.subject,
        html: template(sub.id),
        priority: opts.priority,
        sendAt: opts.sendAt,
      }))
    );
  }
}
