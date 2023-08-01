import { ApplicationMetadata } from '../framework';

export const json: ApplicationMetadata<'json'> = {
  enabled: true,
  logo: 'https://storage.googleapis.com/worksheets-test-app-logos/json.svg',
  title: 'JSON',
  subtitle:
    'Includes methods for working with JSON data such as parsing and stringifying',
  categories: [],
  description:
    'The JSON package provides methods for parsing, querying, and stringifying JSON data. The query method uses the popular JSONPath syntax. It is useful for extracting data from JSON objects and arrays. The parse method converts a JSON string into a JavaScript object. The stringify method converts a JavaScript object into a JSON string.',
  creator: 'Worksheets.dev',
  lastUpdated: 1690615559053,
  tutorialUrl: '',
  methods: {
    query: {
      title: 'JSON Query',
      description:
        'Search JSON data using JSONPath expressions and return the results',
      pricing: 0.000001,
      sourceUrl: 'https://github.com/json-path/JsonPath',
    },
    parse: {
      title: 'Parse',
      description: 'Converts a JSON string into an object',
      pricing: 0,
      sourceUrl: '',
    },
    stringify: {
      title: 'Stringify',
      description: 'Converts an object into a JSON string',
      pricing: 0,
      sourceUrl: '',
    },
  },
};
