import { Diversity1Outlined, FavoriteBorder } from '@mui/icons-material';
import { Link } from '@mui/material';
import {
  ValentinesHearts,
  ValentinesSearch,
} from '@worksheets/icons/valentines';
import { routes } from '@worksheets/routes';
import { Panel } from '@worksheets/ui/components/panels';
import { FriendsPanels } from '@worksheets/util/enums';
import { Follower, Friend } from '@worksheets/util/types';

import { CollapsibleSection } from '../../components';
import { ProfileButtonContainer } from '../../containers/profile-button-container';
import { AddFriendsSection } from './sections/add-friends-section';
import { FriendsListSection } from './sections/friends-list-section';

export const FriendsPanel: React.FC<{
  addFriendCode?: string;
  bookmark: FriendsPanels | undefined;
  following: Friend[];
  followers: Follower[];
  refreshTimestamp: number;
  friendCode: string;
  giftBoxes: number;
  onRemove: (friend: Friend) => void;
  onFavorite: (friend: Friend) => void;
  onAdd: (code: string) => void;
}> = (props) => {
  return (
    <Panel
      bookmark={props.bookmark}
      header={{
        primary: 'Friends',
        icon: <ProfileButtonContainer />,
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
            description="Manage who you follow, see your followers, and pick your favorites."
            Icon={ValentinesHearts}
            status={<Diversity1Outlined fontSize="large" color="error" />}
            active={active}
            onClick={toggle}
          >
            <FriendsListSection
              followers={props.followers}
              following={props.following}
              onAdd={props.onAdd}
              onRemove={props.onRemove}
              onFavorite={props.onFavorite}
            />
          </CollapsibleSection>
        </>
      )}
    />
  );
};
