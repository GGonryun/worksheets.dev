import { handlers } from '@worksheets/apps-handlers';
import {
  EndpointProviderBridgeByPath,
  EndpointProviderBridgesByPath,
} from '../framework';

const tenor: EndpointProviderBridgeByPath<'gifs.search.tenor'> = async ({
  context,
  input,
}) => {
  const response = await handlers.tenor.search({
    context,
    input,
  });

  return {
    gifs: response.results.map((d) => ({
      id: d.id,
      url: d.url,
      title: d.title || d.description,
    })),
  };
};

const giphy: EndpointProviderBridgeByPath<'gifs.search.giphy'> = async ({
  context,
  input,
}) => {
  const response = await handlers.giphy.search({
    context,
    input,
  });

  return {
    gifs: response.data.map((d) => ({
      id: d.id,
      url: d.url,
      title: d.title,
    })),
  };
};

export const search: EndpointProviderBridgesByPath<'gifs.search'> = {
  tenor,
  giphy,
};
