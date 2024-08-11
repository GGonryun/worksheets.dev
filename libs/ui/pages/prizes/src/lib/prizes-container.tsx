import { CardGiftcardOutlined, PlayCircleOutline } from '@mui/icons-material';
import { Button, Container, Paper, Typography } from '@mui/material';
import { routes } from '@worksheets/routes';
import { trpc } from '@worksheets/trpc-charity';
import { HorizontalAdvertisement } from '@worksheets/ui/components/advertisements';
import { Column, Row } from '@worksheets/ui/components/flex';
import { ErrorScreen } from '@worksheets/ui/pages/errors';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import React from 'react';

import { EmptyPrizeList } from './empty-prizes-list';
import { FrequentlyAskedQuestions } from './frequently-asked-questions';
import { PrizeHistory } from './prize-history';
import { PrizeList } from './prize-list';
import { ResetNotice } from './reset-notice';

export const PrizesContainer: React.FC = () => {
  const prizes = trpc.maybe.prizes.list.useQuery();
  const history = trpc.maybe.prizes.history.useQuery();

  if (prizes.isLoading || history.isLoading) {
    return <LoadingScreen />;
  }

  if (prizes.isError || history.isError) {
    return <ErrorScreen />;
  }

  return (
    <Container
      maxWidth="md"
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 2, sm: 4 },
      }}
    >
      <Column gap={0} textAlign="center" color="text.arcade">
        <Typography typography={{ xs: 'h3', sm: 'h2' }}>Prize Wall</Typography>
        <Typography textAlign="center" fontWeight={700} gutterBottom>
          Win digital prizes by playing games and completing challenges
        </Typography>
      </Column>
      <Row
        sx={{
          alignSelf: 'center',
          gap: 2,
          flexWrap: 'wrap',
          '& > a': {
            width: { xs: '100%', sm: '256px' },
          },
        }}
      >
        <Button
          size="large"
          variant="arcade"
          color="success"
          startIcon={<PlayCircleOutline />}
          href={routes.help.prizes.path()}
        >
          How It Works
        </Button>
        <Button
          size="large"
          variant="arcade"
          color="secondary"
          startIcon={<CardGiftcardOutlined />}
          href={routes.raffles.path()}
        >
          Giveaways
        </Button>
      </Row>
      <Paper
        sx={{
          color: (theme) => theme.palette.text.arcade,
          alignSelf: 'flex-end',
          p: 2,
          background: (theme) => theme.palette.background['solid-blue'],
        }}
      >
        <ResetNotice />
      </Paper>
      <HorizontalAdvertisement slot="3430497289" />
      <Paper
        sx={{
          background: (theme) => theme.palette.background['solid-blue'],
          p: 2,
          gap: 2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography
          typography={{ xs: 'h6', sm: 'h5', md: 'h4' }}
          color="text.arcade"
        >
          {prizes.data.length ? "Today's Prizes" : 'No Prizes Available'}
        </Typography>
        {prizes.data.length ? (
          <PrizeList prizes={prizes.data} />
        ) : (
          <EmptyPrizeList />
        )}
      </Paper>
      <FrequentlyAskedQuestions />
      <PrizeHistory history={history.data} />
    </Container>
  );
};
