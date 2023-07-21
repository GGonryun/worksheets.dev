import { ApplicationRegistrySampleData } from './lib/framework';

export * from './lib/framework';

export const sampleData: ApplicationRegistrySampleData = {
  time: {
    context: null,
    now: {
      input: undefined,
      output: 1234,
    },
  },
  sys: {
    context: null,
    log: {
      input: {
        message: 'test',
        structuredData: {
          a: 1,
          test: true,
        },
      },
      output: null,
    },
  },
  math: {
    context: null,
    abs: {
      input: -123,
      output: 123,
    },
    calc: {
      input: {
        op: '^',
        x: 2,
        y: 4,
      },
      output: 16,
    },
    identity: {
      input: 1,
      output: 1,
    },
    min: {
      input: [1, 2, 3],
      output: 1,
    },
    max: {
      input: [1, 2, 3],
      output: 3,
    },
    avg: {
      input: [1, 2, 3],
      output: 2,
    },
  },
  openai: {
    context: {
      apiKey: '',
    },
    createCompletion: {
      input: {
        prompt: '',
        model: '',
        max_tokens: 0,
        temperature: 0,
        top_p: 0,
        n: 0,
        echo: false,
      },
      output: {
        object: '',
        model: '',
        id: '',
        created: 0,
        choices: [],
      },
    },
    createImage: {
      input: {
        prompt: '',
        n: 0,
        size: '1024x1024',
      },
      output: [],
    },
    listModels: {
      input: 'davinci',
      output: [{ id: '', object: '', owned_by: '' }],
    },
  },
};
