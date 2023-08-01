import { z } from '@worksheets/zod';
import { modelSchema } from './schemas';
import { newApp, newMethod } from '@worksheets/apps-core';

export const openai = newApp({
  appId: 'openai',
  context: z.object({
    apiKey: z.string(),
  }),
  methods: {
    createCompletion: newMethod({
      appId: 'openai',
      methodId: 'createCompletion',
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
      appId: 'openai',
      methodId: 'createImage',
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
      appId: 'openai',
      methodId: 'listModels',

      input: z.string().optional().describe('model id'),
      output: z.union([z.array(modelSchema), modelSchema]),
    }),
  },
});
