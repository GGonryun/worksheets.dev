import { Container } from '@mui/material';
import {
  GetApplicationDetailsResponse,
  ListApplicationMethodDetailsResponse,
} from '@worksheets/schemas-applications';
import React from 'react';
import { injectStyles } from '@stoplight/mosaic';
import { Flex } from '@worksheets/ui-core';
import { TableOfContents } from './table-of-contents';

import { ApiPanelHeader } from './api-panel-header';
import { MethodDetailsList } from './method-details-list';
import { useLayout } from '@worksheets/ui/common';

export const ApiPanel: React.FC<{
  app: GetApplicationDetailsResponse;
  methods: ListApplicationMethodDetailsResponse;
}> = ({ app, methods }) => {
  const { isMobile } = useLayout();

  injectStyles();

  return (
    <Flex alignItems="start" column p={3} gap={3}>
      <ApiPanelHeader app={app} methods={methods} />
      <Flex column={isMobile} gap={3} width="100%" alignItems="start">
        <TableOfContents app={app} methods={methods} />
        <Container
          disableGutters
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            p: 0,
            m: 0,
          }}
        >
          <MethodDetailsList methods={methods} />
        </Container>
      </Flex>
    </Flex>
  );
};
