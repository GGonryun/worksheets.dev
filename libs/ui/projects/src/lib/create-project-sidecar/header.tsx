import { Close } from '@mui/icons-material';
import { Typography, IconButton } from '@mui/material';
import { TinyLogo } from '@worksheets/ui-basic-style';
import { Flex } from '@worksheets/ui-core';
import { FC } from 'react';

export const SidecarHeader: FC<{ onClose: () => void; activeStep: number }> = ({
  activeStep,
  onClose,
}) => (
  <Flex column gap={1}>
    <Typography color="text.secondary" variant="h6">
      <Flex spaceBetween>
        <Flex gap={2}>
          <TinyLogo src="/icons/features/projects.svg" area={40} borderless />
          Create a project (Step {activeStep + 1} of 4)
        </Flex>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Flex>
    </Typography>
    <Typography variant="body2" color="text.secondary">
      Projects are containers for your Worksheets resources. You can share
      projects with your friends, or coworkers.
    </Typography>
  </Flex>
);
