import { z } from '@worksheets/zod';
import { newApp, newMethod } from '../../framework';
import { modelSchema } from './schemas';

export const openai = newApp(
  {
    appId: 'openai',
    logo: 'https://storage.googleapis.com/worksheets-test-app-logos/openai-svgrepo-com.svg',
    label: 'Open AI',
    description:
      "The OpenAI API uses API keys for authentication. Visit your API Keys page to retrieve the API key you'll use in your requests.",
    context: z.object({
      apiKey: z.string(),
    }),
  },
  {
    createCompletion: newMethod({
      label: 'Create completion',
      description:
        'Creates a completion for the provided prompt and parameters.',
      input: z.object({
        prompt: z.string(),
        model: z.string().default('text-davinci-003'),
        max_tokens: z.number().default(16),
        temperature: z.number().default(1),
        top_p: z.number().default(1),
        n: z.number().default(1),
        echo: z.boolean().default(false),
      }),
      output: z.object({
        id: z.string(),
        object: z.string(),
        created: z.number(),
        model: z.string(),
        choices: z.array(
          z.object({
            text: z.string().optional(),
            index: z.number().optional(),
            logprobs: z.unknown(),
            finish_reason: z.string().optional(),
          })
        ),
        usage: z
          .object({
            prompt_tokens: z.number(),
            completion_tokens: z.number(),
            total_tokens: z.number(),
          })
          .optional(),
      }),
    }),
    createImage: newMethod({
      label: 'Create Image',
      description: 'Creates an image given a prompt.',
      input: z.object({
        prompt: z.string().describe('prompt to draw'),
        n: z.number().default(1),
        size: z
          .union([
            z.literal('1024x1024'),
            z.literal('512x512'),
            z.literal('256x256'),
          ])
          .default('1024x1024'),
      }),
      output: z.array(z.object({ url: z.string().optional() })),
    }),
    listModels: newMethod({
      label: 'List models',
      description:
        'Lists the currently available models, and provides basic information about each one such as the owner and availability.',
      input: z.string().optional().describe('model id'),
      output: z.union([z.array(modelSchema), modelSchema]),
    }),
  }
);
