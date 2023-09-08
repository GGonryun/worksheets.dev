import { ApplicationMetadata } from '../framework';

export const sinch: ApplicationMetadata<'sinch'> = {
  enabled: true,
  logo: 'https://storage.googleapis.com/worksheets-test-app-logos/apps/sinch.svg',
  title: 'Sinch',
  subtitle: 'Send SMS messages to your customers with Sinch',
  categories: ['communication', 'sms'],
  tags: ['paid', 'beta'],
  faq: [['TODO', 'TODO']],
  description:
    'Build meaningful connections with your customers at every step of their journey and enable conversations across messaging, voice, or email — with unmatched scalability, deliverability, and cost-effectiveness. Sinch makes it easy!',
  creator: 'Worksheets.dev',
  lastUpdated: 1692056807069,
  tutorialUrl: 'https://developers.sinch.com/',
  methods: {
    dryRunBatch: {
      title: 'Dry Run Batch',
      description:
        'This operation will perform a dry run of a batch which calculates the bodies and number of parts for all messages in the batch without actually sending any messages.',
      pricing: 0.001,
      sourceUrl:
        'https://developers.sinch.com/docs/sms/api-reference/sms/tag/Batches/#tag/Batches/operation/Dry_Run',
    },
    sendBatch: {
      title: 'Send Batch',
      description:
        'Send a message or a batch of messages. Depending on the length of the body, one message might be split into multiple parts and charged accordingly. Any groups targeted in a scheduled batch will be evaluated at the time of sending. If a group is deleted between batch creation and scheduled date, it will be considered empty.',
      pricing: 0.001,
      sourceUrl:
        'https://developers.sinch.com/docs/sms/api-reference/sms/tag/Batches/#tag/Batches/operation/SendSMS',
    },
    listBatches: {
      title: 'List Batches',
      description:
        'With the list operation you can list batch messages created in the last 14 days that you have created. This operation supports pagination.',
      pricing: 0.001,
      sourceUrl:
        'https://developers.sinch.com/docs/sms/api-reference/sms/tag/Batches/#tag/Batches/operation/ListBatches',
    },
  },
};
