import { Box, Paper, Typography } from '@mui/material';
import {
  GetApplicationDetailsResponse,
  ListApplicationMethodDetailsResponse,
} from '@worksheets/schemas-applications';
import { Flex } from '@worksheets/ui-core';
import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';
import { AnchoredTitle, LabeledMonoSpaceTextBox } from '@worksheets/ui/common';

export const ApiPanelHeader: React.FC<{
  app: GetApplicationDetailsResponse;
  methods: ListApplicationMethodDetailsResponse;
}> = ({ app, methods }) => (
  <Box>
    <Paper variant="outlined">
      <Flex column p={3} gap={1}>
        <AnchoredTitle variant="h4" text="API Overview" id={app.appId} />
        <Typography variant="body1" color="text.secondary">
          {app.description}
        </Typography>
        <Flex column gap={1} pt={2}>
          <LabeledMonoSpaceTextBox
            title="Base URL"
            code={SERVER_SETTINGS.WEBSITES.API_URL('/v1')}
            allowCopy
          />
          <LabeledMonoSpaceTextBox
            title="Headers"
            allowCopy
            code={`Authorization: Bearer <WORKSHEETS_API_KEY>\nContent-Type: application/json`}
          />
          <LabeledMonoSpaceTextBox
            title="Endpoints"
            code={methods
              .map((m) => `/call/${m.appId}/${m.methodId}`)
              .join('\n')}
          />
        </Flex>
      </Flex>
    </Paper>
  </Box>
);