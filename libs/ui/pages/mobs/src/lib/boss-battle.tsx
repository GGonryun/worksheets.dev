import {
  Add,
  ArrowDropDown,
  ArrowDropUp,
  Close,
  InfoOutlined,
  Login,
  OpenInNew,
} from '@mui/icons-material';
import {
  alpha,
  Box,
  Button,
  ButtonBase,
  Collapse,
  Divider,
  IconButton,
  LinearProgress,
  Link,
  styled,
  Typography,
  TypographyProps,
} from '@mui/material';
import { Trophy } from '@worksheets/icons/adventure';
import { Sword } from '@worksheets/icons/font-awesome-solid';
import { ItemType } from '@worksheets/prisma';
import { routes } from '@worksheets/routes';
import { trpc } from '@worksheets/trpc-charity';
import { ErrorComponent } from '@worksheets/ui/components/errors';
import { Column, Row } from '@worksheets/ui/components/flex';
import { ContainImage, FillImage } from '@worksheets/ui/components/images';
import { NumericCounterField } from '@worksheets/ui/components/inputs';
import {
  InventoryItem,
  ItemModalLayout,
  LootDescription,
  RemoveItemIcon,
} from '@worksheets/ui/components/items';
import { LoadingBar } from '@worksheets/ui/components/loading';
import { Modal, ModalWrapper } from '@worksheets/ui/components/modals';
import { useSnackbar } from '@worksheets/ui/components/snackbar';
import { useMediaQueryDown } from '@worksheets/ui/hooks/use-media-query';
import { PaletteColor } from '@worksheets/ui/theme';
import {
  HelpInventoryQuestions,
  HelpMobsQuestions,
} from '@worksheets/util/enums';
import { calculatePercentage, toPercentage } from '@worksheets/util/numbers';
import { TABLET_SHADOW } from '@worksheets/util/styles';
import {
  BossBattleSchema,
  InventoryItemSchema,
  LootSchema,
  MOB_ELEMENT_LABEL,
  MOB_ELEMENT_RESISTANCES,
  MOB_RACE_LABEL,
  MOB_SIZE_LABEL,
} from '@worksheets/util/types';
import { useSession } from 'next-auth/react';
import pluralize from 'pluralize';
import React, { useEffect, useState } from 'react';

const BORDER_KEY_2 = '2px solid grey';
const BORDER_KEY = '1px solid grey';

export const BossBattle: React.FC<{
  battle: BossBattleSchema;
}> = ({ battle }) => (
  <Box
    sx={{
      width: '100%',
      border: BORDER_KEY_2,
      borderRadius: (theme) => theme.shape.borderRadius,
      overflow: 'hidden',
      backgroundColor: (theme) => theme.palette.background.soft,
    }}
  >
    <TitleBar {...battle} />
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 0.5fr' },
      }}
    >
      <Box
        sx={{
          gridRow: { xs: 0, sm: 1 },
          borderRight: { xs: 'none', sm: BORDER_KEY },
          borderTop: { xs: BORDER_KEY, sm: 'none' },
        }}
      >
        <Stats {...battle} />
      </Box>
      <Box sx={{ gridRow: { xs: 1, sm: 0 } }}>
        <Profile mob={battle} />
      </Box>
      <Box
        sx={{
          display: { xs: 'none', md: 'block' },
          borderLeft: BORDER_KEY,
        }}
      >
        <Elements {...battle} />
      </Box>
    </Box>
    <Box
      sx={{
        display: { xs: 'block', md: 'none' },
        borderTop: BORDER_KEY,
      }}
    >
      <Elements {...battle} />
    </Box>
    <Loot {...battle} />
  </Box>
);

const TitleBar: React.FC<BossBattleSchema> = (mob) => (
  <Box
    sx={{
      display: { xs: 'flex', sm: 'grid' },
      justifyContent: { xs: 'space-between', sm: 'unset' },
      gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 0.5fr' },
      backgroundColor: (theme) => theme.palette.background['solid-blue'],
    }}
    gap={1}
    py={{ xs: 0.5, sm: 1 }}
    px={{ xs: 1, sm: 2 }}
  >
    <Typography variant="body1" fontWeight={900} color="text.arcade">
      {mob.name}
    </Typography>

    <Typography
      variant="body1"
      fontWeight={900}
      color="text.arcade"
      component={Link}
      underline="hover"
      href={routes.battle.path({ params: { battleId: mob.battleId } })}
    >
      Boss Battle #{mob.battleId}
    </Typography>

    <Typography
      variant="body1"
      fontWeight={900}
      color="text.arcade"
      textAlign="center"
      display={{ xs: 'none', md: 'block' }}
    >
      Resistances
    </Typography>
  </Box>
);

const Stats: React.FC<BossBattleSchema> = (mob) => {
  const isMobile = useMediaQueryDown('sm');
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    if (!isMobile) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [isMobile]);

  return (
    <Column width="100%">
      <Header
        open={open}
        onClick={() => setOpen(!open)}
        visible={{ xs: true, sm: false }}
      >
        Stats
      </Header>
      <Collapse in={open}>
        <Column
          sx={{
            '& > div': {
              borderBottom: BORDER_KEY,
            },
            '& > div:last-child': {
              borderBottom: 'none',
            },
          }}
        >
          <Data label={'Max HP'} value={mob.maxHp} />
          <Data label={'Current HP'} value={mob.currentHp} />
          <Data label={'Level'} value={mob.level} />
          <Data label={'Race'} value={MOB_RACE_LABEL[mob.race]} />
          <Data label={'Element'} value={MOB_ELEMENT_LABEL[mob.element]} />
          <Data label={'Size'} value={MOB_SIZE_LABEL[mob.size]} />
          <Data label={'Attack'} value={mob.attack} />
          <Data label={'Defense'} value={mob.defense} />
          <Data label={'Base Exp'} value={mob.baseExp} />
          <Data label={'MVP Exp'} value={mob.mvpExp} />
        </Column>
      </Collapse>
    </Column>
  );
};

const Data: React.FC<{
  label: string;
  value: string | number;
  color?: PaletteColor;
}> = ({ label, value, color }) => (
  <Row justifyContent="space-between" component="div">
    <DataCell
      fontWeight={900}
      variant="body2"
      sx={{
        borderRight: BORDER_KEY,
        color: (theme) => theme.palette.text.blue.darker,
        backgroundColor: (theme) =>
          alpha(theme.palette.background['solid-blue'], 0.2),
      }}
    >
      {label}
    </DataCell>
    <DataCell
      variant="body3"
      textAlign="right"
      sx={{
        color: (theme) =>
          color ? theme.palette[color].main : theme.palette.text.blue.darker,
      }}
    >
      {value}
    </DataCell>
  </Row>
);

const DataCell = styled((props: TypographyProps) => (
  <Typography fontWeight={500} {...props} />
))(({ theme }) => ({
  width: '100%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  padding: theme.spacing(0.5, 1),
}));

const Profile: React.FC<{ mob: BossBattleSchema }> = ({ mob }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box
        sx={{
          height: '100%',
          width: '100%',
          position: 'relative',
          display: 'grid',
          placeItems: 'center',
          p: { xs: 4, sm: 2 },
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
          }}
        >
          <LinearProgress
            variant="determinate"
            color={mob.currentHp === mob.maxHp ? 'success' : 'error'}
            value={calculatePercentage(mob.currentHp, mob.maxHp)}
            sx={{
              height: 10,
            }}
          />
        </Box>
        <Box
          position="relative"
          minWidth={150}
          minHeight={150}
          maxWidth={300}
          maxHeight={300}
        >
          <ContainImage src={mob.imageUrl} alt={mob.name} />
        </Box>
        <Box
          sx={{
            position: 'absolute',
            bottom: 8,
            left: 8,
          }}
        >
          <Button
            variant="square"
            color="primary"
            size="small"
            href={routes.help.mobs.path({
              bookmark: HelpMobsQuestions.Description,
            })}
          >
            <InfoOutlined />
          </Button>
        </Box>
        <Box
          sx={{
            position: 'absolute',
            bottom: 8,
            right: 8,
          }}
        >
          <Button
            variant="arcade"
            color={mob.currentHp > 0 ? 'error' : 'dark-grey'}
            size="small"
            onClick={() => setOpen(true)}
          >
            {mob.currentHp > 0 ? 'Fight' : 'Defeated'}
          </Button>
        </Box>
      </Box>
      <FightModal open={open} onClose={() => setOpen(false)} mob={mob} />
    </>
  );
};

const Elements: React.FC<BossBattleSchema> = (mob) => {
  const isSmall = useMediaQueryDown('md');
  const [open, setOpen] = React.useState(false);
  const resistances = MOB_ELEMENT_RESISTANCES[mob.element];

  useEffect(() => {
    if (!isSmall) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [isSmall]);

  return (
    <Box>
      <Header
        open={open}
        onClick={() => setOpen(!open)}
        visible={{ xs: true, sm: true, md: false }}
      >
        Resistances
      </Header>

      <Collapse in={open}>
        <Box
          width="100%"
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr 1fr',
              sm: '1fr 1fr',
              md: '1fr',
            },
            '& > div': {
              borderBottom: BORDER_KEY,
            },
            '& > div:last-child': {
              borderBottom: 'none',
            },
            '& > div:nth-of-type(odd)': {
              borderRight: { xs: BORDER_KEY, md: 'none' },
            },
            '& > div:nth-of-type(9)': {
              borderBottom: { xs: 'none', md: BORDER_KEY },
            },
          }}
        >
          <ResistanceData label="Neutral" resistance={resistances.neutral} />
          <ResistanceData label="Water" resistance={resistances.water} />
          <ResistanceData label="Earth" resistance={resistances.earth} />
          <ResistanceData label="Fire" resistance={resistances.fire} />
          <ResistanceData label="Wind" resistance={resistances.wind} />
          <ResistanceData label="Poison" resistance={resistances.poison} />
          <ResistanceData label="Holy" resistance={resistances.holy} />
          <ResistanceData label="Shadow" resistance={resistances.shadow} />
          <ResistanceData label="Ghost" resistance={resistances.ghost} />
          <ResistanceData label="Undead" resistance={resistances.undead} />
        </Box>
      </Collapse>
    </Box>
  );
};

const ResistanceData: React.FC<{ label: string; resistance: number }> = ({
  label,
  resistance,
}) => (
  <Data
    label={label}
    value={toPercentage(resistance)}
    color={resistance > 1 ? 'success' : resistance < 1 ? 'error' : undefined}
  />
);

const Header: React.FC<
  TypographyProps & {
    open?: boolean;
    onClick: () => void;
    visible?: { xs?: boolean; sm?: boolean; md?: boolean };
  }
> = ({ open, visible, onClick, ...props }) => {
  const Icon = open ? ArrowDropUp : ArrowDropDown;
  return (
    <Row
      justifyContent="center"
      onClick={onClick}
      sx={{
        display: visible
          ? {
              xs: visible.xs ? 'flex' : 'none',
              sm: visible.sm ? 'flex' : 'none',
              md: visible.md ? 'flex' : 'none',
            }
          : 'flex',
        backgroundColor: (theme) => theme.palette.background['solid-blue'],
      }}
    >
      <Typography
        variant="body2"
        {...props}
        sx={{
          textAlign: 'center',
          fontWeight: 900,
          color: (theme) => theme.palette.text.arcade,
          padding: (theme) => theme.spacing(0.25, 0.5),
        }}
      />
      <Icon
        sx={{
          color: (theme) => theme.palette.text.arcade,
        }}
      />
    </Row>
  );
};

const Banner = styled((props: TypographyProps) => (
  <Typography variant="body2" {...props} />
))(({ theme }) => ({
  textAlign: 'center',
  fontWeight: 900,
  color: theme.palette.text.red.light,
  padding: theme.spacing(0.25, 0.5),
  backgroundColor: alpha(theme.palette.background['solid-blue'], 0.1),
}));

const Loot: React.FC<BossBattleSchema> = (mob) => {
  const [open, setOpen] = React.useState(false);
  const isSmall = useMediaQueryDown('md');
  useEffect(() => {
    setOpen(!isSmall);
  }, [isSmall]);

  return (
    <Column>
      <Header open={open} onClick={() => setOpen(!open)}>
        All Loot
      </Header>
      <Collapse in={open}>
        <Column my={1} mx={2}>
          <Banner>Basic Loot</Banner>
          <Row
            columnGap={5}
            rowGap={2}
            justifyContent="space-evenly"
            flexWrap="wrap"
            p={1}
          >
            {mob.basicLoot.map((loot) => (
              <Item key={loot.item.id} {...loot} />
            ))}
          </Row>
          <Banner>MVP Loot</Banner>
          <Row
            columnGap={5}
            rowGap={2}
            justifyContent="space-evenly"
            flexWrap="wrap"
            p={1}
          >
            {mob.mvpLoot.slice(0, 1).map((loot) => (
              <Item key={loot.item.id} {...loot} />
            ))}
          </Row>
        </Column>
      </Collapse>
    </Column>
  );
};

const Item: React.FC<LootSchema> = (loot) => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Row gap={0.5}>
        <Box position="relative" height={20} width={20}>
          <FillImage src={loot.item.imageUrl} alt={loot.item.name} />
        </Box>
        <Typography
          variant="body2"
          fontWeight={500}
          component={ButtonBase}
          onClick={() => setOpen(true)}
          sx={{
            '&:hover': {
              color: (theme) => theme.palette.text.blue.darker,
              textDecoration: 'underline',
            },
          }}
        >
          {loot.quantity}x {loot.item.name} ({toPercentage(loot.chance)})
        </Typography>
      </Row>
      <ItemDetailsModal
        open={open}
        onClose={() => setOpen(false)}
        loot={loot}
      />
    </>
  );
};

const ItemDetailsModal: React.FC<ModalWrapper<{ loot: LootSchema }>> = ({
  open,
  onClose,
  loot,
}) => {
  return (
    <ItemModalLayout
      icon={loot.mvp && <Trophy sx={{ m: 0.5 }} />}
      item={{
        name: loot.item.name,
        imageUrl: loot.item.imageUrl,
      }}
      open={open}
      onClose={onClose}
      content={<LootDescription loot={loot} />}
      action={
        <Button
          variant="arcade"
          size="small"
          onClick={() => onClose?.({}, 'backdropClick')}
        >
          Close
        </Button>
      }
    />
  );
};

const FightModal: React.FC<ModalWrapper<{ mob: BossBattleSchema }>> = ({
  open,
  onClose,
  mob,
}) => {
  const handleClose = () => onClose?.({}, 'escapeKeyDown');

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          p: 2,
          gap: 2,
          position: 'relative',
          width: { xs: 290, mobile1: 320, sm: 360 },
        }}
      >
        <CloseButton onClick={handleClose} />
        <Column alignItems="center" gap={1}>
          <Column width="100%">
            <Typography variant="h5" textAlign="center">
              {mob.name}
            </Typography>
            <Divider />
          </Column>
          <Box
            sx={{
              position: 'relative',
              width: 128,
              height: 128,
              boxShadow: TABLET_SHADOW,
            }}
          >
            <ContainImage src={mob.imageUrl} alt={mob.name} />
          </Box>
          <Column width="100%" mt={1} gap={0.5}>
            <Typography variant="body3" textAlign="center" fontWeight={700}>
              HP: {mob.currentHp}/{mob.maxHp}
            </Typography>
            <LinearProgress
              variant="determinate"
              color={mob.currentHp === mob.maxHp ? 'success' : 'error'}
              value={calculatePercentage(mob.currentHp, mob.maxHp)}
              sx={{
                height: 10,
                width: '100%',
              }}
            />
          </Column>
          <Typography variant="body2" textAlign="center">
            {mob.description}
          </Typography>
          <Divider sx={{ width: '100%' }} />
          {mob.currentHp < 1 ? (
            <MobDefeated />
          ) : (
            <ItemSelection mob={mob} onClose={handleClose} />
          )}
        </Column>
      </Box>
    </Modal>
  );
};

const MobDefeated = () => {
  return (
    <Column alignItems="center" textAlign="center">
      <Typography variant="h6">This boss has been defeated!</Typography>
      <Typography variant="body2">Loot is being distributed...</Typography>
    </Column>
  );
};

const ItemSelection: React.FC<{
  mob: BossBattleSchema;
  onClose: () => void;
}> = ({ mob, onClose }) => {
  const [selectedItems, setSelectedItems] = useState<InventoryItemSchema[]>([]);

  const snackbar = useSnackbar();
  const session = useSession();
  const connected = session.status === 'authenticated';
  const utils = trpc.useUtils();
  const items = trpc.user.inventory.items.useQuery(
    [ItemType.COMBAT, ItemType.CURRENCY],
    {
      enabled: connected,
    }
  );
  const damage = trpc.maybe.battles.calculateDamage.useQuery(
    {
      mobId: mob.mobId,
      items: selectedItems,
    },
    {
      retry: false,
    }
  );
  const strike = trpc.user.battles.strike.useMutation();

  const handleSelect = (item: InventoryItemSchema) => {
    // check to see if item is already selected
    const index = selectedItems.findIndex(
      (i) => i.inventoryId === item.inventoryId
    );
    // if so increment the quantity
    if (index !== -1) {
      const newItems = [...selectedItems];
      newItems[index] = {
        ...newItems[index],
        quantity: newItems[index].quantity + item.quantity,
      };
      setSelectedItems(newItems);
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleRemove = (item: InventoryItemSchema) => {
    const newItems = selectedItems.filter(
      (i) => i.inventoryId !== item.inventoryId
    );
    setSelectedItems(newItems);
  };

  const availableItems = () => {
    // reduce the quantity of selected items from the available items
    return (
      items.data
        ?.map((item) => {
          const selected = selectedItems.find(
            (selected) => selected.inventoryId === item.inventoryId
          );
          if (selected) {
            return {
              ...item,
              quantity: item.quantity - selected.quantity,
            };
          }
          return item;
        })
        // filter out items with quantity less than 1
        .filter((item) => item.quantity > 0) ?? []
    );
  };

  const handleStrike = async () => {
    if (!connected) return;
    if (!selectedItems.length) return;
    if (damage.isLoading) return;
    if (damage.isError) return;
    if (damage.data === 0) return;
    try {
      const result = await strike.mutateAsync({
        battleId: mob.battleId,
        items: selectedItems,
      });
      await utils.maybe.battles.invalidate();
      snackbar.success(`You dealt ${result} damage to ${mob.name}`);
    } catch (error) {
      snackbar.error('Failed to deal damage. Contact Support.');
    } finally {
      onClose();
    }
  };

  if (items.isFetching) return <LoadingBar />;
  if (items.isError) return <ErrorComponent />;

  return (
    <Column gap={1} alignItems="center">
      {connected && (
        <Row gap={1}>
          {selectedItems.map((item) => (
            <InventoryItem
              size={56}
              key={item.inventoryId}
              item={item}
              icon={<RemoveItemIcon size={14} />}
              onClick={() => handleRemove(item)}
            />
          ))}
          <ItemBox items={availableItems()} onSelect={handleSelect} />
        </Row>
      )}
      <Column alignItems="center" gap={1} my={1}>
        {connected ? (
          <Button
            variant="arcade"
            color="error"
            disabled={!selectedItems.length || damage.isError}
            startIcon={
              selectedItems.length && !damage.isError ? <Sword /> : undefined
            }
            onClick={handleStrike}
          >
            {selectedItems.length
              ? damage.isLoading
                ? `Calculating Damage...`
                : damage.isError
                ? `Failed to calculate damage`
                : `Deal ${damage.data} Damage`
              : 'Select an item'}
          </Button>
        ) : (
          <Button
            variant="arcade"
            color="warning"
            startIcon={<Login />}
            href={routes.login.path({
              query: {
                redirect: routes.battle.path({
                  params: {
                    battleId: mob.battleId,
                  },
                }),
              },
            })}
          >
            Log in to fight
          </Button>
        )}
        {(damage.data ?? 0) >= mob.currentHp && (
          <Typography variant="body2" color="error" fontWeight={700}>
            {(damage.data ?? 0) > mob.currentHp
              ? ` You will overkill the boss with this attack.`
              : `You will defeat this boss with this attack.`}
          </Typography>
        )}

        {connected && (
          <Typography
            mt={1}
            component={Link}
            typography="body2"
            href={routes.help.mobs.path({
              bookmark: HelpMobsQuestions.HowDoIDealDamage,
            })}
          >
            How is damage calculated?
          </Typography>
        )}
      </Column>
    </Column>
  );
};

const ItemBox: React.FC<{
  items: InventoryItemSchema[];
  onSelect: (item: InventoryItemSchema) => void;
}> = ({ items, onSelect }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <IconButton
        disableRipple
        size="large"
        onClick={() => setOpen(true)}
        sx={{
          borderRadius: (theme) => theme.shape.borderRadius,
          border: (theme) =>
            `3px solid ${alpha(theme.palette.primary.main, 0.5)}`,
        }}
      >
        <Add
          fontSize="large"
          sx={{ color: (theme) => alpha(theme.palette.primary.main, 0.5) }}
        />
      </IconButton>
      <SelectCombatItemModal
        open={open}
        onClose={() => setOpen(false)}
        onSelect={onSelect}
        items={items}
      />
    </>
  );
};

const SelectCombatItemModal: React.FC<
  ModalWrapper<{
    items: InventoryItemSchema[];
    onSelect: (item: InventoryItemSchema) => void;
  }>
> = ({ open, onClose, items, onSelect }) => {
  const [item, setItem] = useState<InventoryItemSchema | undefined>(undefined);

  const handleClose = () => {
    setItem(undefined);
    onClose?.({}, 'escapeKeyDown');
  };

  const handleSelect = (item: InventoryItemSchema) => {
    onSelect(item);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          display: 'grid',
          p: 2,
          gap: 2,
          position: 'relative',
          width: { xs: 290, mobile1: 320, sm: 360 },
        }}
      >
        <CloseButton onClick={handleClose} />

        {item ? (
          <SelectQuantity
            item={item}
            onCommit={(quantity) =>
              handleSelect({
                ...item,
                quantity,
              })
            }
          />
        ) : (
          <CombatItems availableItems={items} onSelect={setItem} />
        )}
      </Box>
    </Modal>
  );
};

const SelectQuantity: React.FC<{
  item: InventoryItemSchema;
  onCommit: (quantity: number) => void;
}> = ({ item, onCommit }) => {
  const [quantity, setQuantity] = useState(1);
  const updateQuantity = (value: number) => {
    if (value < 1) return;
    if (value > item.quantity) return;
    setQuantity(value);
  };
  return (
    <Column gap={2} width="100%">
      <Column width="100%">
        <Typography variant="h5">Select Quantity</Typography>
        <Divider sx={{ width: '100%' }} />
      </Column>
      <Row alignItems="flex-start" gap={2}>
        <Box
          sx={{
            position: 'relative',
            minHeight: { xs: 64, mobile1: 72, sm: 96 },
            minWidth: { xs: 64, mobile1: 72, sm: 96 },
            borderRadius: (theme) => theme.shape.borderRadius,
            p: 1,
            boxShadow: TABLET_SHADOW,
          }}
        >
          <FillImage src={item.imageUrl} alt={item.name} />
        </Box>
        <Column gap={0.5}>
          <Typography
            typography={{ xs: 'body2', mobile1: 'body1' }}
            fontWeight={{ xs: 700, mobile1: 700 }}
          >
            {item.name}
          </Typography>
          <Typography typography={{ xs: 'body3', mobile1: 'body2' }}>
            {item.description}
          </Typography>
        </Column>
      </Row>

      <Column gap={1}>
        <Typography
          typography={{ xs: 'body3', mobile1: 'body2' }}
          textAlign="center"
        >
          <i>
            {item.quantity} {pluralize(item.name, item.quantity)} available
          </i>
        </Typography>
        <NumericCounterField value={quantity} onChange={updateQuantity} />
      </Column>
      <Button
        variant="arcade"
        color="error"
        sx={{ mt: 1 }}
        onClick={() => onCommit(quantity)}
      >
        Use {quantity} {pluralize(item.name, quantity)}
      </Button>
    </Column>
  );
};

const CombatItems: React.FC<{
  availableItems: InventoryItemSchema[];
  onSelect: (item: InventoryItemSchema) => void;
}> = ({ availableItems, onSelect }) => {
  return (
    <Column gap={1} width="100%" alignItems="center">
      <Column width="100%">
        <Typography variant="h5">Select Combat Item</Typography>
        <Divider sx={{ width: '100%' }} />
      </Column>

      <Row gap={1}>
        {availableItems.length ? (
          availableItems.map((item) => (
            <InventoryItem
              key={item.inventoryId}
              item={item}
              onClick={() => onSelect(item)}
            />
          ))
        ) : (
          <NoCombatItems />
        )}
      </Row>
    </Column>
  );
};

const NoCombatItems = () => {
  return (
    <Box
      sx={{
        display: 'grid',
        gap: 1,
        width: '100%',
        textAlign: 'center',
      }}
    >
      <Typography variant="body2">
        You don't have any items to use in combat.
      </Typography>
      <Button
        variant="arcade"
        color="warning"
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

const CloseButton: React.FC<{ onClick: () => void }> = (props) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 6,
        right: 6,
      }}
    >
      <IconButton
        onClick={props.onClick}
        size="small"
        disableRipple
        sx={{
          p: '3px',
          background: (theme) => theme.palette.primary.gradient,
        }}
      >
        <Close fontSize="small" color="white" />
      </IconButton>
    </Box>
  );
};
