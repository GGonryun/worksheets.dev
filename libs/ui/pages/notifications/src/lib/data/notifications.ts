import {
  FriendsPanels,
  PrizesPanels,
  TokensPanels,
} from '@worksheets/util/enums';
import { minutesAgo } from '@worksheets/util/time';
import { NotificationSchema } from '@worksheets/util/types';

export const mockNotifications: NotificationSchema[] = [
  {
    id: '1',
    text: 'This is a test of a system notification. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum mi id, lacinia nunc.',
    type: 'SYSTEM',
    read: true,
    createdAt: minutesAgo(5).getTime(),
  },
  {
    id: '2',
    text: `<b>GGonryun</b> has added you as a friend. Visit your <a href="/account/friends#${FriendsPanels.AddFriends}">friends list</a> to add them back.`,
    type: 'FRIEND',
    read: false,
    createdAt: minutesAgo(10).getTime(),
  },
  {
    id: '3',
    text: `<b>You won a raffle!</b> Visit your <a href="/account/prizes#${PrizesPanels.Prizes}">prizes</a> to claim your reward.`,
    type: 'RAFFLE',
    read: false,
    createdAt: minutesAgo(15).getTime(),
  },
  {
    id: '30',
    text: `A raffle you're participating in is ending soon. Don't forget to <a href="/prizes/1">purchase more raffle tickets</a>!`,
    type: 'RAFFLE',
    read: false,
    createdAt: minutesAgo(20).getTime(),
  },
  {
    id: '40',
    text: `You found a gift box while playing <a href="/play/fruit-merge">Fruit Merge</a>! Visit your <a href="/account/tokens#${TokensPanels.GiftBoxes}">account</a> to claim your reward.`,
    type: 'REWARD',
    read: false,
    createdAt: minutesAgo(30).getTime(),
  },
  {
    id: '41',
    text: `Your daily reward has reset! Visit your <a href="/account/tokens#${TokensPanels.DailyReward}">account</a> to claim your daily reward.`,
    type: 'REWARD',
    read: false,
    createdAt: minutesAgo(40).getTime(),
  },
  {
    id: '42',
    text: `<b>GGonryun</b> has sent you a gift box! Visit your <a href="/account/tokens#${TokensPanels.GiftBoxes}">account</a> to claim your reward.`,
    type: 'REWARD',
    read: false,
    createdAt: minutesAgo(45).getTime(),
  },
  {
    id: '5',
    text: 'A new game has been added to the arcade! Play <a href="/play/fruit-merge">Fruit Merge</a> now!',
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
    text: 'We\'ve identified suspicious activity on your account. Please <a href="/contact">contact support</a> for assistance.',
    type: 'SYSTEM',
    read: false,
    createdAt: minutesAgo(70).getTime(),
  },
  {
    id: '7',
    text: 'A raffle has expired. Visit the <a href="/admin/raffles/expired">expired raffles</a> page to see the results.',
    type: 'SYSTEM',
    read: false,
    createdAt: minutesAgo(80).getTime(),
  },
];
