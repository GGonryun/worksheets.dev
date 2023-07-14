import {
  ApplicationMethodHandler,
  ApplicationMethodHandlers,
} from '@worksheets/apps-registry';
import { Configuration, OpenAIApi } from 'openai';
import { handleOpenAIError } from './util';

const createCompletion: ApplicationMethodHandler<
  'openai',
  'createCompletion'
> = async ({ context, input }) => {
  const configuration = new Configuration({
    apiKey: context.apiKey,
  });

  const openai = new OpenAIApi(configuration);
  const response = await openai.createCompletion({
    ...input,
  });

  console.info(`open-ai created a completion`, response.data.id);

  return response.data;
};

const createImage: ApplicationMethodHandler<'openai', 'createImage'> = async ({
  context,
  input,
}) => {
  const configuration = new Configuration({
    apiKey: context.apiKey,
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
};

const listModels: ApplicationMethodHandler<'openai', 'listModels'> = async ({
  context: { apiKey },
  input,
}) => {
  const configuration = new Configuration({
    apiKey,
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
};

export const openai: ApplicationMethodHandlers<'openai'> = {
  createCompletion,
  createImage,
  listModels,
};
