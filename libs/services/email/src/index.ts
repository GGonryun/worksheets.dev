import { GMAIL_PASS, GMAIL_USER } from '@worksheets/services/environment';
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

export class EmailService {
  #transporter: nodemailer.Transporter;

  constructor() {
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

  async verify() {
    this.#transporter.verify().then(console.info).catch(console.error);
  }

  static template(opts: TemplateOptions): string {
    return template(opts);
  }
}
