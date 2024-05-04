import {
  ArrowLeft,
  HelpCenterOutlined,
  InfoOutlined,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  Link,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { routes } from '@worksheets/routes';
import { trpc } from '@worksheets/trpc-charity';
import { Description } from '@worksheets/ui/components/description';
import { ErrorComponent } from '@worksheets/ui/components/errors';
import { Column, Row } from '@worksheets/ui/components/flex';
import { LoadingBar } from '@worksheets/ui/components/loading';
import {
  MonsterDetails,
  MonsterProfile,
} from '@worksheets/ui/components/monsters';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import {
  BattleSchema,
  isBattleComplete,
  MonsterSchema,
} from '@worksheets/util/types';
import dynamic from 'next/dynamic';
import React from 'react';

const Screen: React.FC<{ monster: MonsterSchema }> = (props) => {
  return (
    <Container
      maxWidth="md"
      sx={{
        py: 4,
      }}
    >
      <Button
        variant="arcade"
        color="error"
        size="small"
        href={routes.monsters.path()}
        startIcon={<ArrowLeft />}
        sx={{ mb: 3 }}
      >
        All Monsters
      </Button>
      <Paper
        sx={{
          borderRadius: (theme) => theme.shape.borderRadius,
          backgroundColor: (theme) => theme.palette.background.paper,
          p: { xs: 1, sm: 2, md: 3 },
        }}
      >
        <MonsterDetails
          monster={props.monster}
          profile={
            <MonsterProfile
              monster={props.monster}
              fightButton={
                <Button
                  size="small"
                  variant="square"
                  href={routes.help.mobs.path()}
                >
                  <HelpCenterOutlined />
                </Button>
              }
            />
          }
        />
      </Paper>
      <br />
      <Description
        open={true}
        title={'Battles'}
        description={<BattlesContent monster={props.monster} />}
        color="secondary"
      />
    </Container>
  );
};

const NoBattlesContent = () => {
  return (
    <Typography variant="h6">
      No battles have been recorded for this monster yet.
    </Typography>
  );
};

const BattlesContent: React.FC<{ monster: MonsterSchema }> = (props) => {
  const battles = trpc.maybe.battles.list.useQuery({
    monsterId: props.monster.id,
  });

  if (battles.isLoading) return <LoadingBar />;
  if (battles.isError) return <ErrorComponent />;

  if (!battles.data.length) {
    return <NoBattlesContent />;
  }

  return (
    <Column gap={2}>
      <BattleTable battles={battles.data} />
      <Row gap={0.5}>
        <InfoOutlined color="info" fontSize="small" />
        <Typography
          component={Link}
          href={routes.help.mobs.path()}
          variant="body2"
          color="info"
        >
          What are battles?
        </Typography>
      </Row>
    </Column>
  );
};

const StyledBox = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
}));

export const BattleTable: React.FC<{
  battles: BattleSchema[];
}> = ({ battles }) => {
  return (
    <TableContainer component={StyledBox}>
      <Table
        size="small"
        sx={{
          minWidth: 400,
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>Battle ID</TableCell>
            <TableCell>HP</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {battles.map((battle) => (
            <TableRow
              key={battle.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Typography
                  fontWeight={500}
                  component={Link}
                  href={routes.battle.path({
                    params: { battleId: battle.id },
                  })}
                >
                  {battle.id}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight={500}>
                  {battle.health} / {battle.mob.maxHp}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  fontWeight={500}
                  color={
                    isBattleComplete(battle) ? 'error.main' : 'success.main'
                  }
                >
                  {isBattleComplete(battle) ? 'Defeated' : 'Active'}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export const DynamicMonsterScreen = dynamic(() => Promise.resolve(Screen), {
  ssr: false,
  loading: () => <LoadingScreen />,
});
