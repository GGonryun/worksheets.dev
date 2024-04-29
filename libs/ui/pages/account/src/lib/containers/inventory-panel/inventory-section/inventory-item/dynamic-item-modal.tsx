import { ArrowBack, ArrowForward, FavoriteBorder } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { ItemType } from '@worksheets/prisma';
import { routes } from '@worksheets/routes';
import { trpc } from '@worksheets/trpc-charity';
import { ErrorComponent } from '@worksheets/ui/components/errors';
import { Column, Row } from '@worksheets/ui/components/flex';
import { NumericCounterField } from '@worksheets/ui/components/inputs';
import {
  ExpiringItemIcon,
  InventoryItemDescription,
  ItemModalLayout,
} from '@worksheets/ui/components/items';
import { PulsingLogo } from '@worksheets/ui/components/loading';
import { ModalWrapper } from '@worksheets/ui/components/modals';
import { useSnackbar } from '@worksheets/ui/components/snackbar';
import { Redirect } from '@worksheets/ui-core';
import { FriendsPanels, InventoryPanels } from '@worksheets/util/enums';
import { assertNever } from '@worksheets/util/errors';
import { capitalizeFirstLetter } from '@worksheets/util/strings';
import { parseTRPCClientErrorMessage } from '@worksheets/util/trpc';
import { Friend, InventoryItemSchema } from '@worksheets/util/types';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import pluralize from 'pluralize';
import React from 'react';

const ACTION_LABEL: Record<ItemType, string> = {
  STEAM_KEY: 'Claim',
  CONSUMABLE: 'Use Item',
  SHARABLE: 'Share',
  COMBAT: 'Join Battle',
  ETCETERA: 'Sell Item',
  CURRENCY: 'N/A',
};

const ACTION_AVAILABLE: Record<ItemType, boolean> = {
  STEAM_KEY: true,
  CONSUMABLE: true,
  SHARABLE: true,
  COMBAT: true,
  ETCETERA: true,
  CURRENCY: false,
};

const ItemAction: React.FC<{
  item: InventoryItemSchema;
  onClick: () => void;
}> = ({ item, onClick }) => {
  return (
    <Button
      variant="arcade"
      color={'primary'}
      fullWidth
      size="small"
      onClick={onClick}
    >
      {ACTION_LABEL[item.type]}
    </Button>
  );
};

const ActivateItem: React.FC<{
  onClose: () => void;
  item: InventoryItemSchema;
}> = ({ item, onClose }) => {
  const { push } = useRouter();
  const snackbar = useSnackbar();
  const utils = trpc.useUtils();
  const [activating, setActivating] = React.useState(false);
  const activate = trpc.user.inventory.activate.useMutation();
  const handleActivation = async () => {
    try {
      setActivating(true);
      const result = await activate.mutateAsync(item.itemId);
      await utils.user.codes.activation.list.invalidate();
      await utils.user.inventory.items.invalidate();
      snackbar.success(
        <Column>
          <Typography>{result}</Typography>
          <Typography fontWeight={500}>
            A code has been sent to your email.
          </Typography>
        </Column>
      );
      push(
        routes.account.inventory.path({
          bookmark: InventoryPanels.ActivationCodes,
        })
      );
    } catch (error) {
      snackbar.error(parseTRPCClientErrorMessage(error));
    } finally {
      setActivating(false);
      onClose();
    }
  };

  if (activating) return <PulsingLogo message="Activating Steam Key..." />;

  return (
    <Column gap={2} textAlign="center" alignItems={'center'}>
      <Typography typography={{ xs: 'body2', sm: 'body1' }}>
        You will receive a random <b>Steam Key</b>. This action cannot be
        undone. Are you sure you want to proceed?
      </Typography>

      <Button
        variant="arcade"
        color="error"
        size="small"
        disabled={activating}
        onClick={handleActivation}
        sx={{
          width: 'fit-content',
        }}
      >
        Confirm Activation
      </Button>
      <Typography typography={'body3'} fontWeight={700}>
        A code will be sent to your email.
      </Typography>
    </Column>
  );
};

const ConsumeItem: React.FC<{
  onClose: () => void;
  item: InventoryItemSchema;
  verb: 'use' | 'sell';
}> = ({ item, onClose, verb }) => {
  const snackbar = useSnackbar();
  const utils = trpc.useUtils();
  const decrement = trpc.user.inventory.decrement.useMutation();
  const [quantity, setQuantity] = React.useState(1);
  const [consuming, setConsuming] = React.useState(false);

  const handleSetQuantity = (num: number) => {
    if (num < 1) return;
    if (num > item.quantity) return;
    setQuantity(num);
  };

  const handleConsumption = async () => {
    try {
      setConsuming(true);
      const result = await decrement.mutateAsync({
        itemId: item.itemId,
        quantity,
      });
      await utils.user.inventory.invalidate();
      snackbar.success(result);
    } catch (error) {
      snackbar.error(parseTRPCClientErrorMessage(error));
    } finally {
      onClose();
      setConsuming(false);
    }
  };

  if (consuming) return <PulsingLogo />;

  return (
    <Column gap={2} alignItems="center">
      <Typography typography={{ xs: 'body2', sm: 'body1' }}>
        How many would you like to {verb}?
      </Typography>
      <Column gap={0.5} textAlign="center">
        <Typography typography={{ xs: 'body3', sm: 'body2' }}>
          <b>You own {item.quantity}</b> {pluralize(item.name, item.quantity)}
        </Typography>
        {verb === 'sell' && (
          <Typography typography={{ xs: 'body3', sm: 'body2' }}>
            {pluralize(item.name)} sell for <b>{item.value} tokens</b> each
          </Typography>
        )}
      </Column>
      <NumericCounterField value={quantity} onChange={handleSetQuantity} />
      <Button
        variant="arcade"
        color="success"
        size="small"
        disabled={consuming}
        sx={{ width: 'fit-content', px: 3 }}
        onClick={handleConsumption}
      >
        {consuming
          ? 'Loading...'
          : `${capitalizeFirstLetter(verb)} x${quantity}`}
      </Button>
    </Column>
  );
};

const ShareItem: React.FC<{
  item: InventoryItemSchema;
  onClose: () => void;
}> = ({ item, onClose }) => {
  const friends = trpc.user.friends.list.useQuery();

  const [friend, setFriend] = React.useState<Friend | undefined>(undefined);

  if (friends.isLoading) return <PulsingLogo />;
  if (friends.isError) return <ErrorComponent />;

  return (
    <Column gap={2} alignItems="center">
      {!friend ? (
        friends.data.length ? (
          <SelectFriend
            friends={friends.data}
            onSelect={(friend) => setFriend(friend)}
          />
        ) : (
          <NoFriendsWarning />
        )
      ) : (
        <SelectQuantity
          item={item}
          friend={friend}
          onClose={onClose}
          onBack={() => setFriend(undefined)}
        />
      )}
    </Column>
  );
};

const SelectQuantity: React.FC<{
  item: InventoryItemSchema;
  friend: Friend;
  onClose: () => void;
  onBack: () => void;
}> = (props) => {
  const snackbar = useSnackbar();
  const utils = trpc.useUtils();
  const share = trpc.user.inventory.share.useMutation();
  const [quantity, setQuantity] = React.useState(1);
  const [sharing, setSharing] = React.useState(false);
  const handleSetQuantity = (num: number) => {
    if (num < 1) return;
    if (num > props.item.quantity) return;
    setQuantity(num);
  };

  const handleShare = async () => {
    try {
      setSharing(true);
      const message = await share.mutateAsync({
        friendshipId: props.friend.friendshipId,
        itemId: props.item.itemId,
        quantity,
      });
      await utils.user.inventory.invalidate();
      snackbar.success(message);
    } catch (error) {
      snackbar.error(parseTRPCClientErrorMessage(error));
    } finally {
      props.onClose();
      setSharing(false);
    }
  };

  if (sharing) return <PulsingLogo />;

  return (
    <Column gap={2} alignItems="center">
      <Typography typography={{ xs: 'body2', sm: 'body1' }}>
        How many {pluralize(props.item.name)} would you like to share with{' '}
        {props.friend.username}?
      </Typography>
      <NumericCounterField value={quantity} onChange={handleSetQuantity} />
      <Row gap={1}>
        <Button
          variant="arcade"
          color="primary"
          size="small"
          onClick={props.onBack}
        >
          Back
        </Button>
        <Button
          variant="arcade"
          color="secondary"
          size="small"
          disabled={sharing}
          sx={{ width: 'fit-content', px: 3 }}
          onClick={handleShare}
        >
          Share
        </Button>
      </Row>
    </Column>
  );
};

const SelectFriend: React.FC<{
  friends: Friend[];
  onSelect: (friend: Friend) => void;
}> = (props) => {
  // TODO: Implement pagination on server side
  const [page, setPage] = React.useState(0);

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };
  const handlePrev = () => {
    setPage((prev) => prev - 1);
  };

  const items = props.friends.slice(page * 5, page * 5 + 5);

  return (
    <Column gap={2}>
      <Typography typography={{ xs: 'body2', sm: 'body1' }}>
        Who would you like to share this item with?
      </Typography>
      {items.map((friend) => (
        <FriendItem
          key={friend.friendshipId}
          friend={friend}
          onClick={() => props.onSelect(friend)}
        />
      ))}
      <Row justifyContent="space-between">
        <Button variant="square" onClick={handlePrev} disabled={page === 0}>
          <ArrowBack />
        </Button>
        <Button
          variant="square"
          onClick={handleNext}
          disabled={items.length < 5}
        >
          <ArrowForward />
        </Button>
      </Row>
    </Column>
  );
};

const FriendItem: React.FC<{ friend: Friend; onClick: () => void }> = (
  props
) => {
  return (
    <Button
      variant="arcade"
      size="small"
      color={props.friend.isFavorite ? 'secondary' : 'primary'}
      sx={{
        display: 'block',
        maxWidth: 210,
        px: 2,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      }}
      onClick={props.onClick}
    >
      {props.friend.username}
    </Button>
  );
};

const NoFriendsWarning = () => (
  <Column gap={2}>
    <Typography>You must add friends to share items.</Typography>
    <Button
      variant="arcade"
      color="secondary"
      sx={{ width: 'fit-content' }}
      startIcon={<FavoriteBorder />}
      href={routes.account.friends.path({
        bookmark: FriendsPanels.AddFriends,
      })}
    >
      Add Friends
    </Button>
  </Column>
);

const ItemContent: React.FC<{
  item: InventoryItemSchema;
  onClose: () => void;
}> = ({ item, onClose }) => {
  switch (item.type) {
    case 'STEAM_KEY':
      return <ActivateItem item={item} onClose={onClose} />;
    case 'CONSUMABLE':
      return <ConsumeItem item={item} onClose={onClose} verb="use" />;
    case 'SHARABLE':
      return <ShareItem item={item} onClose={onClose} />;
    case 'ETCETERA':
      return <ConsumeItem item={item} onClose={onClose} verb="sell" />;
    case 'COMBAT':
      return (
        <Redirect
          href={routes.battles.path()}
          placeholder={<PulsingLogo message={'Redirecting...'} />}
        />
      );
    case 'CURRENCY':
      return (
        <ErrorComponent message="Currency cannot be used. Contact Support." />
      );
    default:
      throw assertNever(item.type);
  }
};

const Container: React.FC<ModalWrapper<{ item: InventoryItemSchema }>> = ({
  open,
  onClose,
  item,
}) => {
  const [using, setUsing] = React.useState(false);

  const handleClose = () => {
    setUsing(false);
    onClose?.({}, 'escapeKeyDown');
  };

  const handleUsage = async () => {
    setUsing(true);
  };

  return (
    <ItemModalLayout
      open={open}
      onClose={handleClose}
      item={item}
      icon={Boolean(item.expiration.length) && <ExpiringItemIcon size={18} />}
      action={
        !using &&
        ACTION_AVAILABLE[item.type] && (
          <ItemAction item={item} onClick={handleUsage} />
        )
      }
      content={
        using ? (
          <ItemContent item={item} onClose={handleClose} />
        ) : (
          <InventoryItemDescription item={item} />
        )
      }
    />
  );
};

export const DynamicItemModal = dynamic(() => Promise.resolve(Container), {
  ssr: false,
  loading: () => null,
});
