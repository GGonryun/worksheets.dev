import { ApplicationMetadata } from '../framework';

export const giphy: ApplicationMetadata<'giphy'> = {
  enabled: true,
  logo: 'https://storage.googleapis.com/worksheets-test-app-logos/apps/giphy.svg',
  title: 'Giphy',
  subtitle: 'Search and share animated GIFs',
  categories: ['media', 'images'],
  tags: ['new', 'paid'],
  description:
    'Giphy is an online database and search engine that allows users to search for and share short looping videos with no sound, that resemble animated GIF files.',
  creator: 'Worksheets.dev',
  lastUpdated: 1691948377453,
  tutorialUrl: 'https://developers.giphy.com/docs/api/#quick-start-guide',
  faq: [
    [
      'What is Giphy?',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Facilisis mauris sit amet massa vitae tortor condimentum lacinia quis.',
    ],
    [
      'Who is Giphy for?',
      'Lorem ipsum dolor sit amet, consectetur cras. Facilisis mauris sit amet massa vitae tortor condimentum lacinia quis. Bibendum enim facilisis gravida neque convallis a cras semper.',
    ],
    [
      'Why is Giphy necessary?',
      'Lorem ipsum dolor sit amet; facili. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Facilisis mauris sit amet massa vitae tortor condimentum lacinia quis.',
    ],
    [
      'How can I get the most out of Giphy?',
      'Lorem ipsum dolor sit amet, simple. Gravida neque convallis a cras semper auctor neque vitae.',
    ],
    [
      'How do I get started with Giphy?',
      'Lorem ipsum dolor sit amet. Gravida neque convallis a cras semper or.',
    ],
  ],
  methods: {
    search: {
      title: 'Search GIFS',
      sourceUrl: 'https://developers.giphy.com/docs/api/endpoint/#search',
      description:
        'GIPHY Search gives you access to the most relevant GIFs based on a word or phrase.',
      pricing: 0.001,
    },
  },
};
