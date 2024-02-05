import { Diversity1, HelpCenter, Share } from '@mui/icons-material';
import { Box, Button, Divider, Link, Typography } from '@mui/material';
import { Description } from '@worksheets/ui/components/description';
import { prizeTypeLabel } from '@worksheets/ui/components/prizes';
import { HTMLinator } from '@worksheets/ui-core';
import { printShortDateTime } from '@worksheets/util/time';
import { PrizeSchema } from '@worksheets/util/types';

export const PrizeDescription: React.FC<{
  onShare: () => void;
  prize: PrizeSchema;
}> = ({ prize, onShare }) => (
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
          href={prize.sponsor.url}
          target="_blank"
          startIcon={<Diversity1 />}
        >
          Sponsor
        </Button>
        <Button
          size="small"
          variant="arcade"
          color="warning"
          href="/help/prize-wall"
          startIcon={<HelpCenter />}
        >
          Get Help
        </Button>
      </Box>
    }
    description={
      <Box display="flex" flexDirection="column" gap={{ xs: 3, sm: 4 }}>
        <DetailsGrid prize={prize} />

        <HTMLinator text={prize.description} />
      </Box>
    }
  />
);

const DetailsGrid: React.FC<{ prize: PrizeSchema }> = ({ prize }) => {
  const isOver = prize.expires < Date.now();
  return (
    <Box>
      <Divider sx={{ backgroundColor: 'text.arcade' }} />
      <Box my={2} />
      <DetailPair
        label="Sponsor"
        value={prize.sponsor.name}
        href={prize.sponsor.url}
        target="_blank"
      />
      <DetailPair
        label={isOver ? 'Ended On' : 'Ends On'}
        value={printShortDateTime(prize.expires)}
      />
      <DetailPair label="Winners" value={prize.winners} />
      <DetailPair label="Retail Value" value={`$${prize.value} USD`} />
      <DetailPair label="Entry Fee" value={`${prize.cost} Tokens`} />
      <DetailPair label="Prize Type" value={prizeTypeLabel[prize.type]} />
      <DetailPair
        label="Prize ID"
        value={prize.id}
        href={`/prizes/${prize.id}`}
      />
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
