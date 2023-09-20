import { Flex } from '@worksheets/ui-core';
import { UnderConstructionNotice } from '@worksheets/ui/common';
import { FC } from 'react';

export const PlaceholderPage: FC = () => {
  return (
    <Flex fill centered>
      <UnderConstructionNotice />
    </Flex>
  );
};
