import { handlers } from '@worksheets/apps-handlers';
import {
  EndpointProviderBridgeByPath,
  EndpointProviderBridgesByPath,
} from '../framework';

const jsonbin: EndpointProviderBridgeByPath<'crud.read.jsonbin'> = async ({
  context,
  input,
}) => {
  const result = await handlers.jsonbin.readBin({
    context,
    input: {
      binId: input.key,
    },
  });

  return {
    key: input.key,
    value: result.data,
    collection: result.metadata?.collectionId,
  };
};
export const read: EndpointProviderBridgesByPath<'crud.read'> = {
  jsonbin,
};
