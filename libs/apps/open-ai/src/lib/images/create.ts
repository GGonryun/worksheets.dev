import { newMethod } from '@worksheets/apps/framework';
import { handleOpenAIError, settings } from '../common';
import { z } from 'zod';
import { Configuration, OpenAIApi } from 'openai';

export const imagesCreate = newMethod({
  id: 'create-image',
  label: 'Create Image',
  description: 'Creates an image given a prompt.',
  settings,
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
  async call({ settings, input }) {
    const configuration = new Configuration({
      apiKey: settings.apiKey,
    });

    const openai = new OpenAIApi(configuration);
    let response;
    try {
      response = await openai.createImage({
        ...input,
      });
    } catch (error) {
      handleOpenAIError(error, 'failed to create image');
      throw error;
    }

    console.info(`open-ai created an image`, response.data.data);
    return response.data.data;
  },
});
