import { routes } from '@worksheets/routes';
import { FriendsPanels, PrizesPanels } from '@worksheets/util/enums';
import { minutesAgo } from '@worksheets/util/time';
import { NotificationSchema } from '@worksheets/util/types';

export const mockNotifications: NotificationSchema[] = [
  {
    id: '1',
    text: 'This is a test of a system notification. Lorem ipsum dolor sit.',
    type: 'SYSTEM',
    read: true,
    createdAt: minutesAgo(5).getTime(),
  },
  {
    id: '2',
    text: `<b>GGonryun</b> has added you as a friend. Visit your <a href="${routes.account.friends.path(
      {
        bookmark: FriendsPanels.FriendsList,
      }
    )}">friends list</a> to add them back.`,
    type: 'FRIEND',
    read: false,
    createdAt: minutesAgo(10).getTime(),
  },
  {
    id: '3',
    text: `<b>You won a raffle!</b> Visit your <a href="${routes.account.prizes.path(
      {
        bookmark: PrizesPanels.Raffles,
      }
    )}}">prizes</a> to claim your reward.`,
    type: 'RAFFLE',
    read: false,
    createdAt: minutesAgo(15).getTime(),
  },
  {
    id: '30',
    text: `A raffle you're participating in is ending soon. Don't forget to <a href="${routes.prize.path(
      {
        params: {
          prizeId: 1,
        },
      }
    )}">purchase more raffle entries</a>!`,
    type: 'RAFFLE',
    read: false,
    createdAt: minutesAgo(20).getTime(),
  },
  {
    id: '42',
    text: `<b>GGonryun</b> has sent you a gift box! Visit your <a href="${routes.account.friends.path(
      {
        bookmark: FriendsPanels.GiftBoxes,
      }
    )}">account</a> to claim your reward.`,
    type: 'REWARD',
    read: false,
    createdAt: minutesAgo(45).getTime(),
  },
  {
    id: '5',
    text: `A new game has been added to the arcade! Play <a href="${routes.game.path(
      {
        params: {
          gameId: 'fruit-merge',
        },
      }
    )}">Fruit Merge</a> now!`,
    type: 'GAME',
    read: true,
    createdAt: minutesAgo(55).getTime(),
  },
  {
    id: '61',
    text: 'We have received your report. We will review it and take action as necessary. Thank you for your help!',
    type: 'SYSTEM',
    read: false,
    createdAt: minutesAgo(60).getTime(),
  },
  {
    id: '62',
    text: `We've identified suspicious activity on your account. Please <a href="${routes.contact.path()}">contact support</a> for assistance.`,
    type: 'SYSTEM',
    read: false,
    createdAt: minutesAgo(70).getTime(),
  },
  {
    id: '7',
    text: `A raffle has expired. Visit the <a href="${routes.admin.raffles.path()}">expired raffles</a> page to see the results.`,
    type: 'SYSTEM',
    read: false,
    createdAt: minutesAgo(80).getTime(),
  },
];
