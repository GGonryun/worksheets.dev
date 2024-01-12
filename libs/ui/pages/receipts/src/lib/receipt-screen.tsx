import { ArrowRight, FavoriteBorder } from '@mui/icons-material';
import { Box, Button, Container, Link, Paper, Typography } from '@mui/material';
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
        }}
      >
        <Box>
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: '2rem', sm: '3rem' },
            }}
          >
            Previous Donations
          </Typography>
        </Box>
        <Typography variant="body2" mt={1}>
          All of our donations are made directly to the named charity
          organization. We do not take any fees. Please see our{' '}
          <Link href="/faq">frequently asked questions</Link> for more
          information about how donations are handled. Thank you for your
          support!
          <br />
          <br />
          Wan't to help? <Link href="/help">Become a volunteer</Link>.
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
        }}
      >
        <Button
          variant="contained"
          color="error"
          size="small"
          startIcon={<FavoriteBorder />}
          endIcon={<FavoriteBorder />}
          href="/help"
          sx={{
            borderRadius: 4,
            px: { xs: 2, sm: 4 },
            width: { xs: '100%', sm: 'fit-content' },
          }}
        >
          <Typography>How to help</Typography>
        </Button>
        <Button
          variant="outlined"
          color="error"
          size="small"
          endIcon={<ArrowRight sx={{ ml: -0.5 }} />}
          href={'/charity'}
          sx={{
            borderRadius: 4,
            px: { xs: 2, sm: 4 },
            width: { xs: '100%', sm: 'fit-content' },
          }}
        >
          <Typography>See Current Campaign</Typography>
        </Button>
      </Paper>
    </Container>
  );
};
