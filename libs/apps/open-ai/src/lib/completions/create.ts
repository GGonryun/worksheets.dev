import { Configuration, OpenAIApi } from 'openai';
import { newMethod, newTokenSetting } from '@worksheets/apps/framework';
import { z } from 'zod';
import { handleOpenAIError } from '../common';

const key = newTokenSetting({
  required: true,
});

export const completionsCreate = newMethod({
  path: 'openai.completions.create',
  label: 'Create completion',
  description: 'Creates a completion for the provided prompt and parameters.',
  settings: { key },
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
  async call({ settings, input }) {
    const configuration = new Configuration({
      apiKey: settings.key,
    });

    const openai = new OpenAIApi(configuration);
    try {
      const response = await openai.createCompletion({
        ...input,
      });

      console.info(`open-ai created a completion`, response.data.id);

      return response.data;
    } catch (error) {
      handleOpenAIError(error, 'failed to create image');
      throw error;
    }
  },
});
