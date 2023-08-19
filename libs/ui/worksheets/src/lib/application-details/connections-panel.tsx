import { Container } from '@mui/material';
import {
  GetApplicationDetailsResponse,
  ListApplicationMethodDetailsResponse,
} from '@worksheets/schemas-applications';
import React from 'react';

export const ConnectionsPanel: React.FC<{
  app: GetApplicationDetailsResponse;
  methods: ListApplicationMethodDetailsResponse;
}> = ({ app, methods }) => (
  <Container
    maxWidth="lg"
    disableGutters
    sx={{
      margin: 0,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: 3,
      p: 3,
    }}
  >
    Hi Mom! Connections
  </Container>
);
