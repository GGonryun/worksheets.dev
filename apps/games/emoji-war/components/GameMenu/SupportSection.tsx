import { HelpOutline, OpenInNewRounded } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { TinyButton } from '@worksheets/ui-basic-style';
import { Flex } from '@worksheets/ui-core';
import { FC } from 'react';
import { urls } from '../urls';

export const SupportSection: FC<{
  onShowInstructions: () => void;
}> = ({ onShowInstructions }) => (
  <Flex gap={2} fullWidth>
    <TinyButton
      onClick={onShowInstructions}
      fullWidth
      variant="contained"
      color="secondary"
      startIcon={<HelpOutline />}
    >
      <Typography variant="caption">How to play</Typography>
    </TinyButton>
    <TinyButton
      href={urls.contact()}
      target="_blank"
      fullWidth
      color="inherit"
      variant="outlined"
      endIcon={<OpenInNewRounded />}
    >
      <Typography variant="caption">Contact Us</Typography>
    </TinyButton>
  </Flex>
);