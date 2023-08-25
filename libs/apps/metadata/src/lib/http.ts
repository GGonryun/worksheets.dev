import { ApplicationMetadata } from '../framework';

export const http: ApplicationMetadata<'http'> = {
  enabled: true,
  logo: 'https://storage.googleapis.com/worksheets-test-app-logos/http.svg',
  title: 'HTTP Utilities',
  subtitle: 'Contains methods for executing HTTP requests.',
  categories: ['utilities'],
  tags: ['paid'],
  faq: [['TODO', 'TODO']],
  description: 'Contains methods for executing HTTP requests.',
  creator: 'Worksheets.dev',
  lastUpdated: 1690615559053,
  tutorialUrl: 'https://docs.worksheets.dev/tutorials/apps/http',
  methods: {
    request: {
      title: 'HTTP Request',
      description:
        'The HTTP package exposes methods for executing and processing HTTP requests. The package is useful for interacting with REST APIs and webhooks. You must provide a URL to send the request to, and you can optionally specify the HTTP method, headers, and body. Note: HTTP requests only support JSON responses.',
      pricing: 0.000001,
      sourceUrl: '',
    },
  },
};
