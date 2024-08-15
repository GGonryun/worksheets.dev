import { ArrowLeft, OpenInNew } from '@mui/icons-material';
import { Box, Button, Container, Paper, Typography } from '@mui/material';
import { BattleStatus } from '@prisma/client';
import { routes } from '@worksheets/routes';
import { trpc } from '@worksheets/trpc-charity';
import { Description } from '@worksheets/ui/components/description';
import { ErrorComponent } from '@worksheets/ui/components/errors';
import { Column } from '@worksheets/ui/components/flex';
import { helpMobs } from '@worksheets/ui/components/help';
import { LoadingBar } from '@worksheets/ui/components/loading';
import { LoginToView } from '@worksheets/ui/components/login';
import { Questions } from '@worksheets/ui/components/qa-section';
import { Table, TableCell, TableRow } from '@worksheets/ui/components/tables';
import { GradientShadowedTypography } from '@worksheets/ui/components/typography';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { printShortDateTime } from '@worksheets/util/time';
import { NO_REFETCH } from '@worksheets/util/trpc';
import {
  BattleLogSchema,
  BattleParticipationSchema,
  BattleSchema,
} from '@worksheets/util/types';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import React from 'react';

import { BattleParticipantsTable } from './battle-participants-table';
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

  const queryOpts = {
    enabled: !!battleId,
    ...NO_REFETCH,
  };
  const battle = trpc.maybe.battles.find.useQuery(battleId, queryOpts);
  const participation = trpc.maybe.battles.participation.useQuery(
    battleId,
    queryOpts
  );
  const battleLogs = trpc.maybe.battles.logs.useQuery(battleId, queryOpts);

  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          pt: 4,
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
      </Container>
      <Container
        maxWidth="lg"
        sx={{
          py: 4,
        }}
      >
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
          color="primary"
        />
        <br />
        <Description
          title={'Battle Logs'}
          description={<BattleLogsContent battleLogs={battleLogs.data} />}
          color="primary"
          hideLogo
        />
      </Container>
      <Container
        maxWidth="lg"
        sx={{
          mb: 4,
        }}
      >
        <Description
          title="Frequently Asked Questions"
          color="secondary"
          description={
            <Box mt={{ xs: 3, sm: 4 }}>
              <Questions qa={helpMobs} />
            </Box>
          }
        />
      </Container>
    </>
  );
};

const BattleLogsContent: React.FC<{ battleLogs?: BattleLogSchema[] }> = ({
  battleLogs,
}) => {
  if (!battleLogs) {
    return <LoadingBar />;
  }
  if (!battleLogs.length) {
    return (
      <Column gap={1.5}>
        <Typography variant="body1" fontWeight={600}>
          No logs exist for this battle
        </Typography>
        <Button
          variant="text"
          color="primary"
          startIcon={<OpenInNew />}
          target="_blank"
          sx={{ width: 'fit-content' }}
          href={routes.help.mobs.path()}
        >
          Learn about monsters
        </Button>
      </Column>
    );
  }
  return <BattleLogTable logs={battleLogs} />;
};

export const BattleLogTable: React.FC<{
  logs: BattleLogSchema[];
}> = ({ logs }) => {
  return (
    <Table
      head={
        <>
          <TableCell>Message</TableCell>
          <TableCell align="right">Timestamp</TableCell>
        </>
      }
      body={
        <>
          {logs.map((log) => (
            <TableRow
              key={log.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{log.message}</TableCell>
              <TableCell align="right">
                {printShortDateTime(log.createdAt)}
              </TableCell>
            </TableRow>
          ))}
        </>
      }
    />
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
      <BossBattle
        battle={battle}
        href={routes.monster.path({
          params: {
            monsterId: battle.mob.id,
          },
        })}
      />
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

const ParticipationContent: React.FC<{
  battle?: BattleSchema;
  participation?: BattleParticipationSchema[];
  isLoading: boolean;
  isError: boolean;
}> = ({ battle, participation, isError, isLoading }) => {
  const session = useSession();
  const user = trpc.user.get.useQuery(undefined, {
    enabled: session.status === 'authenticated',
  });
  if (
    isLoading ||
    !participation ||
    !battle ||
    session.status === 'loading' ||
    user.isFetching
  )
    return <LoadingBar />;
  if (isError) return <ErrorComponent />;

  return (
    <Column gap={2}>
      {session.status === 'unauthenticated' || !user.data ? (
        <LoginToView
          redirect={routes.battle.path({
            params: {
              battleId: battle.id,
            },
          })}
          title="view the participants and MVP of this battle"
          subtitle="Want to view the participants and MVP?"
        />
      ) : participation.length ? (
        <BattleParticipantsTable
          participants={participation}
          total={participation.reduce((a, p) => p.damage + a, 0)}
          userId={user.data?.id}
        />
      ) : (
        <Typography>No participants yet</Typography>
      )}
    </Column>
  );
};
