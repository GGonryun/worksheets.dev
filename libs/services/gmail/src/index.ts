import { GMAIL_PASS, GMAIL_USER } from '@worksheets/services/environment';
import * as nodemailer from 'nodemailer';

const GOOGLE_SMTP_HOST = 'smtp.gmail.com';
const GOOGLE_SMTP_PORT = 587;
const SENDER_ADDRESS = '"Charity Games" <admin@charity.games>';

const createTransporter = () => {
  return nodemailer.createTransport({
    host: GOOGLE_SMTP_HOST,
    port: GOOGLE_SMTP_PORT,
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_PASS,
    },
  });
};

export const sendEmail = async (opts: {
  to: string[];
  subject: string;
  text?: string;
  html?: string;
}) => {
  const transporter = createTransporter();
  const options = {
    from: SENDER_ADDRESS,
    to: opts.to.join(','),
    subject: opts.subject,
    text: opts.text,
    html: opts.html,
  };

  try {
    transporter.sendMail(options);
  } catch (error) {
    console.error(`Failed to send email`, options, error);
  }
};

export const verifyTransport = async () => {
  const transporter = createTransporter();

  transporter.verify().then(console.log).catch(console.error);
};
