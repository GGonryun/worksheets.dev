import { newMethod } from '@worksheets/apps/framework';
import { apikey, handleOpenAIError } from '../common';
import { z } from 'zod';
import { Configuration, OpenAIApi } from 'openai';

const modelSchema = z.object({
  id: z.string(),
  object: z.string(),
  owned_by: z.string(),
  permission: z.unknown(),
});

export const modelsRead = newMethod({
  path: 'openai.models.read',
  label: 'List models',
  description:
    'Lists the currently available models, and provides basic information about each one such as the owner and availability.',
  settings: { apikey },
  input: z.string().optional().describe('model id'),
  output: z.union([z.array(modelSchema), modelSchema]),
  async call({ settings, input }) {
    const configuration = new Configuration({
      apiKey: settings.apikey,
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