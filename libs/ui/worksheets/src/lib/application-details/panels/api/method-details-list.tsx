import { Flex } from '@worksheets/ui/common';
import { Provider as MosaicProvider } from '@stoplight/mosaic';
import { ListApplicationMethodDetailsResponse } from '@worksheets/schemas-applications';
import { MethodDetailsListItem } from './method-details-list-item/method-details-list-item';

export const MethodDetailsList: React.FC<{
  methods: ListApplicationMethodDetailsResponse;
}> = ({ methods }) => (
  <MosaicProvider>
    <Flex column gap={2} width="100%">
      {methods.map((m) => (
        <MethodDetailsListItem key={m.methodId} method={m} />
      ))}
    </Flex>
  </MosaicProvider>
);
