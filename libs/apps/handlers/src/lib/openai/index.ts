import { Configuration, OpenAIApi } from 'openai';
import { handleOpenAIError } from './util';
import { ApplicationExecutors, ApplicationMethodExecutor } from '../framework';

export const createCompletion: ApplicationMethodExecutor<
  'openai',
  'createCompletion'
> = async ({ context: { apiKey }, input }) => {
  const configuration = new Configuration({
    apiKey,
  });

  const openai = new OpenAIApi(configuration);
  try {
    const response = await openai.createCompletion({
      ...input,
    });

    return response.data;
  } catch (error) {
    throw handleOpenAIError(error);
  }
};

export const createImage: ApplicationMethodExecutor<
  'openai',
  'createImage'
> = async ({ context: { apiKey }, input }) => {
  const configuration = new Configuration({
    apiKey,
  });

  const openai = new OpenAIApi(configuration);
  let response;
  try {
    response = await openai.createImage({
      ...input,
    });
  } catch (error) {
    throw handleOpenAIError(error);
  }

  return response.data.data;
};

export const listModels: ApplicationMethodExecutor<
  'openai',
  'listModels'
> = async ({ context: { apiKey }, input }) => {
  const configuration = new Configuration({
    apiKey,
  });
  const openai = new OpenAIApi(configuration);

  try {
    if (input) {
      const response = await openai.retrieveModel(input);
      return response.data;
    }

    const response = await openai.listModels();
    return response.data.data;
  } catch (error) {
    throw handleOpenAIError(error);
  }
};

export const openai: ApplicationExecutors<'openai'> = {
  createCompletion,
  createImage,
  listModels,
};
