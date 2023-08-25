import { ApplicationMetadata } from '../framework';

export const time: ApplicationMetadata<'time'> = {
  enabled: true,
  creator: 'Worksheets.dev',
  logo: 'https://storage.googleapis.com/worksheets-test-app-logos/time.svg',
  tutorialUrl: 'https://docs.worksheets.dev/tutorials/apps/time',
  title: 'Time',
  subtitle: 'Supplies methods for manipulating dates and times',
  categories: ['system'],
  tags: ['free'],
  faq: [['TODO', 'TODO']],
  description: '',
  lastUpdated: 1690615559053,
  methods: {
    now: {
      title: 'Now',
      description: 'Returns the current date and time',
      pricing: 0,
      sourceUrl: '',
    },
  },
};
