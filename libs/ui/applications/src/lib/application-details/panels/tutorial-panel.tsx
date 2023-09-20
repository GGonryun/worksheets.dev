import { Box, Paper } from '@mui/material';
import { GetApplicationDetailsResponse } from '@worksheets/schemas-applications';
import { MissingFeatureNotice, urls } from '@worksheets/ui/common';
import React from 'react';

export const TutorialPanel: React.FC<{
  app: GetApplicationDetailsResponse;
}> = ({ app }) => (
  <Box display="flex" justifyContent="center" width="100%" p={3}>
    <Paper variant="outlined">
      <Box p={3}>
        <MissingFeatureNotice
          avatarId={0}
          feature={`a tutorial for our ${app.title} integration`}
          link={{
            text: `Read frequently asked questions`,
            href: urls.app.application(app.appId),
          }}
        />
      </Box>
    </Paper>
  </Box>
);
