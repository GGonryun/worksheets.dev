import { newMethod } from '@worksheets/apps/framework';
import { handleOpenAIError } from '../common';
import { z } from 'zod';
import { Configuration, OpenAIApi } from 'openai';
import { settings } from '../..';

const modelSchema = z.object({
  id: z.string(),
  object: z.string(),
  owned_by: z.string(),
  permission: z.unknown(),
});

export const modelsRead = newMethod({
  id: 'models.read',
  label: 'List models',
  description:
    'Lists the currently available models, and provides basic information about each one such as the owner and availability.',
  settings,
  input: z.string().optional().describe('model id'),
  output: z.union([z.array(modelSchema), modelSchema]),
  async call({ settings, input }) {
    const configuration = new Configuration({
      apiKey: settings.apiKey,
    });
    const openai = new OpenAIApi(configuration);

    try {
      if (input) {
        const response = await openai.retrieveModel(input);
        const model = response.data;
        console.info(`open-ai read a model`, model.id);
        return model;
      }

      const response = await openai.listModels();
      const models = response.data.data;
      console.info(`open-ai read models`, models.length);
      return models;
    } catch (error) {
      handleOpenAIError(error, 'failed to create image');
      throw error;
    }
  },
});
