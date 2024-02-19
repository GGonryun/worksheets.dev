import {
  CheckCircleOutline,
  Diversity1Outlined,
  FavoriteBorder,
  InfoOutlined,
} from '@mui/icons-material';
import { Box, Divider, Link, Typography } from '@mui/material';
import {
  ValentinesHearts,
  ValentinesMailbox,
  ValentinesSearch,
} from '@worksheets/icons/valentines';
import { WebHeart } from '@worksheets/icons/web';
import { routes } from '@worksheets/ui/routes';
import { FriendsPanels } from '@worksheets/util/enums';
import { Follower, Friend } from '@worksheets/util/types';

import { CollapsibleSection } from '../collapsible-section';
import { usePanelController } from '../hooks/use-panel-controller';
import { PanelFooter } from '../panel-footer';
import { PanelHeader } from '../panel-header';
import { SendGiftsSection } from './sections';
import { AddFriendsSection } from './sections/add-friends-section';
import { FriendsListSection } from './sections/friends-list-section';

export const FriendsPanel: React.FC<{
  addFriendCode?: string;
  bookmark: FriendsPanels | undefined;
  friends: Friend[];
  followers: Follower[];
  refreshTimestamp: number;
  giftsRemaining: number;
  friendCode?: string;
  onRemove: (friend: Friend) => void;
  onFavorite: (friend: Friend) => void;
  onAdd: (code: string) => void;
  onSendGift: (friend: Friend) => void;
}> = (props) => {
  const { active, toggleActive } = usePanelController(props.bookmark);

  const canSendGifts = props.giftsRemaining > 0;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <PanelHeader
        primary="Friends"
        secondary={`${props.friends.length} friends`}
        icon={<WebHeart fontSize="large" />}
      />

      <Divider />

      <CollapsibleSection
        id={FriendsPanels.AddFriends}
        text="Add Friends"
        description="Play with friends and earn more tokens for prizes."
        Icon={ValentinesSearch}
        status={<FavoriteBorder fontSize="large" color="error" />}
        active={active}
        onClick={toggleActive}
      >
        <AddFriendsSection
          addFriendCode={props.addFriendCode}
          friendCode={props.friendCode}
          onAdd={props.onAdd}
        />
      </CollapsibleSection>

      <CollapsibleSection
        id={FriendsPanels.FriendsList}
        text="Friends List"
        description="Manage your followers, friends, and best friends."
        Icon={ValentinesHearts}
        status={<Diversity1Outlined fontSize="large" color="error" />}
        active={active}
        onClick={toggleActive}
      >
        <FriendsListSection
          followers={props.followers}
          friends={props.friends}
          onAdd={props.onAdd}
          onRemove={props.onRemove}
          onFavorite={props.onFavorite}
        />
      </CollapsibleSection>

      <CollapsibleSection
        id={FriendsPanels.SendGifts}
        text="Send Gifts"
        description="Earn a gift box for every friend you send a gift to."
        Icon={ValentinesMailbox}
        active={active}
        onClick={toggleActive}
        status={
          canSendGifts ? (
            <InfoOutlined fontSize="large" color="info" />
          ) : (
            <CheckCircleOutline fontSize="large" color="success" />
          )
        }
      >
        <SendGiftsSection
          canSendGifts={canSendGifts}
          friends={props.friends}
          giftsRemaining={props.giftsRemaining}
          refreshTimestamp={props.refreshTimestamp}
          onRemove={props.onRemove}
          onFavorite={props.onFavorite}
          onSendGift={props.onSendGift}
        />
      </CollapsibleSection>

      <Divider />

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <InfoOutlined color="info" fontSize="small" />
        <Typography>
          Earn tokens when people play games with our{' '}
          <Link href={routes.account.referrals.path()}>Referral Program</Link>.
        </Typography>
      </Box>
      <PanelFooter
        learn={{ text: 'Friends', href: routes.help.friends.path() }}
      />
    </Box>
  );
};
