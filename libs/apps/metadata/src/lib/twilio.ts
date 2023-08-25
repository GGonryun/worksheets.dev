import { ApplicationMetadata } from '../framework';

export const twilio: ApplicationMetadata<'twilio'> = {
  enabled: true,
  logo: 'https://storage.googleapis.com/worksheets-test-app-logos/apps/twilio.svg',
  title: 'Twilio',
  subtitle: "Send SMS messages to your customers with Twilio's API",
  categories: ['communication', 'sms'],
  tags: ['paid'],
  faq: [['TODO', 'TODO']],
  description:
    "Twilio's APIs (Application Programming Interfaces) power its platform for communications. Behind these APIs is a software layer connecting and optimizing communications networks around the world to allow your users to call and message anyone, globally.",
  creator: 'Worksheets.dev',
  lastUpdated: 1692062826568,
  tutorialUrl: 'https://www.twilio.com/docs/usage/api',
  methods: {
    createMessage: {
      title: 'Create a Message',
      description:
        "To send a new outgoing message, send an HTTP POST request to your Account's Messages list resource URI.",
      pricing: 0.001,
      sourceUrl:
        'https://www.twilio.com/docs/sms/api/message-resource#create-a-message-resource',
    },
    listMessages: {
      title: 'Read Multiple Messages',
      description:
        "Read multiple Message resources by sending a GET request to your Account's Messages list URI. Results are sorted by the DateSent field, with the most recent messages appearing first.",
      pricing: 0.001,
      sourceUrl:
        'https://www.twilio.com/docs/sms/api/message-resource#read-multiple-message-resources',
    },
  },
};
