import { ApplicationMetadata } from '../framework';

export const openai: ApplicationMetadata<'openai'> = {
  enabled: true,
  tutorialUrl: '',
  logo: 'https://storage.googleapis.com/worksheets-test-app-logos/openai-svgrepo-com.svg',
  title: 'Open AI',
  subtitle:
    "The OpenAI API uses API keys for authentication. Visit your API Keys page to retrieve the API key you'll use in your requests.",
  categories: ['artificial-intelligence', 'images'],
  tags: ['paid'],
  faq: [['TODO', 'TODO']],
  description:
    'OpenAI has trained cutting-edge language models that are very good at understanding and generating text. Our API provides access to these models and can be used to solve virtually any task that involves processing language.\n\nThe OpenAI API can be applied to virtually any task that requires understanding or generating natural language and code. The OpenAI API can also be used to generate and edit images or convert speech into text. We offer a range of models with different capabilities and price points, as well as the ability to fine-tune custom models.',
  creator: 'Worksheets.dev',
  lastUpdated: 1690615559053,
  methods: {
    createChatCompletion: {
      title: 'Create Chat Completion',
      description:
        'Creates a completion for the provided prompt and parameters.',
      pricing: 0.001,
      sourceUrl: 'https://platform.openai.com/docs/api-reference/chat/create',
    },
    createImage: {
      title: 'Create Image',
      description: 'Creates an image given a prompt.',
      pricing: 0.001,
      sourceUrl: 'https://platform.openai.com/docs/api-reference/images/create',
    },
    listModels: {
      title: 'List Models',
      description:
        'Lists the currently available models, and provides basic information about each one such as the owner and availability.',
      pricing: 0.001,
      sourceUrl: 'https://platform.openai.com/docs/api-reference/models/list',
    },
  },
};
