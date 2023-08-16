import { handlers } from '@worksheets/apps-handlers';
import {
  EndpointProviderBridgeByPath,
  EndpointProviderBridgesByPath,
} from '../framework';

const jsonbin: EndpointProviderBridgeByPath<'crud.update.jsonbin'> = async ({
  context,
  input,
}) => {
  const result = await handlers.jsonbin.updateBin({
    context,
    input: {
      binId: input.key,
      data: input.value,
    },
  });

  console.log('TODO: validate crud.update.jsonbin result', result);

  return {
    collection: result.metadata?.collectionId,
    key: result.metadata?.id ?? input.key,
    value: result.data,
  };
};

export const update: EndpointProviderBridgesByPath<'crud.update'> = {
  jsonbin,
};
