import {
  Add,
  Close,
  InfoOutlined,
  Login,
  OpenInNew,
} from '@mui/icons-material';
import {
  alpha,
  Box,
  Button,
  Divider,
  IconButton,
  LinearProgress,
  Link,
  Typography,
} from '@mui/material';
import { Sword } from '@worksheets/icons/font-awesome-solid';
import { ItemType } from '@worksheets/prisma';
import { routes } from '@worksheets/routes';
import { trpc } from '@worksheets/trpc-charity';
import { ErrorComponent } from '@worksheets/ui/components/errors';
import { Column, Row } from '@worksheets/ui/components/flex';
import { ContainImage, FillImage } from '@worksheets/ui/components/images';
import { NumericCounterField } from '@worksheets/ui/components/inputs';
import { InventoryItem, RemoveItemIcon } from '@worksheets/ui/components/items';
import { LoadingBar } from '@worksheets/ui/components/loading';
import { Modal, ModalWrapper } from '@worksheets/ui/components/modals';
import {
  MonsterDetails,
  MonsterProfile,
} from '@worksheets/ui/components/monsters';
import { useSnackbar } from '@worksheets/ui/components/snackbar';
import {
  HelpInventoryQuestions,
  HelpMobsQuestions,
} from '@worksheets/util/enums';
import { calculatePercentage } from '@worksheets/util/numbers';
import { TABLET_SHADOW } from '@worksheets/util/styles';
import { BattleSchema, InventoryItemSchema } from '@worksheets/util/types';
import { useSession } from 'next-auth/react';
import pluralize from 'pluralize';
import React, { useState } from 'react';

export const BossBattle: React.FC<{ battle: BattleSchema }> = (props) => {
  return (
    <MonsterDetails
      monster={props.battle.mob}
      titleHref={routes.battle.path({
        params: {
          battleId: props.battle.id,
        },
      })}
      profile={<FightProfile battle={props.battle} />}
    />
  );
};

const FightProfile: React.FC<{ battle: BattleSchema }> = (props) => {
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
        infoButton={
          <InfoButton
            href={routes.monster.path({
              params: {
                monsterId: props.battle.mob.id,
              },
            })}
          />
        }
        healthBar={
          <HealthBar
            currentHp={props.battle.health}
            maxHp={props.battle.mob.maxHp}
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

const HealthBar: React.FC<{ currentHp: number; maxHp: number }> = (props) => {
  return (
    <LinearProgress
      variant="determinate"
      color="error"
      value={calculatePercentage(props.currentHp, props.maxHp)}
      sx={{
        height: 10,
        width: '100%',
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
          <Typography variant="body3" textAlign="center" fontWeight={700}>
            HP: {battle.health}/{battle.mob.maxHp}
          </Typography>
          <HealthBar currentHp={battle.health} maxHp={battle.mob.maxHp} />
          <Typography variant="body2" textAlign="center">
            {battle.mob.description}
          </Typography>
          <Divider sx={{ width: '100%' }} />
          {battle.health > 0 ? (
            <ItemSelection battle={battle} onClose={handleClose} />
          ) : (
            <MobDefeated />
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
  battle: BattleSchema;
  onClose: () => void;
}> = ({ battle, onClose }) => {
  const [selectedItems, setSelectedItems] = useState<InventoryItemSchema[]>([]);
  const [striking, setStriking] = useState(false);

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
      mobId: battle.mob.id,
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
      setStriking(true);
      const result = await strike.mutateAsync({
        battleId: battle.id,
        items: selectedItems,
      });
      await utils.maybe.battles.invalidate();
      snackbar.success(`You dealt ${result} damage to ${battle.mob.name}`);
    } catch (error) {
      snackbar.error('Failed to deal damage. Contact Support.');
    } finally {
      setStriking(false);
      onClose();
    }
  };

  if (items.isFetching) return <LoadingBar />;
  if (items.isError) return <ErrorComponent />;

  return (
    <Column gap={1} alignItems="center" width="100%">
      {connected && (
        <Row gap={1} flexWrap="wrap" justifyContent="center">
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
      <Column alignItems="center" gap={1} my={1} width="100%">
        {connected ? (
          <Button
            variant="arcade"
            color="error"
            fullWidth
            disabled={!selectedItems.length || damage.isError || striking}
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
                    battleId: battle.id,
                  },
                }),
              },
            })}
          >
            Log in to fight
          </Button>
        )}
        {(damage.data ?? 0) >= battle.health && (
          <Typography variant="body2" color="error" fontWeight={700}>
            {(damage.data ?? 0) > battle.health
              ? `You will overkill the boss with this attack.`
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

      <Row gap={1.5} flexWrap="wrap">
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
