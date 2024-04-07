import {
  CheckCircleOutline,
  Diversity1Outlined,
  FavoriteBorder,
  InfoOutlined,
} from '@mui/icons-material';
import { Link } from '@mui/material';
import {
  ValentinesHearts,
  ValentinesMailbox,
  ValentinesSearch,
} from '@worksheets/icons/valentines';
import { WebHeart } from '@worksheets/icons/web';
import { routes } from '@worksheets/routes';
import { Panel } from '@worksheets/ui/components/panels';
import { FriendsPanels } from '@worksheets/util/enums';
import { Follower, Friend } from '@worksheets/util/types';

import { CollapsibleSection } from '../../components';
import { SendGiftsSection } from './sections';
import { AddFriendsSection } from './sections/add-friends-section';
import { FriendsListSection } from './sections/friends-list-section';
import { GiftBoxSection } from './sections/gift-box-section';

export const FriendsPanel: React.FC<{
  addFriendCode?: string;
  bookmark: FriendsPanels | undefined;
  friends: Friend[];
  followers: Follower[];
  refreshTimestamp: number;
  giftsRemaining: number;
  friendCode?: string;
  giftBoxes: number;
  onRemove: (friend: Friend) => void;
  onFavorite: (friend: Friend) => void;
  onAdd: (code: string) => void;
  onSendGift: (friend: Friend) => void;
  onClaimGiftBox: () => void;
}> = (props) => {
  const canSendGifts = props.giftsRemaining > 0;

  return (
    <Panel
      bookmark={props.bookmark}
      header={{
        primary: 'Friends',
        secondary: `${props.friends.length} friends`,
        icon: <WebHeart fontSize="large" />,
      }}
      footer={{
        learn: { text: 'Friends', href: routes.help.friends.path() },
      }}
      note={{
        content: (
          <>
            {' '}
            Earn tokens when people play games with our{' '}
            <Link href={routes.account.referrals.path()}>Referral Program</Link>
            .
          </>
        ),
      }}
      sections={(active, toggle) => (
        <>
          <CollapsibleSection
            id={FriendsPanels.AddFriends}
            text="Add Friends"
            description="Play with friends and earn more tokens for prizes."
            Icon={ValentinesSearch}
            status={<FavoriteBorder fontSize="large" color="error" />}
            active={active}
            onClick={toggle}
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
            description="Manage your followers, friends, and favorites."
            Icon={ValentinesHearts}
            status={<Diversity1Outlined fontSize="large" color="error" />}
            active={active}
            onClick={toggle}
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
            onClick={toggle}
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

          <GiftBoxSection
            id={FriendsPanels.GiftBoxes}
            active={active}
            onClick={toggle}
            amount={props.giftBoxes}
            onClaim={props.onClaimGiftBox}
          />
        </>
      )}
    />
  );
};
