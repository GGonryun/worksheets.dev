import { HelpCenter, Share } from '@mui/icons-material';
import { Box, Button, Divider, Link, Typography } from '@mui/material';
import { Description } from '@worksheets/ui/components/description';
import { prizeTypeLabel } from '@worksheets/ui/components/prizes';
import { HTMLinator } from '@worksheets/ui-core';
import { DetailedPrizeSchema } from '@worksheets/util/types';

export const PrizeDescription: React.FC<{
  onShare: () => void;
  prize: DetailedPrizeSchema;
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
          color="warning"
          href="/help/prizes"
          startIcon={<HelpCenter />}
        >
          Get Help
        </Button>
      </Box>
    }
    description={
      <Box
        display="flex"
        flexDirection="column"
        gap={{ xs: 3, sm: 4 }}
        textAlign="left"
      >
        <DetailsGrid prize={prize} />
        <HTMLinator text={prize.description} />
      </Box>
    }
  />
);

const DetailsGrid: React.FC<{ prize: DetailedPrizeSchema }> = ({ prize }) => {
  return (
    <Box>
      <Divider sx={{ backgroundColor: 'text.arcade' }} />
      <Box my={2} />
      <DetailPair
        label="Prize"
        value={prize.name}
        href={`/prizes/${prize.id}`}
      />

      <DetailPair label="Raffles" value={prize.numRaffles} />
      <DetailPair label="Retail Value" value={`$${prize.monetaryValue} USD`} />
      <DetailPair label="Prize Type" value={prizeTypeLabel[prize.type]} />
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
