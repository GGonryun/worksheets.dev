import { ApplicationMetadata } from '../framework';

export const fullstory: ApplicationMetadata<'fullstory'> = {
  enabled: true,
  logo: 'https://storage.googleapis.com/worksheets-test-app-logos/apps/fullstory.svg',
  title: 'FullStory',
  subtitle:
    'FullStory is a customer analytics platform that helps industry leading eCommerce and SaaS Companies understand and improve their digital experiences.',
  categories: ['analytics', 'productivity'],
  tags: ['new', 'featured', 'free'],
  description:
    'The FullStory API allows you to capture custom user and event data. This data will enrich your analysis with FullStory by giving you additional dimensions to create segments and data visualizations that are better tailored to your specific business needs.',

  creator: 'Worksheets.dev',
  lastUpdated: 1690615559053,
  tutorialUrl: 'https://developer.fullstory.com/overview/api-basics/',
  faq: [
    [
      'What is FullStory?',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Facilisis mauris sit amet massa vitae tortor condimentum lacinia quis.',
    ],
    [
      'Who is FullStory for?',
      'Lorem ipsum dolor sit amet, consectetur cras. Facilisis mauris sit amet massa vitae tortor condimentum lacinia quis. Bibendum enim facilisis gravida neque convallis a cras semper.',
    ],
    [
      'Why is FullStory necessary?',
      'Lorem ipsum dolor sit amet; facili. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Facilisis mauris sit amet massa vitae tortor condimentum lacinia quis.',
    ],
    [
      'How can I get the most out of FullStory?',
      'Lorem ipsum dolor sit amet, simple. Gravida neque convallis a cras semper auctor neque vitae.',
    ],
    [
      'How do I get started with FullStory?',
      'Lorem ipsum dolor sit amet. Gravida neque convallis a cras semper or.',
    ],
  ],
  methods: {
    createUser: {
      title: 'Create User',
      description:
        'Creates a user with the specified details. This request can be made idempotent.',
      pricing: 0.001,
      sourceUrl: 'https://developer.fullstory.com/server/v2/users/create-user/',
    },
    getUser: {
      title: 'Get User',
      description:
        'Get data about users who have been identified in the browser via the FS.identify Browser API function.',
      pricing: 0.001,
      sourceUrl: 'https://developer.fullstory.com/server/v1/users/get-user/',
    },
    listUsers: {
      title: 'List Users',
      description:
        'Retrieve a list of users matching the supplied filter criteria.',
      pricing: 0.001,
      sourceUrl: 'https://developer.fullstory.com/server/v2/users/list-users/',
    },
    deleteUser: {
      title: 'Delete User',
      description:
        'Delete a user and all associated data. This operation is irreversible.',
      pricing: 0.001,
      sourceUrl: 'https://developer.fullstory.com/server/v2/users/delete-user/',
    },
    updateUser: {
      title: 'Update User',
      description: 'Updates a user with the specified details',
      pricing: 0.001,
      sourceUrl: 'https://developer.fullstory.com/server/v2/users/update-user/',
    },
    createEvent: {
      title: 'Create Event',
      description:
        'Creates one event with the specified details. This request can be made idempotent.',
      pricing: 0.001,
      sourceUrl:
        'https://developer.fullstory.com/server/v2/events/create-events/',
    },
    listSessions: {
      title: 'List Sessions',
      description:
        'Retrieve a list of sessions matching the supplied filter criteria.',
      pricing: 0.001,
      sourceUrl:
        'https://developer.fullstory.com/server/v1/sessions/list-sessions/',
    },
    me: {
      title: 'Me',
      description:
        'This endpoint provides a way to test authentication with an API key. The API returns identifying information corresponding to the provided authentication method. This endpoint does not accept any parameters',
      pricing: 0.001,
      sourceUrl: 'https://developer.fullstory.com/server/v1/authentication/me/',
    },
  },
};