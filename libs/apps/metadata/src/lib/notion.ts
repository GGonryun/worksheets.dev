import { ApplicationMetadata } from '../framework';

export const notion: ApplicationMetadata<'notion'> = {
  enabled: false,
  logo: 'https://storage.googleapis.com/worksheets-test-app-logos/notion.svg',

  title: 'Notion',
  subtitle:
    "Developers can use Notion's public API to interact with Notion workspaces programmatically.",
  categories: ['productivity', 'notes'],
  tags: ['paid'],
  faq: [['TODO', 'TODO']],
  description:
    'Notion is a freemium productivity and note-taking web application developed by Notion Labs Inc. It offers organizational tools including task management, project tracking, to-do lists, bookmarking, and more.',
  creator: 'Worksheets.dev',
  lastUpdated: 1690615559053,
  tutorialUrl:
    'https://developers.notion.com/docs/create-a-notion-integration#before-you-begin',
  methods: {
    getUser: {
      title: 'Retrieve a user',
      description: 'Retrieves a User using the ID specified.',
      pricing: 0.001,
      sourceUrl: 'https://developers.notion.com/reference/get-user',
    },
    listUsers: {
      title: 'List Users',
      description: 'Retrieves a paginated list of users for the workspace.',
      pricing: 0.001,
      sourceUrl: 'https://developers.notion.com/reference/get-users',
    },
    getBot: {
      title: "Retrieve your token's bot user",
      description: 'Retrieves the bot user associated with the provided token.',
      pricing: 0.001,
      sourceUrl: 'https://developers.notion.com/reference/get-self',
    },
    getDatabase: {
      title: 'Retrieve a database',
      description:
        "Retrieves a database object — information that describes the structure and columns of a database — for a provided database ID. The response adheres to any limits to an integration's capabilities.",

      pricing: 0.001,
      sourceUrl: 'https://developers.notion.com/reference/retrieve-a-database',
    },
    createPage: {
      title: 'Create a page',
      description:
        'Creates a new page that is a child of an existing database.',
      pricing: 0.001,
      sourceUrl: 'https://developers.notion.com/reference/post-page',
    },
  },
};
