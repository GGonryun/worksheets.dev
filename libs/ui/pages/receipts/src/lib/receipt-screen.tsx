import { ArrowRight, FavoriteBorder } from '@mui/icons-material';
import { Button, Container, Link, Paper, Typography } from '@mui/material';
import { FC } from 'react';

import { ReceiptTable, ReceiptTableProps } from './receipt-table';

export type ReceiptScreenProps = {
  rows: ReceiptTableProps['rows'];
};

export const ReceiptScreen: FC<ReceiptScreenProps> = ({ rows }) => {
  return (
    <Container
      maxWidth="lg"
      sx={{ py: 2, display: 'flex', gap: 2, flexDirection: 'column' }}
    >
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 4,
          p: { xs: 2, sm: 4 },
          color: 'text.arcade',
          backgroundColor: 'background.solid-blue',
        }}
      >
        <Typography typography={{ xs: 'h4', sm: 'h3' }}>
          Previous Donations
        </Typography>
        <Typography variant="body2" mt={1}>
          All of our donations are made directly to the named charity
          organization. We do not take any fees. Please see our{' '}
          <Link color="inherit" href="/faq">
            frequently asked questions
          </Link>{' '}
          for more information about how donations are handled. Thank you for
          your support!
          <br />
          <br />
          Wan't to help?{' '}
          <Link color="inherit" href="/help">
            Become a volunteer
          </Link>
          .
        </Typography>
      </Paper>
      <ReceiptTable rows={rows} />
      <Paper
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          borderRadius: 4,
          gap: 2,
          p: { xs: 2, sm: 2 },
          color: 'text.arcade',
          backgroundColor: 'background.solid-blue',
        }}
      >
        <Button
          variant="arcade"
          color="warning"
          size="small"
          startIcon={<FavoriteBorder />}
          endIcon={<FavoriteBorder />}
          href="/help"
        >
          How to Help
        </Button>
        <Button
          variant="arcade"
          color="secondary"
          size="small"
          endIcon={<ArrowRight sx={{ ml: -0.5 }} />}
          href={'/charity'}
        >
          See Current Campaign
        </Button>
      </Paper>
    </Container>
  );
};
