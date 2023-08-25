import { ApplicationMetadata } from '../framework';

export const gmail: ApplicationMetadata<'gmail'> = {
  enabled: true,
  logo: 'https://storage.googleapis.com/worksheets-test-app-logos/logo-gmail-png-gmail-icon-download-png-and-vector-1.png',
  title: 'Gmail',
  subtitle:
    'Gmail is a free email service provided by Google. As of 2019, it had 1.5 billion active users worldwide making it the largest email service in the world.',
  categories: ['communication', 'email'],
  tags: ['new', 'popular', 'featured', 'trending', 'free'],
  description:
    'Gmail is a free email service provided by Google. As of 2019, it had 1.5 billion active users worldwide making it the largest email service in the world. Gmail is available in 72 languages and offers 15 GB of free storage. Gmail can be accessed through web browsers or mobile apps on Android and iOS devices. Gmail also offers a paid version called G Suite which includes additional features such as custom email addresses, unlimited storage, and advanced security features.',
  creator: 'Worksheets.dev',
  lastUpdated: 1690615559053,
  tutorialUrl: 'https://docs.worksheets.dev/tutorials/apps/gmail',
  faq: [['TODO', 'TODO']],
  methods: {
    sendEmail: {
      title: 'Send Email',
      description: 'Send an email to a user from the current gmail account',
      pricing: 0.001,
      sourceUrl:
        'https://developers.google.com/gmail/api/reference/rest/v1/users.messages/send',
    },
    getUserEmail: {
      title: 'Get User Email',
      description:
        'Returns the email associated with the current connection to gmail',
      pricing: 0.001,
      sourceUrl:
        'https://developers.google.com/gmail/api/reference/rest/v1/users/getProfile',
    },
  },
};
