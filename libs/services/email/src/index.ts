import { PrismaClient, PrismaTransactionalClient } from '@worksheets/prisma';
import { GMAIL_PASS, GMAIL_USER } from '@worksheets/services/environment';
import { EmailPriority } from '@worksheets/util/types';
import * as nodemailer from 'nodemailer';

import { template, TemplateOptions } from './html/template.html';

export type { TemplateOptions };

export type SendEmailInput = {
  id: number | string; // used to correlate the email with the result
  to?: string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  text?: string;
  html?: string;
};

export type ScheduleEmailInput = {
  to?: string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  html: string;
  priority: EmailPriority;
  sendAt: Date;
};

export type SendEmailOutput = {
  to: string[];
} & (
  | {
      sent: true;
    }
  | {
      sent: false;
      error: Error;
    }
);

export class EmailService {
  #db: PrismaClient | PrismaTransactionalClient;
  #transporter: nodemailer.Transporter;
  // this is the maximum number of emails we can send per hour
  // at most we can send 2000 gmail emails every day
  // our cron service should process newsletter emails every hour
  // we use a smaller safer number to avoid hitting the limit
  #maxEmailsPerHour = 5;
  constructor(db: PrismaClient | PrismaTransactionalClient) {
    this.#db = db;
    this.#transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASS,
      },
    });
  }

  async send(opts: SendEmailInput) {
    const options: nodemailer.SendMailOptions = {
      from: '"Charity Games" <admin@charity.games>',
      subject: opts.subject,
      text: opts.text,
      html: opts.html,
    };

    if (opts.to) options.to = opts.to.join(', ');
    if (opts.cc) options.cc = opts.cc.join(', ');
    if (opts.bcc) options.bcc = opts.bcc.join(', ');

    try {
      if (!this.#transporter || !GMAIL_USER || !GMAIL_PASS) {
        throw new Error('Failed to create email transporter');
      }
      this.#transporter.sendMail(options);
      return true;
    } catch (error) {
      console.error(`Failed to send email ID: ${opts.id}`, error);
      throw error;
    }
  }

  async sendMany(emails: SendEmailInput[]) {
    return await Promise.allSettled(emails.map(this.send.bind(this)));
  }

  async schedule(email: ScheduleEmailInput) {
    await this.#db.scheduledEmail.create({
      data: email,
    });
  }

  async scheduleMany(emails: ScheduleEmailInput[]) {
    await this.#db.scheduledEmail.createMany({
      data: emails,
    });
  }

  async process() {
    // find all pending emails that are scheduled to be sent now or earlier
    const emails = await this.#db.scheduledEmail.findMany({
      where: {
        status: 'PENDING',
        sendAt: {
          lte: new Date(),
        },
      },
      take: this.#maxEmailsPerHour,
      orderBy: {
        // send the highest priority emails first, largest priority number is highest
        priority: 'asc',
      },
    });

    console.info(`Processing ${emails.length} emails`);

    // eagerly lock the emails to prevent other instances of the cron job from processing them
    await this.#db.scheduledEmail.updateMany({
      where: {
        id: {
          in: emails.map((email) => email.id),
        },
      },
      data: {
        status: 'SENDING',
      },
    });

    console.info(`Locked ${emails.length} emails for processing`);

    const results = await this.sendMany(emails);
    // organize results by success and failure
    const sentEmails = emails.filter(
      (_, i) => results[i].status === 'fulfilled'
    );
    const failedEmails = emails.filter(
      (_, i) => results[i].status === 'rejected'
    );

    await Promise.all([
      this.#db.scheduledEmail.updateMany({
        where: {
          id: {
            in: sentEmails.map((email) => email.id),
          },
        },
        data: {
          status: 'SENT',
        },
      }),
      this.#db.scheduledEmail.updateMany({
        where: {
          id: {
            in: failedEmails.map((email) => email.id),
          },
        },
        data: {
          status: 'FAILED',
        },
      }),
    ]);

    console.info(`Sent ${sentEmails.length} emails`);
    console.error(`Failed to send ${failedEmails.length} emails`);

    return {
      sent: sentEmails.length,
      failed: failedEmails.length,
    };
  }

  async verify() {
    this.#transporter.verify().then(console.info).catch(console.error);
  }

  static template(opts: TemplateOptions): string {
    return template(opts);
  }
}
