import { Diversity1, HelpCenter, Share } from '@mui/icons-material';
import { Box, Button, Divider, Link, Typography } from '@mui/material';
import { routes } from '@worksheets/routes';
import { Description } from '@worksheets/ui/components/description';
import { HTMLinator } from '@worksheets/ui-core';
import { printShortDateTime } from '@worksheets/util/time';
import { RaffleSchema } from '@worksheets/util/types';
import React from 'react';

export const RaffleDescription: React.FC<{
  onShare: () => void;
  raffle: RaffleSchema;
}> = ({ raffle, onShare }) => (
  <Description
    title={'About This Raffle'}
    ancillary={
      <Box
        width={{ xs: '100%', sm: 'auto' }}
        display="flex"
        gap={{ xs: 2, sm: 1.5 }}
        flexDirection={{ xs: 'column', sm: 'row' }}
      >
        <Button
          size="small"
          variant="arcade"
          color="secondary"
          startIcon={<Share />}
          onClick={onShare}
        >
          Share
        </Button>
        <Button
          size="small"
          variant="arcade"
          color="success"
          href={raffle.sponsor.url}
          target="_blank"
          startIcon={<Diversity1 />}
        >
          Sponsor
        </Button>
        <Button
          size="small"
          variant="arcade"
          color="warning"
          href={routes.help.prizes.path()}
          startIcon={<HelpCenter />}
        >
          Get Help
        </Button>
      </Box>
    }
    description={
      <Box display="flex" flexDirection="column" gap={{ xs: 3, sm: 4 }}>
        <DetailsGrid raffle={raffle} />

        <HTMLinator text={raffle.description} />
      </Box>
    }
  />
);

const DetailsGrid: React.FC<{ raffle: RaffleSchema }> = ({ raffle }) => {
  const isOver = raffle.expiresAt < Date.now();
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'initial', sm: 'center' },
          width: '100%',
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
          }}
        >
          <DetailPair label="Prize" value={raffle.name} />
          <DetailPair
            label="Sponsor"
            value={raffle.sponsor.name}
            href={raffle.sponsor.url}
            target="_blank"
          />
          <DetailPair
            label={isOver ? 'Ended On' : 'Ends On'}
            value={printShortDateTime(raffle.expiresAt)}
          />
          <DetailPair label="Winners" value={raffle.numWinners} />
          <DetailPair label="Item ID" value={raffle.itemId} />
        </Box>
      </Box>
      <Divider sx={{ backgroundColor: 'text.arcade' }} />
    </Box>
  );
};

const DetailPair: React.FC<{
  label: string;
  value: string | number;
  href?: string;
  target?: string;
}> = ({ label, value, href, target }) => {
  return (
    <Box display="grid" gridTemplateColumns={'130px 1fr'} my={0.5}>
      <Typography typography="body2" fontWeight="bold">
        {label}
      </Typography>
      <Typography
        component={Link}
        typography="body2"
        href={href}
        target={target}
        sx={{
          color: 'inherit',
          textDecoration: href ? 'underline' : 'none',
        }}
      >
        {value}
      </Typography>
    </Box>
  );
};
