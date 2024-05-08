import { PrismaClient, PrismaTransactionalClient } from '@worksheets/prisma';
import { DiscordService } from '@worksheets/services/discord';
import { EmailService } from '@worksheets/services/email';
import { NewsletterService } from '@worksheets/services/newsletter';
import { PushService } from '@worksheets/services/push';
import {
  ExtractTemplatePayload,
  NotificationTemplate,
  NotificationTemplateType,
} from '@worksheets/services/templates';
import { TwitterService } from '@worksheets/services/twitter';

import { destinations } from './destinations';

export class NotificationsService {
  #discord: DiscordService;
  #twitter: TwitterService;
  #newsletter: NewsletterService;
  #push: PushService;
  #email: EmailService;
  constructor(db: PrismaClient | PrismaTransactionalClient) {
    this.#discord = new DiscordService();
    this.#twitter = new TwitterService();
    this.#newsletter = new NewsletterService(db);
    this.#push = new PushService(db);
    this.#email = new EmailService(db);
  }
  async send<T extends NotificationTemplateType>(
    type: T,
    payload: ExtractTemplatePayload<T, NotificationTemplate>
  ): Promise<void> {
    const targets = destinations[type](payload);

    const tasks: Promise<unknown>[] = [];

    if (targets.twitter) {
      tasks.push(this.#twitter.tweet(targets.twitter));
    }
    if (targets.discord) {
      tasks.push(this.#discord.message(targets.discord));
    }
    if (targets.push) {
      tasks.push(this.#push.notify(targets.push));
    }
    if (targets.broadcast) {
      tasks.push(this.#push.notify(targets.broadcast));
    }
    // TODO: add support for a real newsletter and email service.
    if (targets.email) {
      tasks.push(this.#email.send(targets.email));
    }
    // TODO: add support for a real newsletter and email service.
    if (targets.newsletter) {
      targets.newsletter.forEach((newsletter) => {
        tasks.push(this.#newsletter.schedule(newsletter));
      });
    }

    const results = await Promise.allSettled(tasks);
    if (results.some((result) => result.status === 'rejected')) {
      for (const result of results) {
        if (result.status === 'rejected') {
          console.error(`Failed to process notification`, result.reason);
        }
      }
    } else {
      console.info(
        `Successfully sent notifications to all destinations for ${type}`
      );
    }
  }
}
