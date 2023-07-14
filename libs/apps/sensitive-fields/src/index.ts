import { ApplicationDataMask } from '@worksheets/apps-registry';

const mask: ApplicationDataMask<boolean> = {
  openai: {
    createCompletion: {
      context: {
        apiKey: true,
      },
    },
    createImage: {
      context: {
        apiKey: true,
      },
    },
    listModels: {
      context: {
        apiKey: true,
      },
    },
  },
};

export default mask;
