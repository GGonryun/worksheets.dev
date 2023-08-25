import { ApplicationMetadata } from '../framework';

export const sendGrid: ApplicationMetadata<'sendGrid'> = {
  enabled: false,
  title: 'SendGrid',
  subtitle:
    'SendGrid is a cloud-based email service that provides reliable transactional email delivery.',
  logo: 'https://storage.googleapis.com/worksheets-test-app-logos/sendgrid.svg',
  categories: ['email', 'communication', 'productivity'],
  tags: ['paid'],
  faq: [['TODO', 'TODO']],
  description:
    'SendGrid is a cloud-based email delivery service that allows developers to send transactional and marketing emails through a simple and scalable API. The SendGrid API provides a set of endpoints that developers can use to send emails programmatically from their applications. Learn more at https://sendgrid.com/docs/API_Reference/index.html',
  creator: 'Worksheets.dev',
  lastUpdated: 0,
  tutorialUrl:
    'https://docs.sendgrid.com/api-reference/how-to-use-the-sendgrid-v3-api/authentication',
  methods: {
    sendEmail: {
      title: 'Send Email',
      description: 'Send an email using SendGrid.',
      pricing: 0.001,
      sourceUrl: 'https://docs.sendgrid.com/api-reference/mail-send/mail-send',
    },
  },
};
