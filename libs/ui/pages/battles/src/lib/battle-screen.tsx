import { ArrowLeft, ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Box,
  Button,
  Collapse,
  Container,
  Paper,
  Typography,
} from '@mui/material';
import { BattleStatus } from '@prisma/client';
import { routes } from '@worksheets/routes';
import { trpc } from '@worksheets/trpc-charity';
import { Description } from '@worksheets/ui/components/description';
import { ErrorComponent } from '@worksheets/ui/components/errors';
import { Column, Row } from '@worksheets/ui/components/flex';
import { LoadingBar } from '@worksheets/ui/components/loading';
import { GradientShadowedTypography } from '@worksheets/ui/components/typography';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import {
  BattleParticipationSchema,
  BattleSchema,
  MVP_REASON_LABEL,
} from '@worksheets/util/types';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react';

import { BossBattle } from './boss-battle';

export const DynamicBattleScreen = dynamic(
  () => Promise.resolve(BattleScreen),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  }
);

const BattleScreen = () => {
  const { query } = useRouter();
  const battleId = Number(query.battleId);

  const battle = trpc.maybe.battles.find.useQuery(battleId, {
    enabled: !!battleId,
  });
  const participation = trpc.maybe.battles.participation.useQuery(battleId, {
    enabled: !!battleId,
  });

  return (
    <Container
      maxWidth="md"
      sx={{
        py: 4,
      }}
    >
      <Button
        variant="arcade"
        size="small"
        color="error"
        href={routes.battles.path()}
        startIcon={<ArrowLeft />}
        sx={{ mb: 3 }}
      >
        All Battles
      </Button>
      <Paper
        sx={{
          borderRadius: (theme) => theme.shape.borderRadius,
          backgroundColor: (theme) => theme.palette.background.paper,
          px: { xs: 1, sm: 2, md: 3, lg: 4 },
          py: 2,
        }}
      >
        <BattleDetails
          battle={battle.data}
          isLoading={battle.isLoading}
          isError={battle.isError}
        />
      </Paper>
      <br />
      <Description
        title={'Battle Participation'}
        description={
          <ParticipationContent
            battle={battle.data}
            participation={participation.data}
            isLoading={participation.isLoading || battle.isLoading}
            isError={participation.isError || battle.isError}
          />
        }
        color="secondary"
      />
    </Container>
  );
};

const BattleDetails: React.FC<{
  battle?: BattleSchema;
  isLoading: boolean;
  isError: boolean;
}> = ({ battle, isLoading, isError }) => {
  if (!battle || isLoading) return <LoadingBar />;
  if (isError) return <ErrorComponent />;

  if (
    battle.status === BattleStatus.PENDING ||
    battle.status === BattleStatus.CANCELLED
  ) {
    return (
      <Column gap={2}>
        <BattleTitle {...battle} />
        <Typography variant="h6">Battle is not active</Typography>
      </Column>
    );
  }

  return (
    <Column gap={2}>
      <BattleTitle {...battle} />
      <BossBattle battle={battle} />
    </Column>
  );
};

const BattleTitle: React.FC<BattleSchema> = (boss) => {
  return (
    <GradientShadowedTypography
      typography={{ xs: 'h5', sm: 'h4', md: 'h4' }}
      textShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
      background={(theme) => theme.palette.text.marketing.gradients.blue.dark}
    >
      Boss Battle #{boss.id}
    </GradientShadowedTypography>
  );
};

const InProgressParticipationContent: React.FC<{
  participation: BattleParticipationSchema[];
}> = ({ participation }) => {
  return (
    <Column>
      <Typography variant="h6"> Participants</Typography>
      {participation.length ? (
        <>
          {participation.map((participant, index) => (
            <ParticipationItem
              key={participant.id}
              index={index + 1}
              participation={participant}
            />
          ))}
        </>
      ) : (
        <Typography>No participants yet</Typography>
      )}
    </Column>
  );
};

const ParticipationContent: React.FC<{
  battle?: BattleSchema;
  participation?: BattleParticipationSchema[];
  isLoading: boolean;
  isError: boolean;
}> = ({ battle, participation, isError, isLoading }) => {
  if (isLoading || !participation || !battle) return <LoadingBar />;
  if (isError) return <ErrorComponent />;

  const mvp = participation.filter((p) => p.loot.some((l) => l.mvp));
  const winners = participation.filter(
    (p) => p.loot.length > 0 && !mvp.some((m) => m.id === p.id)
  );
  const losers = participation.filter((p) => p.loot.length === 0);

  if (battle.status === BattleStatus.ACTIVE) {
    return <InProgressParticipationContent participation={participation} />;
  }

  return (
    <Column gap={2}>
      <Column>
        {Boolean(mvp.length) && (
          <>
            <Typography variant="h6">MVP</Typography>
            {mvp.map((participation, index) => (
              <ParticipationItem
                key={participation.id}
                index={index + 1}
                participation={participation}
              />
            ))}
          </>
        )}
      </Column>
      <Column>
        {Boolean(winners.length) && (
          <>
            <Typography variant="h6">Loot Winners</Typography>
            {winners.map((participation, index) => (
              <ParticipationItem
                key={participation.id}
                index={index + 1}
                participation={participation}
              />
            ))}
          </>
        )}
      </Column>
      <Column>
        {Boolean(losers.length) && (
          <>
            <Typography variant="h6">Other Participants</Typography>
            {losers.map((participation, index) => (
              <ParticipationItem
                key={participation.id}
                index={index + 1}
                participation={participation}
              />
            ))}
          </>
        )}
      </Column>
    </Column>
  );
};

const ParticipationItem: React.FC<{
  participation: BattleParticipationSchema;
  index: number;
}> = ({ participation, index }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <Box width="100%">
      <Row gap={1} width="100%">
        {Boolean(participation.loot.length) && (
          <Button
            variant="arcade"
            size="small"
            onClick={() => setOpen((o) => !o)}
            startIcon={
              open ? (
                <ExpandLess fontSize="small" />
              ) : (
                <ExpandMore fontSize="small" />
              )
            }
          >
            Loot
          </Button>
        )}
        <Typography fontWeight={500}>
          {index}. {participation.user.username} -{' '}
          {(participation.damage / participation.strikes).toFixed(2)} dps
          {participation.isMvp &&
            ` - MVP: ${MVP_REASON_LABEL[participation.isMvp]}`}
        </Typography>
      </Row>
      <Collapse in={open}>
        <Column gap={0.5} mt={1.5}>
          {participation.loot.map((loot, i) => (
            <Typography key={i} fontWeight={500}>
              {loot.mvp ? '🏆' : '⭐️'} {loot.quantity}x {loot.item.name}
            </Typography>
          ))}
        </Column>
      </Collapse>
    </Box>
  );
};
