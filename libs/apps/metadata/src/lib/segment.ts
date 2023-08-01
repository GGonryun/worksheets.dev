import { ApplicationMetadata } from '../framework';

export const segment: ApplicationMetadata<'segment'> = {
  enabled: false,
  logo: 'https://storage.googleapis.com/worksheets-test-app-logos/segment.svg',
  title: 'Segment',
  subtitle:
    'Segment is a customer data platform (CDP) that helps you collect, clean, and control your customer data.',
  categories: [
    'Analytics',
    'Marketing',
    'Customer Data Platform',
    'Data Management Platform',
  ],
  description:
    'With Segment, you can collect, transform, send, and archive your first-party customer data. Segment simplifies the process of collecting data and connecting new tools, allowing you to spend more time using your data, and less time trying to collect it. You can use Segment to track events that happen when a user interacts with the interfaces. "Interfaces" is Segment\'s generic word for any digital properties you own: your website, mobile apps, and processes that run on a server or OTT device. When you capture interaction data in Segment, you can send it (often in real-time) to your marketing, product, and analytics tools, as well as to data warehouses. In most cases, you won\'t even need to touch your tracking code to connect to new tools.',
  creator: 'Worksheets.dev',
  lastUpdated: 1690615559053,
  tutorialUrl: 'https://segment.com/docs/getting-started/implementation-guide/',
  methods: {
    page: {
      title: 'Page',
      description:
        'Page lets you record page views on your website, along with optional extra information about the page being viewed.',
      pricing: 0.001,
      sourceUrl:
        'https://segment.com/docs/connections/sources/catalog/libraries/server/node/#page',
    },
    alias: {
      title: 'Alias',
      description:
        'Alias lets you merge two user identities, effectively connecting two sets of user data as one. This is an advanced method, but it is required to manage user identities successfully in some of our integrations.',
      pricing: 0.001,
      sourceUrl:
        'https://segment.com/docs/connections/sources/catalog/libraries/server/node/#alias',
    },
    group: {
      title: 'Group',
      description:
        'Group lets you associate an individual user with a group—such as a company, organization, account, project, workspace, team, etc.',
      pricing: 0.001,
      sourceUrl:
        'https://segment.com/docs/connections/sources/catalog/libraries/server/node/#group',
    },
    track: {
      title: 'Track',
      description:
        'Track lets you record any actions your users perform. Every action triggers what we call an “event”, which can also have associated properties.',
      pricing: 0.001,
      sourceUrl:
        'https://segment.com/docs/connections/sources/catalog/libraries/server/node/#track',
    },
    identify: {
      title: 'Identify',
      description:
        'Identify lets you tie a user to their actions and record traits about them. It includes a unique User ID and any optional traits you know about them.',

      pricing: 0.001,
      sourceUrl:
        'https://segment.com/docs/connections/sources/catalog/libraries/server/node/#identify',
    },
  },
};
