import { ApplicationMetadata } from '../framework';

export const sys: ApplicationMetadata<'sys'> = {
  enabled: true,
  logo: 'https://storage.googleapis.com/worksheets-test-app-logos/sys.svg',
  title: 'System',
  subtitle: 'Contains methods for interacting with the system',
  categories: ['system'],
  tags: ['free'],
  faq: [['TODO', 'TODO']],
  description: '',
  creator: 'Worksheets.dev',
  lastUpdated: 1690615559053,
  tutorialUrl: 'https://docs.worksheets.dev/tutorials/apps/sys',
  methods: {
    log: {
      title: 'Log',
      description:
        'Saves data to the system console. This method is used for debugging by Worksheets developers. This method takes any JSON input and logs it to our internal console.',
      pricing: 0,
      sourceUrl: '',
    },
  },
};
