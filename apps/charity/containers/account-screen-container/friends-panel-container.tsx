import { Friend, FriendsPanel } from '@worksheets/ui/pages/account';

export const FriendsPanelContainer: React.FC = (props) => {
  return (
    <FriendsPanel
      friends={[]}
      refreshTimestamp={0}
      giftsRemaining={0}
      friendCode={''}
      onRemove={function (friend: Friend): void {
        throw new Error('Function not implemented.');
      }}
      onFavorite={function (friend: Friend): void {
        throw new Error('Function not implemented.');
      }}
    />
  );
};
