import {
  ArrowBack,
  ArrowForward,
  FavoriteBorder,
  FeaturedVideoOutlined,
  LockOpenOutlined,
  OpenInNewOutlined,
} from '@mui/icons-material';
import { Box, Button, Divider, Link, Typography } from '@mui/material';
import { ItemType } from '@worksheets/prisma';
import { routes } from '@worksheets/routes';
import { trpc } from '@worksheets/trpc-charity';
import { WatchAdvertisement } from '@worksheets/ui/components/advertisements';
import { ErrorComponent } from '@worksheets/ui/components/errors';
import { Column, Row } from '@worksheets/ui/components/flex';
import { NumericCounterField } from '@worksheets/ui/components/inputs';
import {
  ExpiringItemIcon,
  InventoryItem,
  InventoryItemDescription,
  ItemDescription,
  ItemModalLayout,
  rarityIcon,
} from '@worksheets/ui/components/items';
import { PulsingLogo } from '@worksheets/ui/components/loading';
import { InfoModal, ModalWrapper } from '@worksheets/ui/components/modals';
import { useSnackbar } from '@worksheets/ui/components/snackbar';
import { Redirect } from '@worksheets/ui-core';
import {
  FriendsPanels,
  HelpInventoryQuestions,
  InventoryPanels,
} from '@worksheets/util/enums';
import { assertNever } from '@worksheets/util/errors';
import { capitalizeFirstLetter } from '@worksheets/util/strings';
import { parseTRPCClientErrorMessage } from '@worksheets/util/trpc';
import {
  CapsuleOptionSchema,
  Friend,
  InventoryCapsuleSchema,
  InventoryItemSchema,
} from '@worksheets/util/types';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import pluralize from 'pluralize';
import React, { useState } from 'react';

const ACTION_LABEL: Record<ItemType, string> = {
  STEAM_KEY: 'Claim',
  CONSUMABLE: 'Use Item',
  SHARABLE: 'Share',
  COMBAT: 'Join Battle',
  ETCETERA: 'Sell Item',
  CURRENCY: 'N/A',
  CAPSULE: 'Open Capsule',
};

const ACTION_AVAILABLE: Record<ItemType, boolean> = {
  STEAM_KEY: true,
  CONSUMABLE: true,
  SHARABLE: true,
  COMBAT: true,
  ETCETERA: true,
  CAPSULE: true,
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
            {pluralize(item.name)} sell for <b>{item.sell} tokens</b> each
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

const CapsuleItem: React.FC<{
  item: InventoryItemSchema;
}> = ({ item }) => {
  const snackbar = useSnackbar();
  const [showAdvertisement, setShowAdvertisement] = useState(false);
  const utils = trpc.useUtils();
  const capsule = trpc.user.inventory.capsule.get.useQuery(item);
  const open = trpc.user.inventory.capsule.open.useMutation();
  const award = trpc.user.inventory.capsule.award.useMutation();

  const handleNewCapsule = async () => {
    try {
      await open.mutateAsync(item);
      await utils.user.inventory.invalidate();
      await capsule.refetch();
      snackbar.success('You have opened a new capsule!');
    } catch (error) {
      snackbar.error(parseTRPCClientErrorMessage(error));
    }
  };

  const handleSubmitAdvertisement = async () => {
    if (!capsule.data) {
      return;
    }

    try {
      setShowAdvertisement(false);
      await award.mutateAsync({ capsuleId: capsule.data.id });

      await capsule.refetch();
      snackbar.success('You can now unlock an additional item!');
    } catch (error) {
      snackbar.error(parseTRPCClientErrorMessage(error));
    }
  };

  if (capsule.isLoading || open.isLoading || award.isLoading)
    return <PulsingLogo />;
  if (capsule.isError)
    return <ErrorComponent hideLogo message={capsule.error.message} />;

  return (
    <>
      <OpenCapsuleItem
        item={item}
        capsule={capsule.data}
        onWatchAdvertisement={() => setShowAdvertisement(true)}
        onNewCapsule={handleNewCapsule}
      />
      <WatchAdvertisementModal
        open={showAdvertisement}
        onClose={() => setShowAdvertisement(false)}
        onSubmit={handleSubmitAdvertisement}
      />
    </>
  );
};

const WatchAdvertisementModal: React.FC<{
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
}> = (props) => {
  return (
    <InfoModal open={props.open} onClose={props.onClose}>
      <Column p={2} gap={2}>
        <Column>
          <FeaturedVideoOutlined fontSize="large" color="info" />
          <Typography variant="h6">Watch an Advertisement</Typography>
          <Typography variant="body2" gutterBottom>
            Receive an extra unlock for your capsule after watching a short
            message from our sponsors.
          </Typography>
          <Divider />
        </Column>
        <WatchAdvertisement
          network="gruvian"
          onSubmit={props.onSubmit}
          buttonText="Watch Ad"
        />
      </Column>
    </InfoModal>
  );
};

const OpenCapsuleItem: React.FC<{
  item: InventoryItemSchema;
  capsule: InventoryCapsuleSchema;
  onWatchAdvertisement: () => void;
  onNewCapsule: () => void;
}> = ({ item, capsule, onWatchAdvertisement, onNewCapsule }) => {
  const needsMoreUnlocks = !capsule.unlocks && capsule.remaining > 0;
  const canEarnMoreUnlocks = capsule.remaining > capsule.unlocks;
  const availableCapsules = item.quantity - 1;
  return (
    <Column gap={2} width="fit-content">
      <Column>
        <Typography variant="body2" gutterBottom>
          <b>Selections Available:</b> {capsule.remaining}
        </Typography>

        <CapsuleOptions capsule={capsule} />
      </Column>

      <Column>
        <Typography variant="body2">
          <b>Unlocks Remaining:</b> {capsule.unlocks}
        </Typography>
        {Boolean(needsMoreUnlocks) && (
          <Typography variant="body2" color="error" fontWeight={500}>
            You have no more unlocks available. You can unlock more items by
            watching an advertisement.
          </Typography>
        )}
        {!capsule.remaining && (
          <Typography variant="body2">
            You have no more selections available.
          </Typography>
        )}
        <Box my={0.5} />

        <Button
          variant="arcade"
          color="secondary"
          size="small"
          disabled={!canEarnMoreUnlocks}
          startIcon={<FeaturedVideoOutlined />}
          onClick={onWatchAdvertisement}
        >
          Watch Ad
        </Button>
      </Column>

      <Column>
        <Typography variant="body2">
          <b>Available Capsules:</b> {availableCapsules}
        </Typography>
        {!!capsule.unlocks && (
          <Typography variant="body2">
            Use all your unlocks before opening another capsule.
          </Typography>
        )}
        {!capsule.remaining && (
          <Typography variant="body2">
            Open your next capsule to unlock more items.
          </Typography>
        )}
        <Box my={0.5} />
        <Button
          disabled={!!capsule.unlocks || !availableCapsules}
          variant="arcade"
          color="primary"
          size="small"
          startIcon={<LockOpenOutlined />}
          onClick={onNewCapsule}
        >
          Open Another Capsule
        </Button>
      </Column>
      <Row gap={0.5}>
        <Typography
          variant="body2"
          color="primary"
          component={Link}
          href={routes.help.inventory.path({
            bookmark: HelpInventoryQuestions.Capsules,
          })}
          target="_blank"
        >
          {item.name} Drop Rates
        </Typography>
        <OpenInNewOutlined color="info" fontSize="small" />
      </Row>
    </Column>
  );
};

const CapsuleOptions: React.FC<{ capsule: InventoryCapsuleSchema }> = ({
  capsule,
}) => {
  const snackbar = useSnackbar();
  const utils = trpc.useUtils();
  const unlock = trpc.user.inventory.capsule.unlock.useMutation();
  const [unlocking, setUnlocking] = React.useState(false);
  const handleUnlock = (option: CapsuleOptionSchema) => async () => {
    if (capsule.unlocks <= 0) {
      snackbar.warning('You have no more unlocks remaining');
      return;
    }
    try {
      setUnlocking(true);
      const result = await unlock.mutateAsync({
        optionId: option.id,
      });
      await utils.user.inventory.invalidate();
      snackbar.success(result.message);
    } catch (error) {
      snackbar.error(parseTRPCClientErrorMessage(error));
    } finally {
      setUnlocking(false);
    }
  };

  const options = capsule.options.sort((a, b) => a.position - b.position);

  if (unlocking) return <PulsingLogo message="Unlocking item..." />;
  // sort options

  return (
    <Column gap={1}>
      <Box
        sx={{
          display: 'grid',
          // 3 rows that fit the items
          gridTemplateColumns: `repeat(3, fit-content(33%))`,
          gap: 1,
        }}
      >
        {options.map((option) => (
          <CapsuleOption
            key={option.id}
            option={option}
            onUnlock={handleUnlock(option)}
          />
        ))}
      </Box>
    </Column>
  );
};

const CapsuleOption: React.FC<{
  option: CapsuleOptionSchema;
  onUnlock: () => void;
}> = ({ option, onUnlock }) => {
  const [open, setOpen] = React.useState(false);
  const handleSelect = () => {
    if (option.item) {
      return setOpen(true);
    } else {
      onUnlock();
    }
  };
  return (
    <>
      <InventoryItem
        icon={option.item?.rarity ? rarityIcon(option.item.rarity) : undefined}
        size={72}
        item={option.item ? { ...option, ...option.item } : undefined}
        onClick={handleSelect}
      />

      {option.item && (
        <ItemModalLayout
          item={option.item}
          content={<ItemDescription item={option.item} />}
          open={open}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
};

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
    case 'CAPSULE':
      return <CapsuleItem item={item} />;
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
