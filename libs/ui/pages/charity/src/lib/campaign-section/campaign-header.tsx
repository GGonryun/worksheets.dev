import { Box, Typography } from '@mui/material';
import { MarkdownText } from '@worksheets/ui-core';
import { FC } from 'react';

export const CampaignHeader: FC<{ caption: MarkdownText }> = ({ caption }) => (
  <>
    <Box display="flex" gap={{ xs: 0.5, sm: 1 }} alignItems="flex-start">
      <Typography
        variant="h4"
        color="text.arcade"
        sx={{
          fontSize: { xs: '1.5rem', sm: '2rem' },
        }}
      >
        Current Campaign
      </Typography>
    </Box>
    <Typography variant="body2" textAlign="center" color="text.arcade">
      {caption}
    </Typography>
  </>
);
