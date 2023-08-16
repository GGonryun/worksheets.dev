import { handlers } from '@worksheets/apps-handlers';
import {
  EndpointProviderBridgeByPath,
  EndpointProviderBridgesByPath,
} from '../framework';
import { TRPCError } from '@trpc/server';

const jsonbin: EndpointProviderBridgeByPath<'crud.create.jsonbin'> = async ({
  context,
  input,
}) => {
  const result = await handlers.jsonbin.createBin({
    context,
    input: {
      data: input.value,
      private: input.overrides?.private,
      name: input.overrides?.name,
      collectionId: input.collection,
    },
  });

  if (!result.metadata?.id)
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'No bin id returned',
    });

  return {
    key: result.metadata.id,
  };
};

export const create: EndpointProviderBridgesByPath<'crud.create'> = {
  jsonbin,
};
