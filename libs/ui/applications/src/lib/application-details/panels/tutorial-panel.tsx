import { Box, Paper } from '@mui/material';
import { GetApplicationDetailsResponse } from '@worksheets/schemas-applications';
import { MissingFeatureNotice } from '@worksheets/ui/common';
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
            href: `/applications/${app.appId}`,
          }}
        />
      </Box>
    </Paper>
  </Box>
);
