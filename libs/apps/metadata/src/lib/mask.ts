import { ApplicationMetadataMask } from './framework';

export const metadata: ApplicationMetadataMask = {
  time: {
    enabled: true,
    pricing: {
      now: 0,
    },
    tutorial: '',
    overview: '',
    creator: 'Worksheets.dev',
    lastUpdated: 'June 28th, 2023',
  },
  sys: {
    enabled: true,
    pricing: {
      log: 0,
    },
    tutorial: '',
    overview: '',
    creator: 'Worksheets.dev',
    lastUpdated: 'June 28th, 2023',
  },
  math: {
    enabled: true,
    tutorial: '',
    overview: '',
    creator: 'Worksheets.dev',
    pricing: {
      calc: 0,
      identity: 0,
      min: 0,
      max: 0,
      abs: 0,
      avg: 0,
    },
    lastUpdated: 'June 28th, 2023',
  },
  openai: {
    enabled: true,
    tutorial: '',
    overview:
      'OpenAI has trained cutting-edge language models that are very good at understanding and generating text. Our API provides access to these models and can be used to solve virtually any task that involves processing language.\n\nThe OpenAI API can be applied to virtually any task that requires understanding or generating natural language and code. The OpenAI API can also be used to generate and edit images or convert speech into text. We offer a range of models with different capabilities and price points, as well as the ability to fine-tune custom models.',
    creator: 'Worksheets.dev',
    pricing: {
      createCompletion: 0.000002,
      createImage: 0.000002,
      listModels: 0.000002,
    },
    lastUpdated: 'June 28th, 2023',
  },
};
