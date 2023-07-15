import { ApplicationSampleMask } from '@worksheets/apps-registry';

export const sampleData: ApplicationSampleMask = {
  time: {
    now: {
      context: null,
      input: {
        timeZone: 'PST',
      },
      output: Date.now(),
    },
  },
  openai: {
    createCompletion: {
      context: {
        apiKey: '',
      },
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
      context: {
        apiKey: '',
      },
      input: {
        prompt: '',
        n: 0,
        size: '1024x1024',
      },
      output: [],
    },
    listModels: {
      context: {
        apiKey: '',
      },
      input: undefined,
      output: [],
    },
  },
  sys: {
    log: {
      context: null,
      input: {
        message: 'Log accepts any json input, even strings',
      },
      output: null,
    },
  },
  math: {
    calc: {
      context: null,
      input: {
        op: '+',
        x: 1,
        y: 2,
      },
      output: 3,
    },
    identity: {
      context: null,
      input: 1,
      output: 1,
    },
    min: {
      context: null,
      input: [1, 2, 3, 4],
      output: 1,
    },
    max: {
      context: null,
      input: [1, 2, 3, 4],
      output: 2,
    },
    abs: {
      context: null,
      input: -3,
      output: 3,
    },
    avg: {
      context: null,
      input: [1, 2, 3, 4],
      output: 2.5,
    },
  },
};

export default sampleData;
