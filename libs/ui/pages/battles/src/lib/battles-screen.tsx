import {
  Clear,
  HelpOutline,
  InfoOutlined,
  Inventory2Outlined,
  Search,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { Sword } from '@worksheets/icons/dazzle';
import {
  SortAmountDown,
  SortAmountUp,
  Undo,
} from '@worksheets/icons/font-awesome-solid';
import { routes } from '@worksheets/routes';
import { trpc } from '@worksheets/trpc-charity';
import { Column, Row } from '@worksheets/ui/components/flex';
import { LoadingBar } from '@worksheets/ui/components/loading';
import { GradientShadowedTypography } from '@worksheets/ui/components/typography';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { getObjectKeys } from '@worksheets/util/objects';
import { findNextCronTime, printTimeRemaining } from '@worksheets/util/time';
import {
  BATTLE_SORT,
  BattleFiltersSchema,
  BattleSortValue,
  DEFAULT_BATTLE_FILTERS,
  SORT_DIRECTION,
} from '@worksheets/util/types';
import dynamic from 'next/dynamic';
import React from 'react';

import { BossBattle } from './boss-battle';

const MobsScreen = () => {
  const [filters, setFilters] = React.useState<BattleFiltersSchema>(
    DEFAULT_BATTLE_FILTERS
  );

  const battles = trpc.maybe.battles.list.useQuery(filters);

  return (
    <Container
      maxWidth="md"
      sx={{
        py: 4,
      }}
    >
      <Paper
        sx={{
          borderRadius: (theme) => theme.shape.borderRadius,
          backgroundColor: (theme) => theme.palette.background.paper,
          px: { xs: 1, sm: 2, md: 3, lg: 4 },
          py: 2,
        }}
      >
        <Column alignItems="center" gap={4}>
          <MobsOrder filters={filters} setFilters={setFilters} />

          {battles.isLoading ? (
            <LoadingBar />
          ) : (
            <Column width="100%" gap={2}>
              {battles.data && battles.data.length ? (
                battles.data?.map((battle) => (
                  <BossBattle
                    key={battle.id}
                    battle={battle}
                    href={routes.battle.path({
                      params: {
                        battleId: battle.id,
                      },
                    })}
                  />
                ))
              ) : (
                <NoBattlesAvailable />
              )}
            </Column>
          )}
        </Column>
      </Paper>
    </Container>
  );
};

const NoBattlesAvailable = () => (
  <Box>
    <Row alignItems="center" gap={1} ml={0.65} mb={0.5}>
      <Sword fontSize={'medium'} />
      <Typography variant="h5">No battles available</Typography>
    </Row>
    <Typography ml={0.65} mb={2}>
      The next battle will start in approximately{' '}
      <b>
        {printTimeRemaining(
          findNextCronTime({
            // TODO: get this interval from the vercel.json file instead
            hours: 4,
            minutes: 25,
          })
        )}
      </b>
      .
    </Typography>
    <Button
      variant="text"
      startIcon={<HelpOutline />}
      href={routes.help.mobs.path()}
    >
      Learn more about boss battles
    </Button>
  </Box>
);

export const DynamicBattlesScreen = dynamic(() => Promise.resolve(MobsScreen), {
  ssr: false,
  loading: () => <LoadingScreen />,
});

const MobsOrder: React.FC<{
  filters: BattleFiltersSchema;
  setFilters: React.Dispatch<React.SetStateAction<BattleFiltersSchema>>;
}> = ({ filters, setFilters }) => (
  <Column width="100%">
    <Row justifyContent="space-between" flexWrap="wrap" gap={2}>
      <GradientShadowedTypography
        typography={{ xs: 'h5', sm: 'h4', md: 'h3' }}
        textShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        background={(theme) => theme.palette.text.marketing.gradients.blue.dark}
      >
        Boss Battles
      </GradientShadowedTypography>
      <Row gap={1}>
        <Button
          variant="square"
          size="small"
          color="secondary"
          href={routes.monsters.path()}
        >
          <Sword />
        </Button>
        <Button
          variant="square"
          size="small"
          color="secondary"
          href={routes.items.path()}
        >
          <Inventory2Outlined />
        </Button>
        <Button variant="square" size="small" href={routes.help.mobs.path()}>
          <InfoOutlined />
        </Button>
      </Row>
    </Row>

    <br />
    <Row justifyContent="space-between" flexWrap="wrap" gap={1}>
      <Box maxWidth={{ xs: '100%', sm: '300px' }} width="100%">
        <Typography
          fontWeight={500}
          color={(theme) => theme.palette.text.blue.darker}
        >
          Search
        </Typography>
        <TextField
          size="small"
          fullWidth
          value={filters.search}
          onChange={(e) =>
            setFilters((f) => ({ ...f, search: e.target.value }))
          }
          sx={{
            backgroundColor: (theme) => theme.palette.grey[200],
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={() => setFilters((f) => ({ ...f, search: '' }))}
                >
                  <Clear />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box maxWidth={{ xs: '100%', sm: '300px' }} width="100%">
        <Typography
          fontWeight={500}
          color={(theme) => theme.palette.text.blue.darker}
        >
          Show current results by:
        </Typography>
        <Row gap={1}>
          <Select
            size="small"
            fullWidth
            sx={{
              backgroundColor: (theme) => theme.palette.grey[200],
            }}
            value={filters.sort}
            onChange={(e) =>
              setFilters((f) => ({
                ...f,
                sort: e.target.value as BattleSortValue,
              }))
            }
          >
            {getObjectKeys(BATTLE_SORT).map((key) => (
              <MenuItem key={key} value={BATTLE_SORT[key]}>
                {BATTLE_SORT[key]}
              </MenuItem>
            ))}
          </Select>
          <Button
            variant="square"
            sx={{ mt: '-2px' }}
            onClick={() =>
              setFilters((f) => ({
                ...f,
                direction:
                  f.direction === SORT_DIRECTION.ASC
                    ? SORT_DIRECTION.DESC
                    : SORT_DIRECTION.ASC,
              }))
            }
          >
            {filters.direction === SORT_DIRECTION.ASC ? (
              <SortAmountDown />
            ) : (
              <SortAmountUp />
            )}
          </Button>
          <Button
            variant="square"
            sx={{ mt: '-2px' }}
            onClick={() => setFilters(DEFAULT_BATTLE_FILTERS)}
          >
            <Undo />
          </Button>
        </Row>
      </Box>
    </Row>
  </Column>
);
