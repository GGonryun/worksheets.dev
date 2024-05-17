import { AccessTime, Share } from '@mui/icons-material';
import { Box, Button, Divider, Typography } from '@mui/material';
import { ItemType } from '@prisma/client';
import { itemTypeLabel, itemTypeLogo } from '@worksheets/ui/components/items';
import {
  daysFromNow,
  durationToString,
  millisecondsAsDuration,
  printShortDateTime,
} from '@worksheets/util/time';
import { RaffleSchema } from '@worksheets/util/types';
import React from 'react';

import { SectionHeaderTypography } from '../section-header-typography';

export const RaffleInfo: React.FC<{
  raffle: RaffleSchema;
  onShare: () => void;
  raffleEntry: React.ReactNode;
}> = ({ raffle, raffleEntry, onShare }) => {
  const { expiresAt, type, status } = raffle;
  const soon = expiresAt < daysFromNow(1).getTime();
  const expired = expiresAt < Date.now();

  return (
    <Box
      height="100%"
      width="100%"
      position="relative"
      sx={{ display: 'grid', placeItems: 'center' }}
    >
      <Box
        height="95%"
        width="85%"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        gap={1}
      >
        <Box
          display={!expired ? 'block' : 'none'}
          position="absolute"
          right={8}
          top={8}
        >
          <Button variant="square" size="small" onClick={onShare}>
            <Share fontSize="small" />
          </Button>
        </Box>
        {/* displace the button height */}
        <Box py={2} />
        <Box>
          <SectionHeaderTypography>
            {status === 'PENDING'
              ? 'Raffle is not live yet'
              : expired
              ? 'Raffle Complete'
              : 'Raffle Ends In'}
          </SectionHeaderTypography>
          <Box display="flex" gap={1} alignItems="center" pt={0.5}>
            <AccessTime color={expired ? 'error' : 'action'} />
            <Typography
              typography="h6"
              color={
                expired ? 'error.main' : soon ? 'primary.main' : 'text.primary'
              }
            >
              {status === 'PENDING'
                ? 'PENDING'
                : expired
                ? printShortDateTime(expiresAt)
                : durationToString(
                    millisecondsAsDuration(expiresAt - Date.now())
                  )}
            </Typography>
          </Box>
        </Box>
        <Divider />
        <ItemTypeInfo type={type} />
        <Divider />
        {raffleEntry}
        <Box my={1.5} />
      </Box>
    </Box>
  );
};

const ItemTypeInfo: React.FC<{ type: ItemType }> = ({ type }) => {
  const Icon = itemTypeLogo[type];
  return (
    <Box>
      <SectionHeaderTypography>Prize Type</SectionHeaderTypography>
      <Box
        pt={0.5}
        display="flex"
        justifyContent="center"
        gap={1}
        alignItems="center"
      >
        <Icon fontSize="large" />
        <Typography variant="h6">{itemTypeLabel[type]}</Typography>
      </Box>
    </Box>
  );
};
