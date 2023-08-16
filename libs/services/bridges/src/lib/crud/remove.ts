import { handlers } from '@worksheets/apps-handlers';
import {
  EndpointProviderBridgeByPath,
  EndpointProviderBridgesByPath,
} from '../framework';

const jsonbin: EndpointProviderBridgeByPath<'crud.delete.jsonbin'> = async ({
  context,
  input,
}) => {
  const result = await handlers.jsonbin.deleteBin({
    context,
    input: {
      binId: input.key,
    },
  });

  return {
    success: result.metadata?.versionsDeleted != null,
    message: result.message,
  };
};

export const remove: EndpointProviderBridgesByPath<'crud.delete'> = {
  jsonbin,
};
