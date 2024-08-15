import {
  Air,
  ArrowBack,
  ArrowDownward,
  ArrowUpward,
  BackHand,
  BubbleChart,
  CheckCircleOutline,
  Close,
  DarkMode,
  FiberManualRecord,
  FilterAltOffOutlined,
  FilterAltOutlined,
  HideSource,
  InfoOutlined,
  Landscape,
  LightMode,
  LineStyle,
  LocalFireDepartment,
  Login,
  OpenInNew,
  SvgIconComponent,
  WaterDrop,
} from '@mui/icons-material';
import {
  Alert,
  alpha,
  Box,
  Button,
  Collapse,
  Divider,
  LinearProgress,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import {
  COMBAT_ITEM_DAMAGE,
  COMBAT_ITEM_ELEMENT,
  CombatItemId,
  ELEMENT_LABEL,
  Resistances,
  WeaponElement,
} from '@worksheets/data/items';
import { Sword } from '@worksheets/icons/dazzle';
import { ItemType } from '@worksheets/prisma';
import { routes } from '@worksheets/routes';
import { trpc } from '@worksheets/trpc-charity';
import { Column, Row } from '@worksheets/ui/components/flex';
import { ContainImage, FillImage } from '@worksheets/ui/components/images';
import { NumericCounterField } from '@worksheets/ui/components/inputs';
import { LoadingBar } from '@worksheets/ui/components/loading';
import { InfoModal, ModalWrapper } from '@worksheets/ui/components/modals';
import {
  MonsterDetails,
  MonsterProfile,
} from '@worksheets/ui/components/monsters';
import { useSnackbar } from '@worksheets/ui/components/snackbar';
import { PaletteColor } from '@worksheets/ui/theme';
import { HelpInventoryQuestions } from '@worksheets/util/enums';
import { assertNever } from '@worksheets/util/errors';
import { calculatePercentage, toPercentage } from '@worksheets/util/numbers';
import { NO_REFETCH } from '@worksheets/util/trpc';
import {
  BattleSchema,
  calculateCombatDamage,
  InventoryItemSchema,
  MOB_ELEMENT_RESISTANCES,
} from '@worksheets/util/types';
import { useSession } from 'next-auth/react';
import pluralize from 'pluralize';
import React, { useMemo, useRef, useState } from 'react';

export const BossBattle: React.FC<{ battle: BattleSchema; href: string }> = (
  props
) => {
  return (
    <MonsterDetails
      monster={props.battle.mob}
      titleHref={props.href}
      profile={<FightProfile battle={props.battle} href={props.href} />}
    />
  );
};

const FightProfile: React.FC<{ battle: BattleSchema; href: string }> = (
  props
) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <MonsterProfile
        monster={props.battle.mob}
        fightButton={
          <FightButton
            currentHp={props.battle.health}
            onClick={() => setOpen(true)}
          />
        }
        infoButton={<InfoButton href={props.href} />}
        healthBar={
          <HealthBar
            currentHp={props.battle.health}
            maxHp={props.battle.mob.maxHp}
            baseColor="error"
            deltaColor="error"
          />
        }
      />
      <FightModal
        open={open}
        onClose={() => setOpen(false)}
        battle={props.battle}
      />
    </>
  );
};

const HealthBar: React.FC<{
  currentHp: number;
  maxHp: number;
  deltaColor?: 'error' | 'success';
  baseColor?: 'error' | 'success';
  delta?: number;
}> = ({
  currentHp,
  maxHp,
  deltaColor = 'success',
  baseColor = 'error',
  delta = 0,
}) => {
  const percent = calculatePercentage(currentHp, maxHp);
  const difference = calculatePercentage(delta ?? 0, maxHp);
  return (
    <LinearProgress
      variant="determinate"
      color={deltaColor ?? 'error'}
      value={calculatePercentage(currentHp, maxHp)}
      sx={{
        height: 10,
        width: '100%',
        '&:after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: (theme) => theme.palette[baseColor].main,
          transform: `translateX(-${100 - percent + difference}%)`,
          borderRadius: 'inherit',
          transition: 'transform 0.5s',
        },
      }}
    />
  );
};

const InfoButton: React.FC<{ href: string }> = (props) => (
  <Button variant="square" color="primary" size="small" href={props.href}>
    <InfoOutlined />
  </Button>
);

const FightButton: React.FC<{
  onClick: () => void;
  currentHp: number;
}> = (props) => {
  return (
    <Button
      variant="arcade"
      color={props.currentHp > 0 ? 'error' : 'dark-grey'}
      size="small"
      onClick={props.onClick}
    >
      {props.currentHp > 0 ? 'Fight' : 'Defeated'}
    </Button>
  );
};

const FightModal: React.FC<ModalWrapper<{ battle: BattleSchema }>> = ({
  open,
  onClose,
  battle,
}) => {
  const session = useSession();
  const connected = session.status === 'authenticated';
  const resistances = MOB_ELEMENT_RESISTANCES[battle.mob.element];
  const ref = useRef<HTMLDivElement | null>(null);

  const snackbar = useSnackbar();
  const utils = trpc.useUtils();
  const strike = trpc.user.battles.strike.useMutation();
  const items = trpc.user.inventory.items.useQuery([ItemType.COMBAT], {
    enabled: connected,
    ...NO_REFETCH,
  });

  const onScroll = () => {
    ref.current?.scrollTo({
      top: ref.current.scrollHeight,
      behavior: 'smooth',
    });
  };

  const [selections, setSelections] = useState<Record<string, number>>({});
  const [showOverkill, setShowOverkill] = useState(false);

  const handleClose = () => {
    onClose?.({}, 'escapeKeyDown');
    setSelections({});
    setShowOverkill(false);
  };

  const handleConfirmStrike = async () => {
    try {
      const msg = await strike.mutateAsync({
        battleId: battle.id,
        items: selections,
      });
      utils.maybe.battles.invalidate();
      items.refetch();
      snackbar.success(msg);
      handleClose();
    } catch (error) {
      snackbar.error('Failed to deal damage. Contact Support.');
    }
  };

  const handleStrike = async () => {
    if (!connected) {
      return;
    }
    if (totalDamage > battle.health) {
      setShowOverkill(true);
      return;
    }

    await handleConfirmStrike();
  };

  const totalDamage = useMemo(() => {
    return calculateCombatDamage(resistances, selections);
  }, [resistances, selections]);

  return (
    <>
      <OverkillModal
        battle={battle}
        damage={totalDamage}
        open={showOverkill}
        onClose={() => setShowOverkill(false)}
        onConfirm={handleConfirmStrike}
      />
      <InfoModal
        open={open}
        onClose={handleClose}
        gutter={0}
        maxWidth={440}
        infoHref={routes.help.mobs.path()}
        ref={ref}
      >
        <Column>
          <Box
            position="sticky"
            top={-1}
            zIndex={1}
            sx={{
              px: 2,
              pt: 1,
              background: (theme) => theme.palette.background.paper,
            }}
          >
            <MonsterHeader
              battle={battle}
              damage={totalDamage}
              extra={
                totalDamage > 0 && (
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    sx={{
                      typography: 'body2',
                      fontWeight: 700,
                      mb: 0.5,
                    }}
                    onClick={onScroll}
                    startIcon={
                      <Sword sx={{ height: 16, width: 16, mr: -0.5 }} />
                    }
                  >
                    Attack
                  </Button>
                )
              }
            />

            <Divider sx={{ mt: 1 }} />
          </Box>
          <Column gap={1} p={2} zIndex={0}>
            <Typography variant="body2" textAlign="center">
              {battle.mob.description}
            </Typography>
            <Divider sx={{ width: '100%' }} />
            <Row gap={1} justifyContent="center">
              <ResistancesTable resistances={resistances} />
            </Row>
            <Divider sx={{ width: '100%' }} />
            {!connected ? (
              <LoginToFight battleId={battle.id} />
            ) : battle.health < 1 ? (
              <MobDefeated />
            ) : (
              <ItemSelection
                items={items.data ?? []}
                onClose={handleClose}
                onStrike={handleStrike}
                battle={battle}
                isLoading={items.isFetching || strike.isLoading}
                resistances={resistances}
                damage={totalDamage}
                setSelections={setSelections}
                selections={selections}
              />
            )}
            <br />
          </Column>
        </Column>
      </InfoModal>
    </>
  );
};

const MonsterHeader: React.FC<{
  battle: BattleSchema;
  error?: boolean;
  damage?: number;
  extra?: React.ReactNode;
  showDelta?: boolean;
}> = ({ battle, error, damage = 0, extra, showDelta = false }) => {
  return (
    <>
      <Column alignItems="center">
        <Typography variant="h5" textAlign="center">
          {battle.mob.name}
        </Typography>
        <Divider />
        <Box
          sx={{
            position: 'relative',
            width: 128,
            height: 128,
          }}
        >
          <ContainImage src={battle.mob.imageUrl} alt={battle.mob.name} />
        </Box>
      </Column>
      <Row
        mt={1}
        justifyContent="space-between"
        width="100%"
        alignItems="flex-end"
      >
        <Typography
          component="span"
          variant="body3"
          textAlign="left"
          fontWeight={700}
          mb={0.5}
          color={error ? 'error.main' : 'text.primary'}
        >
          HP: {battle.health}/{battle.mob.maxHp}{' '}
          <Box component="span" color="error.main">
            {damage > 0 && `(-${damage} dmg)`}
          </Box>
        </Typography>
        {extra}
      </Row>
      <HealthBar
        currentHp={battle.health}
        maxHp={battle.mob.maxHp}
        delta={damage}
        deltaColor="error"
        baseColor={'success'}
      />
    </>
  );
};

const ResistancesTable: React.FC<{ resistances: Resistances }> = ({
  resistances,
}) => {
  return (
    <Column gap={1}>
      <Typography typography={'body1'} textAlign="center" fontWeight={700}>
        Elements
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gap: 1,
          gridTemplateColumns: 'repeat(5, 1fr)',
        }}
      >
        {Object.entries(resistances).map(([element, resistance]) => (
          <Box
            key={element}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            <ElementTab
              element={element as WeaponElement}
              borderColor="black"
              iconSize={20}
              tabSize={50}
              borderSize={3}
            />
            <Typography
              typography="body2"
              textAlign="center"
              color={
                resistance > 1
                  ? 'success.main'
                  : resistance < 1
                  ? 'error.main'
                  : 'primary.text'
              }
              fontWeight={900}
            >
              {toPercentage(resistance)}
            </Typography>
          </Box>
        ))}
      </Box>
    </Column>
  );
};

const SORTING_OPTIONS = [
  {
    key: 'id',
    label: 'Item ID',
  },
  {
    key: 'name',
    label: 'Name',
  },
  {
    key: 'damage',
    label: 'Base Damage',
  },
  {
    key: 'effect',
    label: 'Effective %',
  },
  {
    key: 'quantity',
    label: 'Quantity',
  },
] as const;

type SortByKey = (typeof SORTING_OPTIONS)[number]['key'];

const FILTER_OPTIONS = [
  {
    key: 'balanced',
    label: 'Balanced',
  },
  {
    key: 'weaknesses',
    label: 'Weakness',
  },
  {
    key: 'resistance',
    label: 'Resistance',
  },
] as const;

type FilterKey = (typeof FILTER_OPTIONS)[number]['key'];

type ItemFilters = Record<FilterKey, boolean>;

const itemFilter =
  (
    filters: ItemFilters,
    selections: Record<string, number>,
    resistances: Resistances
  ) =>
  (item: InventoryItemSchema) => {
    // never filter out selected items
    if (selections[item.itemId]) {
      return true;
    }

    const resistance =
      resistances[COMBAT_ITEM_ELEMENT[item.itemId as CombatItemId]];

    if (!filters.balanced && resistance === 1) {
      return false;
    }
    if (!filters.resistance && resistance < 1) {
      return false;
    }
    if (!filters.weaknesses && resistance > 1) {
      return false;
    }

    return true;
  };

const itemSort =
  (sortBy: SortByKey, resistances: Resistances) =>
  (a: InventoryItemSchema, b: InventoryItemSchema) => {
    switch (sortBy) {
      case 'id':
        return Number(a.itemId) - Number(b.itemId);
      case 'name':
        return a.name.localeCompare(b.name);
      case 'damage': {
        const ad = COMBAT_ITEM_DAMAGE[a.itemId as CombatItemId] ?? 1;
        const bd = COMBAT_ITEM_DAMAGE[b.itemId as CombatItemId] ?? 1;
        if (ad === bd) {
          return a.itemId.localeCompare(b.itemId);
        }
        return ad - bd;
      }
      case 'effect': {
        const ar = resistances[COMBAT_ITEM_ELEMENT[a.itemId as CombatItemId]];
        const br = resistances[COMBAT_ITEM_ELEMENT[b.itemId as CombatItemId]];
        if (ar === br) {
          return a.itemId.localeCompare(b.itemId);
        }
        return ar - br;
      }

      case 'quantity': {
        if (a.quantity === b.quantity) {
          return a.itemId.localeCompare(b.itemId);
        }
        return a.quantity - b.quantity;
      }
      default:
        throw assertNever(sortBy);
    }
  };

const ItemSelection: React.FC<{
  battle: BattleSchema;
  resistances: Resistances;
  items: InventoryItemSchema[];
  damage: number;
  onStrike: () => void;
  onClose: () => void;
  selections: Record<string, number>;
  isLoading: boolean;
  setSelections: (selections: Record<string, number>) => void;
}> = ({
  items,
  onStrike,
  onClose,
  damage,
  selections,
  setSelections,
  battle,
  resistances,
  isLoading,
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<SortByKey>('id');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filters, setFilters] = useState<ItemFilters>({
    balanced: true,
    weaknesses: true,
    resistance: true,
  });
  const [showUnused, setShowUnused] = useState(true);

  const availableItems = useMemo(() => {
    const sortedItems = items.sort(itemSort(sortBy, resistances)) ?? [];
    const orderedItems =
      sortOrder === 'asc' ? sortedItems : sortedItems.reverse();
    const filteredItems = orderedItems.filter(
      itemFilter(filters, selections, resistances)
    );
    const displayedItems = showUnused
      ? filteredItems
      : filteredItems.filter((item) => selections[item.itemId] > 0);
    return displayedItems;
  }, [filters, items, resistances, selections, showUnused, sortBy, sortOrder]);

  const maxPossibleDamage = Math.min(damage, battle.health);
  const insufficientDamageForPrize = maxPossibleDamage < battle.mob.defense;

  if (isLoading) return <LoadingBar />;
  if (!items.length) return <NoCombatItems />;

  return (
    <Column gap={2}>
      <Box>
        <Button
          variant="arcade"
          fullWidth
          size="small"
          onClick={() => setShowFilters(!showFilters)}
          startIcon={
            showFilters ? <FilterAltOffOutlined /> : <FilterAltOutlined />
          }
        >
          {showFilters ? 'Hide' : 'Show'} Filters & Sorting
        </Button>
        <Collapse in={showFilters}>
          <Column mt={1} gap={0.5}>
            <Typography variant="body3" fontWeight={700}>
              Sort By:
            </Typography>
            <Row gap={1}>
              <Select
                size="small"
                fullWidth
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortByKey)}
              >
                {SORTING_OPTIONS.map((option) => (
                  <MenuItem key={option.key} value={option.key}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              <Button
                variant="square"
                color="primary"
                onClick={() =>
                  setSortOrder((order) => (order === 'asc' ? 'desc' : 'asc'))
                }
              >
                {sortOrder === 'asc' ? <ArrowDownward /> : <ArrowUpward />}
              </Button>
            </Row>
          </Column>
          <Column mt={1} gap={0.5}>
            <Typography variant="body3" fontWeight={700}>
              Filter By:
            </Typography>
            <Row gap={1}>
              {FILTER_OPTIONS.map((option) => (
                <Button
                  key={option.key}
                  variant="arcade"
                  color={filters[option.key] ? 'primary' : 'light-grey'}
                  size="small"
                  onClick={() => {
                    setFilters((f) => ({
                      ...f,
                      [option.key]: !f[option.key],
                    }));
                  }}
                >
                  {filters[option.key] ? 'Hide' : 'Show'} {option.label}
                </Button>
              ))}
            </Row>
          </Column>
          <Button
            variant="arcade"
            fullWidth
            color={showUnused ? 'primary' : 'light-grey'}
            startIcon={<HideSource />}
            onClick={() => setShowUnused((show) => !show)}
            sx={{ mt: 1 }}
          >
            {showUnused ? 'Hide' : 'Show'} Unused
          </Button>
        </Collapse>
      </Box>
      {availableItems.length === 0 ? (
        <Column textAlign="center" gap={0.5}>
          <Typography
            variant="h6"
            fontWeight={700}
            fontStyle="italic"
            textAlign="center"
          >
            No items here!
          </Typography>
          <Typography
            variant="body2"
            fontWeight={700}
            fontStyle="italic"
            textAlign="center"
          >
            Change your filters and settings above to reveal more items
          </Typography>
        </Column>
      ) : (
        <>
          <CombatItems
            availableItems={availableItems}
            selections={selections}
            resistances={resistances}
            onChange={setSelections}
          />
          {damage > 0 && (
            <Alert
              icon={<Sword />}
              color={insufficientDamageForPrize ? 'error' : 'info'}
            >
              {insufficientDamageForPrize ? (
                <>
                  You must deal <b>at least {battle.mob.defense} damage</b> to
                  be eligible for a reward.
                  <LinearProgress
                    variant="determinate"
                    value={calculatePercentage(damage, battle.mob.defense)}
                    color="error"
                    sx={{
                      mt: 1,
                      height: 10,
                      borderRadius: 5,
                    }}
                  />
                </>
              ) : (
                <>
                  Earn an item drop each time you deal{' '}
                  <b>{battle.mob.defense} damage.</b>
                  {maxPossibleDamage < damage && (
                    <i>
                      <br />
                      Excess damage will not increase your rewards.
                    </i>
                  )}
                  <br />
                  <br />
                  <b>
                    Item Drops:{' '}
                    {Math.floor(maxPossibleDamage / battle.mob.defense)}
                  </b>
                  <LinearProgress
                    variant="determinate"
                    value={calculatePercentage(
                      Math.min(damage, maxPossibleDamage) % battle.mob.defense,
                      battle.mob.defense
                    )}
                    color="info"
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      mt: 1,
                    }}
                  />
                </>
              )}
            </Alert>
          )}
          <Button
            variant="arcade"
            size="large"
            color="success"
            disabled={!damage || isLoading}
            startIcon={<Sword />}
            onClick={onStrike}
          >
            Deal {damage} Damage
          </Button>
        </>
      )}
      <Button
        variant="arcade"
        size="large"
        color="error"
        startIcon={<Close />}
        onClick={onClose}
      >
        Cancel Attack
      </Button>
    </Column>
  );
};

const CombatItems: React.FC<{
  availableItems: InventoryItemSchema[];
  resistances: Resistances;
  selections: Record<string, number>;
  onChange: (selections: Record<string, number>) => void;
}> = ({ availableItems, resistances, selections, onChange }) => {
  return (
    <Column gap={1}>
      <Box
        sx={{
          display: 'grid',
          gap: 0.5,
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
          },
        }}
      >
        {availableItems.map((item) => (
          <CombatItem
            key={item.itemId}
            item={item}
            resistances={resistances}
            quantity={selections[item.itemId] ?? 0}
            onChange={(quantity) =>
              onChange({
                ...selections,
                [item.itemId]: quantity,
              })
            }
          />
        ))}
      </Box>
    </Column>
  );
};

const ELEMENT_GRADIENT: Record<WeaponElement, string> = {
  neutral: '#686868',
  water:
    'radial-gradient(circle at 10% 20%, rgb(59, 149, 237) 0%, rgb(7, 91, 173) 90%)',
  earth:
    'linear-gradient(87.4deg, rgb(255, 241, 165) 1.9%, rgb(200, 125, 76) 49.7%, rgb(83, 54, 54) 100.5%)',
  fire: 'linear-gradient(0deg, rgb(149, 5, 4),rgb(253, 19, 61))',
  wind: 'linear-gradient(to top, #0ba360 0%, #3cba92 100%)',
  holy: 'linear-gradient(109.6deg, rgb(255, 207, 84) 11.2%, rgb(255, 158, 27) 91.1%)',
  shadow:
    'radial-gradient(circle at 24.1% 68.8%, rgb(50, 50, 50) 0%, rgb(0, 0, 0) 99.4%)',
  poison: 'linear-gradient(103.9deg, #01df01 -10%, #6a0888 83.9%)',
  ghost:
    'radial-gradient(circle at 10% 20%, rgb(186, 190, 245) 0%, rgb(192, 192, 245) 33.1%, rgb(218, 203, 246) 90%)',
  undead: 'linear-gradient(0deg, rgb(0, 32, 95) 2.8%, rgb(132, 53, 142) 97.8%)',
};

const ELEMENT_ICON: Record<WeaponElement, SvgIconComponent> = {
  neutral: FiberManualRecord,
  water: WaterDrop,
  earth: Landscape,
  fire: LocalFireDepartment,
  wind: Air,
  holy: LightMode,
  shadow: DarkMode,
  poison: BubbleChart,
  ghost: LineStyle,
  undead: BackHand,
};

const ElementTab: React.FC<{
  element: WeaponElement;
  selected?: boolean;
  borderColor?: PaletteColor;
  iconSize?: number;
  tabSize?: number;
  borderSize?: number;
}> = ({
  element,
  selected,
  borderColor = 'white',
  iconSize = 20,
  tabSize = 28,
  borderSize = 2,
}) => {
  const gradient = selected
    ? 'linear-gradient(181deg, #61EA31 0.5%, #5BB83C 121.74%, #156B07 242.97%)'
    : ELEMENT_GRADIENT[element];
  const Icon = selected ? CheckCircleOutline : ELEMENT_ICON[element];
  return (
    <Box
      sx={{
        lineHeight: 0,
        backgroundColor: (theme) => theme.palette.warning.main,
        background: gradient,
        borderRadius: '32px',
        width: tabSize,
        display: 'grid',
        placeItems: 'center',
        border: (theme) =>
          `${borderSize}px solid ${theme.palette[borderColor].main}`,
      }}
    >
      <Icon
        color="white"
        sx={{
          fontSize: iconSize,
        }}
      />
    </Box>
  );
};

const CombatItem: React.FC<{
  item: InventoryItemSchema;
  resistances: Resistances;
  quantity: number;
  onChange: (quantity: number) => void;
}> = ({ item, resistances, quantity, onChange }) => {
  const [open, setOpen] = useState(false);
  const damage = COMBAT_ITEM_DAMAGE[item.itemId as CombatItemId] ?? 1;
  const element = COMBAT_ITEM_ELEMENT[item.itemId as CombatItemId] ?? 'neutral';
  const resistance = resistances[element];
  const color = quantity > 0 ? 'success' : 'primary';
  return (
    <Box
      sx={{
        borderRadius: (theme) => theme.shape.borderRadius,
        border: (theme) => `3px solid ${alpha(theme.palette[color].main, 0.5)}`,
        backgroundColor: (theme) => alpha(theme.palette[color].main, 0.1),
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}
    >
      <Column>
        <Box
          onClick={() => setOpen(!open)}
          sx={{
            display: 'flex',
            position: 'relative',
            justifyContent: 'space-between',
            cursor: 'pointer',
            '& *': {
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            },
          }}
        >
          <Row>
            <Box
              sx={{
                m: 1,
                height: 64,
                width: 64,
                position: 'relative',
                display: 'grid',
                placeItems: 'center',
                overflow: 'visible !important',
              }}
            >
              <FillImage src={item.imageUrl} alt={item.name} />
              {quantity > 0 && (
                <Sword
                  sx={{
                    position: 'absolute',
                    top: -8,
                    left: -8,
                    color: 'success.main',
                  }}
                />
              )}
            </Box>
            <Column justifyContent="center">
              <Typography fontWeight={700}>
                {quantity > 0 ? `${quantity}x ` : ''}
                {item.name}
              </Typography>
              <Typography typography="body3" fontWeight={500}>
                {quantity > 0 ? quantity * damage : damage}{' '}
                {ELEMENT_LABEL[element]} Damage
              </Typography>
              <Typography
                typography="body3"
                fontWeight={500}
                color={
                  resistance > 1
                    ? 'success.main'
                    : resistance < 1
                    ? 'error.main'
                    : 'primary.text'
                }
              >
                {toPercentage(resistance)} Effective
              </Typography>
              <Typography
                typography="body3"
                fontWeight={quantity > 0 ? 700 : 500}
                color={quantity > 0 ? 'success.main' : 'text.primary'}
              >
                {quantity > 0
                  ? `${quantity} of ${item.quantity} Selected`
                  : `${item.quantity} Available`}
              </Typography>
            </Column>
          </Row>
          <ElementTab selected={quantity > 0} element={element} />
        </Box>
        <Collapse in={open}>
          <Divider sx={{ my: 1 }} />
          <Column gap={1} mb={1}>
            <Typography
              typography={{ xs: 'body3', mobile1: 'body2' }}
              textAlign="center"
              color={item.quantity === quantity ? 'error' : 'text.primary'}
            >
              <i>
                Available: {item.quantity - quantity}{' '}
                {pluralize(item.name, item.quantity - quantity)}
              </i>
            </Typography>
            <NumericCounterField
              backgroundColor="white"
              value={quantity}
              onChange={(i) => {
                if (i > item.quantity) {
                  return;
                }
                onChange(i);
              }}
            />
            <Typography
              typography={{ xs: 'body3', mobile1: 'body2' }}
              textAlign="center"
            >
              <i>
                Total Damage: {Math.floor(damage * quantity * resistance)}{' '}
                {ELEMENT_LABEL[element]} Damage
              </i>
            </Typography>
          </Column>
        </Collapse>
      </Column>
    </Box>
  );
};

const LoginToFight: React.FC<{ battleId: number }> = ({ battleId }) => {
  return (
    <Column alignItems="center" textAlign="center">
      <Typography variant="h6">You must be logged in to fight!</Typography>
      <Typography variant="body2">
        Log in or sign up to use your items in combat.
      </Typography>
      <Button
        variant="arcade"
        color="warning"
        startIcon={<Login />}
        fullWidth
        size="large"
        sx={{ mt: 2 }}
        href={routes.login.path({
          query: {
            redirect: routes.battle.path({
              params: { battleId },
            }),
          },
        })}
      >
        Log in to fight
      </Button>
    </Column>
  );
};

const NoCombatItems = () => {
  return (
    <Box
      sx={{
        mt: 1,
        display: 'grid',
        gap: 1,
        width: '100%',
        textAlign: 'center',
      }}
    >
      <Typography variant="body1" fontWeight={700}>
        You don't have any combat items.
      </Typography>
      <Button
        variant="arcade"
        color="warning"
        size="large"
        startIcon={<OpenInNew />}
        target="_blank"
        href={routes.help.inventory.path({
          bookmark: HelpInventoryQuestions.FindingItems,
        })}
      >
        Find Items
      </Button>
    </Box>
  );
};

const MobDefeated = () => {
  return (
    <Column alignItems="center" textAlign="center" mt={1}>
      <Typography variant="h6">This boss has been defeated!</Typography>
      <Typography variant="body2">Loot is being distributed...</Typography>
    </Column>
  );
};

const OverkillModal: React.FC<
  ModalWrapper<{ onConfirm: () => void; battle: BattleSchema; damage: number }>
> = ({ open, onClose, onConfirm, battle, damage }) => {
  const handleClose = () => onClose?.({}, 'backdropClick');
  return (
    <InfoModal open={open} onClose={handleClose} maxWidth={440}>
      <Column gap={1}>
        <MonsterHeader
          battle={{ ...battle, health: battle.health - damage }}
          error
        />
        <Divider sx={{ mt: 2, mb: 1 }} />
        <Typography variant="h5" textAlign="center">
          Overkill Alert!
        </Typography>

        <Typography textAlign="center">
          Are you sure you want to deal{' '}
          <b>{Math.abs(battle.health - damage)}</b> more damage than the boss
          has health?
        </Typography>

        <Typography textAlign="center" fontStyle="italic">
          This will not increase your damage dealt or rewards.
        </Typography>

        <Button
          variant="arcade"
          onClick={onConfirm}
          startIcon={<Sword />}
          size="large"
          color="error"
          sx={{ my: 1 }}
        >
          Confirm Overkill
        </Button>
        <Button
          color="primary"
          variant="arcade"
          size="large"
          onClick={handleClose}
          startIcon={<ArrowBack />}
        >
          Go Back
        </Button>
      </Column>
    </InfoModal>
  );
};
