import { ApplicationMetadata } from '../framework';

export const giphy: ApplicationMetadata<'giphy'> = {
  enabled: true,
  logo: 'https://storage.googleapis.com/worksheets-test-app-logos/apps/giphy.svg',
  title: 'Giphy',
  subtitle: 'Search and share animated GIFs',
  categories: ['Images', 'GIFs', 'Search'],
  description:
    'Giphy is an online database and search engine that allows users to search for and share short looping videos with no sound, that resemble animated GIF files.',
  creator: 'Worksheets.dev',
  lastUpdated: 1691948377453,
  tutorialUrl: 'https://developers.giphy.com/docs/api/#quick-start-guide',
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
