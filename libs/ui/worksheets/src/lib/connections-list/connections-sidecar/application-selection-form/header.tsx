import { Close } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';
import { TinyLogo } from '@worksheets/ui-basic-style';
import { Flex } from '@worksheets/ui-core';
import { useLayout } from '@worksheets/ui/common';
import { FC } from 'react';

export const ApplicationSelectionFormHeader: FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  const { isMobile } = useLayout();
  return (
    <Flex column gap={0.5}>
      <Flex spaceBetween fullWidth>
        <Flex gap={1}>
          <TinyLogo
            src="/icons/features/applications.svg"
            label="Applications"
            borderless
            area={32}
          />
          <Typography variant={isMobile ? 'h5' : 'h4'} fontWeight={900}>
            Pick an application
          </Typography>
        </Flex>
        <IconButton size="small" onClick={onClose} sx={{ p: 0.25, m: 0 }}>
          <Close fontSize={isMobile ? 'small' : 'large'} />
        </IconButton>
      </Flex>
      <Typography variant="body2" color="text.secondary">
        Applications are the building blocks for your worksheets. Select an
        application to create a connection.
      </Typography>
    </Flex>
  );
};
