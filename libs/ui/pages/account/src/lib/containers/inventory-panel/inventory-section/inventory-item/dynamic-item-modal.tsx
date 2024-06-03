import {
  ArrowBack,
  ArrowForward,
  Close,
  FavoriteBorder,
  FeaturedVideoOutlined,
  LockOutlined,
  Loop,
  OpenInNewOutlined,
  StarBorder,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Divider,
  Link,
  Typography,
  useTheme,
} from '@mui/material';
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
import { InfoModal } from '@worksheets/ui/components/modals';
import { PrizeWheel } from '@worksheets/ui/components/prize-wheel';
import { useSnackbar } from '@worksheets/ui/components/snackbar';
import { useMediaQueryDown } from '@worksheets/ui/hooks/use-media-query';
import { Redirect } from '@worksheets/ui-core';
import {
  FriendsPanels,
  HelpInventoryQuestions,
  InventoryPanels,
} from '@worksheets/util/enums';
import { assertNever } from '@worksheets/util/errors';
import { MAX_CONSUMPTION_RATE } from '@worksheets/util/settings';
import { capitalizeFirstLetter, shorten } from '@worksheets/util/strings';
import { parseTRPCClientErrorMessage } from '@worksheets/util/trpc';
import {
  ACTION_AVAILABLE,
  ACTION_LABEL,
  CapsuleOptionSchema,
  Friend,
  InventoryCapsuleSchema,
  InventoryItemSchema,
  ItemSchema,
  PRIZE_WHEEL_COLORS,
} from '@worksheets/util/types';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import pluralize from 'pluralize';
import React, { useState } from 'react';

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
      snackbar.success(<Typography>{result}</Typography>);
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

  const handleSetQuantity = (num: number) => {
    if (num < 1) return;
    if (num > item.quantity) return;
    setQuantity(num);
  };

  const handleConsumption = async () => {
    try {
      const result = await decrement.mutateAsync({
        itemId: item.itemId,
        quantity,
      });
      snackbar.success(result);
    } catch (error) {
      snackbar.error(parseTRPCClientErrorMessage(error));
    } finally {
      onClose();
    }
    await utils.user.inventory.invalidate();
  };

  if (decrement.isLoading) return <PulsingLogo />;

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
        disabled={decrement.isLoading || quantity > MAX_CONSUMPTION_RATE}
        sx={{ width: 'fit-content', px: 3 }}
        onClick={handleConsumption}
      >
        {decrement.isLoading
          ? 'Loading...'
          : `${capitalizeFirstLetter(verb)} x${quantity}`}
      </Button>
      {quantity > MAX_CONSUMPTION_RATE && (
        <Typography
          typography={{ xs: 'body3', sm: 'body2' }}
          color="error"
          fontWeight={{ xs: 500, sm: 500 }}
        >
          You can only {verb} up to {MAX_CONSUMPTION_RATE} items at a time.
        </Typography>
      )}
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
  onClose: () => void;
}> = ({ item, onClose }) => {
  const snackbar = useSnackbar();
  const [showAdvertisement, setShowAdvertisement] = useState(false);
  const utils = trpc.useUtils();
  const capsule = trpc.user.inventory.capsule.get.useQuery(item);
  const close = trpc.user.inventory.capsule.close.useMutation();
  const award = trpc.user.inventory.capsule.award.useMutation();

  const handleCloseCapsule = async () => {
    try {
      await close.mutateAsync(item);
      snackbar.success('You have closed this capsule!');
    } catch (error) {
      snackbar.error(parseTRPCClientErrorMessage(error));
    }

    onClose();
    await utils.user.inventory.invalidate();
  };

  const handleSubmitAdvertisement = async () => {
    if (!capsule.data) {
      return;
    }

    try {
      await award.mutateAsync({ capsuleId: capsule.data.id });
      snackbar.success('You can now unlock an additional item!');
    } catch (error) {
      snackbar.error(parseTRPCClientErrorMessage(error));
    } finally {
      setShowAdvertisement(false);
    }
    await capsule.refetch();
  };

  if (capsule.isLoading || close.isLoading || award.isLoading)
    return <PulsingLogo />;
  if (capsule.isError)
    return <ErrorComponent hideLogo message={capsule.error.message} />;

  return (
    <>
      <OpenCapsuleItem
        item={item}
        capsule={capsule.data}
        onWatchAdvertisement={() => setShowAdvertisement(true)}
        onCloseCapsule={handleCloseCapsule}
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
      <Column gap={2}>
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
  onCloseCapsule: () => void;
}> = ({ item, capsule, onWatchAdvertisement, onCloseCapsule }) => {
  const needsMoreUnlocks = !capsule.unlocks && capsule.remaining > 0;
  const canEarnMoreUnlocks = capsule.remaining > capsule.unlocks;
  const availableCapsules = item.quantity - 1;
  return (
    <Column gap={2} width="fit-content">
      <Column gap={0.5}>
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
            Unlock more items by watching a message from our sponsors.
          </Typography>
        )}
        {!capsule.remaining && (
          <Typography variant="body2">No more selections available.</Typography>
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
        <Typography variant="body2">
          {capsule.unlocks
            ? 'Use all your unlocks before closing this capsule.'
            : ' Permanently close this capsule to open another.'}
        </Typography>
        <Box my={0.5} />
        <Button
          disabled={!!capsule.unlocks}
          variant="arcade"
          color="primary"
          size="small"
          startIcon={<LockOutlined />}
          onClick={onCloseCapsule}
        >
          Close Capsule
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
      await utils.user.inventory.capsule.get.invalidate();
      snackbar.success(result.message);
    } catch (error) {
      snackbar.error(parseTRPCClientErrorMessage(error));
    } finally {
      setUnlocking(false);
    }

    await utils.user.inventory.invalidate();
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

const PrizeWheelItem: React.FC<{
  item: InventoryItemSchema;
  onClose: () => void;
}> = ({ item }) => {
  const snackbar = useSnackbar();
  const utils = trpc.useUtils();
  const spin = trpc.user.inventory.prizeWheel.spin.useMutation();
  const [showSpinner, setShowSpinner] = React.useState(false);
  const [spins, setSpins] = React.useState(item.quantity);
  const [spinner, setSpinner] = React.useState<
    { items: ItemSchema[]; prize: ItemSchema } | undefined
  >(undefined);

  const handleStartSpinner = async () => {
    try {
      setSpinner(undefined);
      const data = await spin.mutateAsync({ itemId: item.itemId });
      setSpins((prev) => prev - 1);
      setSpinner(data);
      setShowSpinner(true);
    } catch (error) {
      snackbar.error(parseTRPCClientErrorMessage(error));
    }
  };

  const handleSkipAnimation = async () => {
    try {
      const data = await spin.mutateAsync({ itemId: item.itemId });
      setSpins((prev) => prev - 1);
      snackbar.success(`Congratulations! You won a ${data.prize.name}!`);
      utils.user.inventory.items.invalidate();
    } catch (error) {
      snackbar.error(parseTRPCClientErrorMessage(error));
    }
  };

  const handleClaim = (prize?: ItemSchema) => {
    if (!prize) return;
    snackbar.success(`Congratulations! You won a ${prize.name}!`);
  };

  const handleClose = async () => {
    utils.user.inventory.items.invalidate();
    setSpinner(undefined);
    setShowSpinner(false);
  };

  if (spin.isError) return <ErrorComponent message={spin.error.message} />;

  return (
    <>
      {spin.isLoading ? (
        <PulsingLogo message="Building a spinner..." />
      ) : (
        <Column gap={1} alignItems="center">
          <Typography
            typography={{ xs: 'body3', sm: 'body2' }}
            color="text.secondary"
            gutterBottom
          >
            You have{' '}
            <b>
              {spins} {pluralize('spin', spins)}
            </b>{' '}
            available.
          </Typography>
          <Button
            disabled={!spins}
            variant="arcade"
            color="primary"
            size="small"
            startIcon={<StarBorder />}
            onClick={handleStartSpinner}
            sx={{ minWidth: 200 }}
          >
            I'm Feeling Lucky!
          </Button>
          <Button
            disabled={!spins}
            variant="arcade"
            color="secondary"
            size="small"
            endIcon={<ArrowForward />}
            onClick={handleSkipAnimation}
            sx={{ minWidth: 200 }}
          >
            Skip Animation
          </Button>
        </Column>
      )}
      <PrizeWheelModal
        {...spinner}
        open={showSpinner}
        spins={spins}
        onSpin={handleStartSpinner}
        onClaim={handleClaim}
        onClose={handleClose}
      />
    </>
  );
};

const PrizeWheelModal: React.FC<{
  items?: ItemSchema[];
  prize?: ItemSchema;
  spins: number;
  open: boolean;
  onSpin: () => void;
  onClose: () => void;
  onClaim: (item?: ItemSchema) => void;
}> = ({ onSpin, onClose, onClaim, open, items, prize, spins }) => {
  const theme = useTheme();
  const isTiny = useMediaQueryDown('mobile1');
  const isMobile = useMediaQueryDown('sm');
  const [finished, setFinished] = React.useState(false);

  const handleSpin = () => {
    if (spins) {
      setFinished(false);
      onSpin();
    } else {
      onClose();
    }
  };

  return (
    <InfoModal
      open={open}
      onClose={() => {
        onClaim(prize);
        onClose();
      }}
    >
      <Column gap={2} alignItems="center" textAlign="center">
        <Column gap={0.5}>
          <Typography typography={{ xs: 'h5', mobile1: 'h4' }}>
            Spin the Wheel!
          </Typography>
          <Typography
            typography={{ xs: 'body3', sm: 'body2' }}
            color="text.secondary"
          >
            You have{' '}
            <b>
              {spins} {pluralize('spin', spins)}
            </b>{' '}
            available.
          </Typography>
        </Column>
        {!items || !prize ? (
          <PulsingLogo message="Selecting random items..." />
        ) : (
          <PrizeWheel
            segments={items.map((item) => item.name).map(shorten(15))}
            segColors={PRIZE_WHEEL_COLORS}
            winner={items.findIndex((p) => p.name === prize.name)}
            onFinished={() => {
              onClaim(prize);
              setFinished(true);
            }}
            primaryColor={theme.palette.text.primary}
            contrastColor={theme.palette.text.white}
            buttonText="Spin"
            isOnlyOnce={true}
            fontSize={isTiny ? `0.5rem` : isMobile ? `.75rem` : `1rem`}
            fontFamily={theme.typography.fontFamily}
            size={isTiny ? 120 : isMobile ? 155 : 180}
            outlineWidth={5}
            upDuration={200}
            downDuration={1000}
          />
        )}
        {!!spins && (
          <Button
            fullWidth
            disabled={!finished}
            startIcon={<Loop />}
            variant="arcade"
            color="secondary"
            onClick={handleSpin}
          >
            Spin Again
          </Button>
        )}
        <Button
          fullWidth
          disabled={!finished}
          startIcon={<Close />}
          variant="arcade"
          color="primary"
          onClick={onClose}
        >
          Close
        </Button>
      </Column>
    </InfoModal>
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
      return <CapsuleItem item={item} onClose={onClose} />;
    case 'PRIZE_WHEEL':
      return <PrizeWheelItem item={item} onClose={onClose} />;
    default:
      throw assertNever(item.type);
  }
};

const Container: React.FC<{
  item: InventoryItemSchema;
  onClose: () => void;
}> = ({ onClose, item }) => {
  const [using, setUsing] = React.useState(false);

  const handleClose = () => {
    setUsing(false);
    onClose();
  };

  const handleUsage = async () => {
    setUsing(true);
  };

  return (
    <ItemModalLayout
      open={true}
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
