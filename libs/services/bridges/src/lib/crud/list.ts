import { handlers } from '@worksheets/apps-handlers';
import {
  EndpointProviderBridgeByPath,
  EndpointProviderBridgesByPath,
} from '../framework';

const jsonbin: EndpointProviderBridgeByPath<'crud.list.jsonbin'> = async ({
  context,
  input,
}) => {
  const result = await handlers.jsonbin.listBins({
    context,
    input: {
      collectionId: input.collection,
    },
  });

  const data: { collection?: string; key: string; value: object }[] = [];

  for (const bin of result.bins) {
    // for each bin in bins, get the bin data.
    const value = await handlers.jsonbin.readBin({
      context,
      input: {
        binId: bin.binId,
      },
    });

    data.push({
      collection: input.collection ?? '',
      key: bin.binId,
      value: value.data,
    });
  }

  return data;
};

export const list: EndpointProviderBridgesByPath<'crud.list'> = {
  jsonbin,
};
