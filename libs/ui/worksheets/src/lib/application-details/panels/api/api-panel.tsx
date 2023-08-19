import {
  Box,
  Container,
  Divider,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  GetApplicationDetailsResponse,
  ListApplicationMethodDetailsResponse,
} from '@worksheets/schemas-applications';
import React from 'react';
import { injectStyles } from '@stoplight/mosaic';
import { Flex } from '@worksheets/ui/common';
import { JsonSchemaViewer } from '@stoplight/json-schema-viewer';

import { TinyToggle } from '../../../shared/tiny-toggle';
import { TableOfContents } from './table-of-contents';
import { AnchoredTitle } from '../../../shared/anchored-title';

import { MonoSpaceTextBox } from './mono-space-text-box';
import { ApiPanelHeader } from './api-panel-header';
import { ApplicationMethodItem } from '../../../shared/types';
import { CodeSamplesSection } from './code-samples-section';
import { MethodDetailsList } from './method-details-list';

export const ApiPanel: React.FC<{
  app: GetApplicationDetailsResponse;
  methods: ListApplicationMethodDetailsResponse;
}> = ({ app, methods }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  injectStyles();

  return (
    <Flex alignItems="start" column>
      <ApiPanelHeader app={app} methods={methods} />
      <Flex column={isMobile} px={3} gap={3} width="100%" alignItems="start">
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
