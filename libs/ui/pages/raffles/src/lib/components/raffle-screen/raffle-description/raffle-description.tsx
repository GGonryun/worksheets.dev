import { Diversity1, HelpCenter, Share } from '@mui/icons-material';
import { Box, Button, Divider, Link, Typography } from '@mui/material';
import { routes } from '@worksheets/routes';
import { Description } from '@worksheets/ui/components/description';
import { ResponsiveImage } from '@worksheets/ui/components/images';
import { prizeTypeLabel } from '@worksheets/ui/components/prizes';
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
    bonus={<SponsoredBy sponsor={raffle.sponsor} />}
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
      <Box display="flex" flexDirection="column" gap={2}>
        <Divider sx={{ backgroundColor: 'text.arcade' }} />
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
            <DetailPair
              label="Prize"
              value={raffle.name}
              href={routes.prize.path({ params: { prizeId: raffle.prizeId } })}
            />
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
            <DetailPair
              label="Prize Type"
              value={prizeTypeLabel[raffle.type]}
            />
          </Box>
          <Box
            sx={{
              flexGrow: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              position="relative"
              height={128}
              component="a"
              href={raffle.sponsor.url}
              sx={{
                aspectRatio: '1/1',
              }}
            >
              <ResponsiveImage
                src={raffle.sponsor.logo}
                alt={`${raffle.sponsor.name} logo`}
              />
            </Box>
          </Box>
        </Box>
        <Divider sx={{ backgroundColor: 'text.arcade' }} />
      </Box>
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

const SponsoredBy: React.FC<{ sponsor: RaffleSchema['sponsor'] }> = ({
  sponsor,
}) => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="center"
    gap={1}
    px={{ xs: 1, sm: 2.5, md: 4 }}
  >
    <Box
      position="relative"
      height={52}
      sx={{
        aspectRatio: '1/1',
      }}
    >
      <ResponsiveImage src={sponsor.logo} alt={`${sponsor.name} logo`} />
    </Box>
    <Box>
      <Typography textAlign="left" typography="body3">
        Sponsored By:
      </Typography>
      <Typography textAlign="left" typography="body2">
        <b>{sponsor.name}</b>
      </Typography>
    </Box>
  </Box>
);
