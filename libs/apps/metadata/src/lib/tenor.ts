import { ApplicationMetadata } from '../framework';

export const tenor: ApplicationMetadata<'tenor'> = {
  enabled: true,
  logo: 'https://storage.googleapis.com/worksheets-test-app-logos/apps/tenor.svg',
  title: 'Tenor',
  subtitle:
    'Search for GIFs and videos to share the perfect reaction or make your own.',
  categories: ['Images', 'GIFs', 'Search', 'Reaction', 'Emotion'],
  description:
    "Tenor is a GIF platform that powers GIF search for many of today's most popular apps and services. Tenor takes a data-centric approach to delivering the most relevant GIF search results. Tenor analyzes GIFs across hundreds of dimensions, from composition to category, to ensure that every GIF you discover via Tenor is tailored to exactly what you want to see.",
  creator: 'Worksheets.dev',
  lastUpdated: 1691948377453,
  tutorialUrl: 'https://developers.google.com/tenor/guides/quickstart',
  methods: {
    search: {
      title: 'Search GIFs',
      description: 'Find GIFs by searching for a keyword or phrase.',
      pricing: 0.001,
      sourceUrl: 'https://developers.google.com/tenor/guides/endpoints#search',
    },
  },
};
