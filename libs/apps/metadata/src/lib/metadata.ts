import { ApplicationMetadataMask } from './framework';

export const metadata: ApplicationMetadataMask = {
  // internal
  time: {
    enabled: true,
    pricing: {
      now: 0,
    },
    tutorialUrl: '',
    overview: '',
    creator: 'Worksheets.dev',
    lastUpdated: 'June 28th, 2023',
    sourceUrls: {
      now: '',
    },
  },
  sys: {
    enabled: true,
    pricing: {
      log: 0,
    },
    tutorialUrl: '',
    overview: '',
    creator: 'Worksheets.dev',
    lastUpdated: 'June 28th, 2023',
    sourceUrls: {
      log: '',
    },
  },
  math: {
    enabled: true,
    tutorialUrl: '',
    overview: '',
    creator: 'Worksheets.dev',
    pricing: {
      calc: 0,
      identity: 0,
      min: 0,
      max: 0,
      abs: 0,
      avg: 0,
    },
    lastUpdated: 'June 28th, 2023',
    sourceUrls: {
      calc: '',
      identity: '',
      min: '',
      max: '',
      abs: '',
      avg: '',
    },
  },
  openai: {
    enabled: true,
    tutorialUrl: '',
    overview:
      'OpenAI has trained cutting-edge language models that are very good at understanding and generating text. Our API provides access to these models and can be used to solve virtually any task that involves processing language.\n\nThe OpenAI API can be applied to virtually any task that requires understanding or generating natural language and code. The OpenAI API can also be used to generate and edit images or convert speech into text. We offer a range of models with different capabilities and price points, as well as the ability to fine-tune custom models.',
    creator: 'Worksheets.dev',
    pricing: {
      createCompletion: 0.00002,
      createImage: 0.00002,
      listModels: 0.00002,
    },
    lastUpdated: 'June 28th, 2023',
    sourceUrls: {
      createCompletion:
        'https://platform.openai.com/docs/api-reference/chat/create',
      createImage:
        'https://platform.openai.com/docs/api-reference/images/create',
      listModels: 'https://platform.openai.com/docs/api-reference/models/list',
    },
  },
  http: {
    enabled: true,
    tutorialUrl: '',
    lastUpdated: 'June 20, 2023',
    overview:
      'The HTTP package exposes methods for executing and processing HTTP requests. The package is useful for interacting with REST APIs and webhooks. You must provide a URL to send the request to, and you can optionally specify the HTTP method, headers, and body. Note: HTTP requests only support JSON responses.',
    creator: 'Worksheets.dev',
    pricing: {
      request: 0.000001,
    },
    sourceUrls: {
      request: '',
    },
  },
  json: {
    enabled: true,
    tutorialUrl: '',
    lastUpdated: 'June 20, 2023',
    overview:
      'The JSON package provides methods for parsing, querying, and stringifying JSON data. The query method uses the popular JSONPath syntax. It is useful for extracting data from JSON objects and arrays. The parse method converts a JSON string into a JavaScript object. The stringify method converts a JavaScript object into a JSON string.',
    creator: 'Worksheets.dev',
    pricing: {
      parse: 0,
      stringify: 0,
      query: 0.000001,
    },
    sourceUrls: {
      parse: '',
      query: '',
      stringify: '',
    },
  },
  // external
  gmail: {
    enabled: true,
    tutorialUrl: '',
    lastUpdated: 'June 20, 2023',
    overview:
      'Gmail is a free email service provided by Google. As of 2019, it had 1.5 billion active users worldwide making it the largest email service in the world. Gmail is available in 72 languages and offers 15 GB of free storage. Gmail can be accessed through web browsers or mobile apps on Android and iOS devices. Gmail also offers a paid version called G Suite which includes additional features such as custom email addresses, unlimited storage, and advanced security features.',
    creator: 'Worksheets.dev',
    pricing: {
      sendEmail: 0.0005,
      getUserEmail: 0.0005,
    },
    sourceUrls: {
      sendEmail:
        'https://developers.google.com/gmail/api/reference/rest/v1/users.messages/send',
      getUserEmail:
        'https://developers.google.com/gmail/api/reference/rest/v1/users/getProfile',
    },
  },
  notion: {
    enabled: true,
    tutorialUrl:
      'https://developers.notion.com/docs/create-a-notion-integration#before-you-begin',
    lastUpdated: 'July 23, 2023',
    overview:
      'Notion is a freemium productivity and note-taking web application developed by Notion Labs Inc. It offers organizational tools including task management, project tracking, to-do lists, bookmarking, and more.',
    creator: 'Worksheets.dev',
    pricing: {
      listUsers: 0.0005,
      getUser: 0.0005,
      getBot: 0.0005,
      getDatabase: 0.005,
      createPage: 0.005,
    },
    sourceUrls: {
      listUsers: 'https://developers.notion.com/reference/get-users',
      getUser: 'https://developers.notion.com/reference/get-user',
      getBot: 'https://developers.notion.com/reference/get-self',
      getDatabase:
        'https://developers.notion.com/reference/retrieve-a-database',
      createPage: 'https://developers.notion.com/reference/post-page',
    },
  },
  slack: {
    enabled: false,
    tutorialUrl: 'https://api.slack.com/messaging/sending',
    lastUpdated: 'July 23, 2023',
    overview:
      'Slack is an instant messaging program designed by Slack Technologies and owned by Salesforce. Although Slack was developed for professional and organizational communications, it has also been adopted as a community platform.',
    creator: '',
    pricing: {
      listConversations: 0.0005,
      postChatMessage: 0.0005,
    },
    sourceUrls: {
      listConversations: 'https://api.slack.com/methods/users.conversations',
      postChatMessage: 'https://api.slack.com/methods/chat.postMessage',
    },
  },
  fullstory: {
    enabled: true,
    tutorialUrl: 'https://developer.fullstory.com/overview/api-basics/',
    lastUpdated: 'July 23, 2023',
    overview:
      'The FullStory API allows you to capture custom user and event data. This data will enrich your analysis with FullStory by giving you additional dimensions to create segments and data visualizations that are better tailored to your specific business needs.',
    creator: 'Worksheets.dev',
    pricing: {
      createUser: 0.0005,
      getUser: 0.0005,
      listUsers: 0.0005,
      deleteUser: 0.0005,
      updateUser: 0.0005,
      createEvent: 0.0005,
      listSessions: 0.0005,
    },
    sourceUrls: {
      createUser:
        'https://developer.fullstory.com/server/v2/users/create-user/',
      getUser: 'https://developer.fullstory.com/server/v1/users/get-user/',
      listUsers: 'https://developer.fullstory.com/server/v2/users/list-users/',
      deleteUser:
        'https://developer.fullstory.com/server/v2/users/delete-user/',
      updateUser:
        'https://developer.fullstory.com/server/v2/users/update-user/',
      createEvent:
        'https://developer.fullstory.com/server/v2/events/create-events/',
      listSessions:
        'https://developer.fullstory.com/server/v1/sessions/list-sessions/',
    },
  },
  googleCalendar: {
    enabled: true,
    tutorialUrl: 'https://developers.google.com/calendar',
    lastUpdated: 'July 23, 2023',
    overview:
      'Google Calendar is a time-management and scheduling calendar service developed by Google. The Google Calendar API is a RESTful API that exposes most of the features available in the Google Calendar Web interface.',
    creator: 'Worksheets.dev',
    pricing: {
      listEvents: 0.0005,
    },
    sourceUrls: {
      listEvents:
        'https://developers.google.com/calendar/api/v3/reference/events/list',
    },
  },
  pagerDuty: {
    enabled: true,
    tutorialUrl: 'https://developer.pagerduty.com/',
    lastUpdated: 'July 23, 2023',
    overview:
      "PagerDuty's easy to use, self-service developer account makes getting started with integrations simple. Over 12,000 happy customers around the world count on PagerDuty for DevOps, IT Ops, Security, Customer Service, Business Ops, Industrial Ops and IOT, and many other use cases.",
    creator: 'Worksheets.dev',
    pricing: {
      listIncidents: 0.0005,
      createIncident: 0.0005,
      updateIncident: 0.0005,
      listServices: 0.0005,
      listPriorities: 0.0005,
    },
    sourceUrls: {
      listIncidents:
        'https://developer.pagerduty.com/api-reference/9d0b4b12e36f9-list-incidents',
      createIncident:
        'https://developer.pagerduty.com/api-reference/a7d81b0e9200f-create-an-incident',
      updateIncident:
        'https://developer.pagerduty.com/api-reference/8a0e1aa2ec666-update-an-incident',
      listServices:
        'https://developer.pagerduty.com/api-reference/e960cca205c0f-list-services',
      listPriorities:
        'https://developer.pagerduty.com/api-reference/0fa9ad52bf2d2-list-priorities',
    },
  },
  segment: {
    enabled: true,
    tutorialUrl:
      'https://segment.com/docs/getting-started/implementation-guide/',
    lastUpdated: 'July 23, 2023',
    overview:
      'With Segment, you can collect, transform, send, and archive your first-party customer data. Segment simplifies the process of collecting data and connecting new tools, allowing you to spend more time using your data, and less time trying to collect it. You can use Segment to track events that happen when a user interacts with the interfaces. "Interfaces" is Segment\'s generic word for any digital properties you own: your website, mobile apps, and processes that run on a server or OTT device. When you capture interaction data in Segment, you can send it (often in real-time) to your marketing, product, and analytics tools, as well as to data warehouses. In most cases, you won\'t even need to touch your tracking code to connect to new tools.',
    creator: 'Worksheets.dev',
    pricing: {
      page: 0.0005,
      alias: 0.0005,
      group: 0.0005,
      track: 0.0005,
      identify: 0.0005,
    },
    sourceUrls: {
      page: 'https://segment.com/docs/connections/sources/catalog/libraries/server/node/#page',
      alias:
        'https://segment.com/docs/connections/sources/catalog/libraries/server/node/#alias',
      group:
        'https://segment.com/docs/connections/sources/catalog/libraries/server/node/#group',
      track:
        'https://segment.com/docs/connections/sources/catalog/libraries/server/node/#track',
      identify:
        'https://segment.com/docs/connections/sources/catalog/libraries/server/node/#identify',
    },
  },
  sendGrid: {
    enabled: true,
    tutorialUrl:
      'https://docs.sendgrid.com/api-reference/how-to-use-the-sendgrid-v3-api/authentication',
    lastUpdated: 'July 23, 2023',
    overview:
      'SendGrid is a cloud-based email delivery service that allows developers to send transactional and marketing emails through a simple and scalable API. The SendGrid API provides a set of endpoints that developers can use to send emails programmatically from their applications.',
    creator: 'Worksheets.dev',
    pricing: {
      sendEmail: 0.0005,
    },
    sourceUrls: {
      sendEmail: 'https://docs.sendgrid.com/api-reference/mail-send/mail-send',
    },
  },
};
