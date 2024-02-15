import { Diversity1, HelpCenter, Share } from '@mui/icons-material';
import { Box, Button, Divider, Link, Typography } from '@mui/material';
import { Description } from '@worksheets/ui/components/description';
import { prizeTypeLabel } from '@worksheets/ui/components/prizes';
import { HTMLinator } from '@worksheets/ui-core';
import { printShortDateTime } from '@worksheets/util/time';
import { DetailedRaffleSchema } from '@worksheets/util/types';

export const RaffleDescription: React.FC<{
  onShare: () => void;
  raffle: DetailedRaffleSchema;
}> = ({ raffle, onShare }) => (
  <Description
    title="About This Prize"
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
          href="/help/prizes"
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

const DetailsGrid: React.FC<{ raffle: DetailedRaffleSchema }> = ({
  raffle,
}) => {
  const isOver = raffle.expiresAt < Date.now();
  return (
    <Box>
      <Divider sx={{ backgroundColor: 'text.arcade' }} />
      <Box my={2} />
      <DetailPair
        label="Prize"
        value={raffle.name}
        href={`/prizes/${raffle.prizeId}`}
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
      <DetailPair label="Possible Winners" value={raffle.numWinners} />
      <DetailPair label="Retail Value" value={`$${raffle.monetaryValue} USD`} />
      <DetailPair label="Entry Fee" value={`${raffle.costPerEntry} Tokens`} />
      <DetailPair label="Prize Type" value={prizeTypeLabel[raffle.type]} />
      <Box my={2} />
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
