import { ApplicationMetadata } from '../framework';

export const math: ApplicationMetadata<'math'> = {
  enabled: true,
  logo: 'https://storage.googleapis.com/worksheets-test-app-logos/math.svg',
  title: 'Math',
  subtitle: 'Includes methods for performing mathematical operations',
  description: '',
  categories: ['system'],
  tags: ['free'],
  faq: [['TODO', 'TODO']],
  creator: 'Worksheets.dev',
  lastUpdated: 1690615559053,
  tutorialUrl: 'https://docs.worksheets.dev/tutorials/apps/math',
  methods: {
    calc: {
      title: 'Calculate',
      description: 'Performs an operation (+, -, *, /, ^) between X and Y.',
      pricing: 0,
      sourceUrl: '',
    },
    identity: {
      title: 'Identity',
      description:
        "This function always returns the value that was passed in as it's argument",
      pricing: 0,
      sourceUrl: '',
    },
    min: {
      title: 'Minimum',
      description: 'Finds the minimum value from a list of items. ',
      pricing: 0,
      sourceUrl: '',
    },
    max: {
      title: 'Maximum',
      description: 'Finds the maximum value from a list of items.',
      pricing: 0,
      sourceUrl: '',
    },
    abs: {
      title: 'Absolute Value',
      description:
        'Takes the absolute value of a number. Example: -5 => 5 and 5 => 5',
      pricing: 0,
      sourceUrl: '',
    },
    avg: {
      title: 'Average Value',
      description:
        'Takes the average value of a list of numbers. Example: [1, 2, 3] => 2',
      pricing: 0,
      sourceUrl: '',
    },
  },
};
