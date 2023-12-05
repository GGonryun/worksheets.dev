import { Box, Typography } from '@mui/material';
import { MarkdownText, Markdown } from '@worksheets/ui-core';
import { LevelBanner } from '@worksheets/ui/icons';
import { FC } from 'react';

export const CampaignHeader: FC<{ caption: MarkdownText }> = ({ caption }) => (
  <>
    <Box display="flex" gap={{ xs: 0.5, sm: 1 }} alignItems="flex-start">
      <LevelBanner
        sx={{
          fontSize: { xs: '1.5rem', sm: '2rem' },
        }}
      />
      <Typography
        variant="h4"
        sx={{
          fontSize: { xs: '1.5rem', sm: '2rem' },
        }}
      >
        Current Campaign
      </Typography>
      <LevelBanner
        sx={{
          fontSize: { xs: '1.5rem', sm: '2rem' },
        }}
      />
    </Box>
    <Typography variant="body2" textAlign="center">
      <Markdown text={caption} />
    </Typography>
  </>
);
