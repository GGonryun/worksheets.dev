import { Box, Link, Typography } from '@mui/material';
import { FriendsPanels, TokensPanels } from '@worksheets/util/enums';
import { MAX_DAILY_GIFT_BOX_SHARES } from '@worksheets/util/settings';
import { QuestionAnswer } from '@worksheets/util/types';

import { HelpfulLinks } from '../helpful-links';

export const helpFriends: QuestionAnswer[] = [
  {
    id: 'what-are-friends',
    question: 'What are friends?',
    summary: `Friends are other users who you have added to your friends list. You can send gifts to your friends to help them enter raffles and win prizes.`,
    answer: (
      <Box>
        <Typography>
          Friends are other users who you have added to your friends list. You
          can send gifts to your friends to help them enter raffles and win
          prizes.
          <br />
          <br />
          You can also earn tokens for prizes by inviting friends to join
          Charity.Games.
        </Typography>
        <br />
        <HelpfulLinks
          links={[
            { href: '/account/friends', text: 'See Your Friends' },
            {
              href: '/help/tokens#what-is-a-gift-box',
              text: 'Learn more about Gift Boxes',
            },
            {
              href: '/help/referrals',
              text: 'Learn more about Referrals',
            },
          ]}
        />
      </Box>
    ),
  },
  {
    id: 'what-are-followers',
    question: 'What are followers?',
    summary:
      'Followers are other users who have added you to their friends list.',
    answer: (
      <Box>
        <Typography>
          Followers are other users who have added you to their friends list.
          You cannot send gifts to your followers, but you can send gifts to
          your friends. If you add another user's friend code, they will be
          added to your friends list and you will be added to their followers
          list.
        </Typography>
        <br />
        <HelpfulLinks
          links={[
            { href: '/account/friends', text: 'See Your Friends' },
            {
              href: '/help/tokens#what-is-a-gift-box',
              text: 'Learn more about Gift Boxes',
            },
            {
              href: '/help/referrals',
              text: 'Learn more about Referrals',
            },
          ]}
        />
      </Box>
    ),
  },
  {
    id: 'how-do-i-remove-a-friend',
    question: 'How do I remove a friend?',
    summary:
      'You can remove a friend by visiting your account settings and clicking the remove button next to their name.',
    answer: (
      <Box>
        <Typography>
          You can remove a friend by visiting your{' '}
          <Link href={`/account/friends#${FriendsPanels.FriendsList}`}>
            Friends List
          </Link>{' '}
          in your account settings and clicking the remove button next to their
          name.
          <br />
          <br />
          You cannot remove friends if you've marked them as{' '}
          <Link href="/help/friends#what-is-a-best-friend">Best Friends</Link>.
        </Typography>
        <br />
        <HelpfulLinks
          links={[
            { href: '/account/friends', text: 'See Your Friends' },
            {
              href: '/help/friends#what-is-a-best-friend',
              text: 'Learn more about Best Friends',
            },
          ]}
        />
      </Box>
    ),
  },
  {
    id: 'what-is-a-best-friend',
    question: 'What is a Best Friend?',
    summary:
      "A Best Friend is a friend who you've marked as a Best Friend. You can only have one Best Friend at a time.",
    answer: (
      <Box>
        <Typography>
          A Best Friend is a friend who you've marked as a Best Friend. There is
          no limit to the number of friends or best friends that you can have.
          Marking another user as a best friend will keep them at the top of
          your friends list and display them as your best friend on your public
          profile.
          <br />
          <br />
          You can mark a friend as your Best Friend by visiting your{' '}
          <Link href={`/account/friends#${FriendsPanels.FriendsList}`}>
            Friends List
          </Link>{' '}
          in your account settings and clicking the heart next to their name.
          <br />
          <br />
          You cannot remove a friend if you've marked them as your Best Friend.
        </Typography>
        <br />
        <HelpfulLinks
          links={[
            { href: '/account/friends', text: 'See Your Friends' },
            {
              href: '/help/friends#how-do-i-remove-a-friend',
              text: 'Learn more about Removing Friends',
            },
          ]}
        />
      </Box>
    ),
  },
  {
    id: 'why-should-i-invite-friends',
    question: 'Why should I invite friends?',
    summary: `Invite friends to Charity.Games and earn tokens for prizes!`,
    answer: (
      <Box>
        <Typography>
          Inviting friends to play with you unlocks bonus features such as
          Gifting. Gifting allows you to send tokens to your friends to help
          them enter raffles and win prizes.
          <br />
          <br />
          You can also earn tokens for prizes by inviting friends to join
          Charity.Games.
        </Typography>
        <br />
        <HelpfulLinks
          links={[
            {
              href: '/help/referrals',
              text: 'Learn more about Referrals',
            },
            {
              href: '/help/prizes',
              text: 'Learn more about Prizes',
            },
            {
              href: '/help/tokens#what-are-tokens',
              text: 'Learn more about Tokens',
            },
          ]}
        />
      </Box>
    ),
  },
  {
    id: 'how-do-i-invite-friends',
    question: 'How do I invite friends?',
    summary: `You can invite friends by sharing your referral link. You can find your referral link in your account settings.`,
    answer: (
      <Box>
        <Typography>
          Other people can add you as a friend by sharing your friend code. You
          can find your friend code in your{' '}
          <Link href={`/account/friends#${FriendsPanels.AddFriends}`}>
            Account settings
          </Link>
          . When another user enters your friend code they will be added to your{' '}
          <Link href={`/account/friends#${FriendsPanels.FriendsList}`}>
            Friends List
          </Link>{' '}
          as a follower.
          <br />
          <br />
          If you add another user's friend code, they will be added to your{' '}
          <Link href={`/account/friends#${FriendsPanels.FriendsList}`}>
            Friends list
          </Link>{' '}
          and you will be added to their follower's list.
          <br />
          <br />
          If you are friends with another user you can send them a{' '}
          <Link href={'/help/friends#what-is-a-gift-box'}>
            free gift box
          </Link>{' '}
          to help them enter raffles and win prizes.
        </Typography>
        <br />
        <HelpfulLinks
          links={[
            { href: '/account/friends', text: 'See Your Friends' },
            {
              href: `/account/tokens#${TokensPanels.GiftBoxes}`,
              text: 'See Your Tokens',
            },
            {
              href: '/help/tokens#what-is-a-gift-box',
              text: 'Learn more about Gift Boxes',
            },
            {
              href: '/help/referrals',
              text: 'Learn more about Referrals',
            },
          ]}
        />
      </Box>
    ),
  },
  {
    id: 'how-to-send-a-gift-box',
    question: 'How do I send a Gift Box?',
    summary:
      'You can send a Gift Box to a friend by adding them as a friend and then sending a gift through the accounts page.',
    answer: (
      <Box>
        <Typography>
          You can send gifts to people you've added as your friends. Add them as
          friends by visiting your{' '}
          <Link href={`/account/friends#${FriendsPanels.AddFriends}`}>
            Account settings
          </Link>{' '}
          and then send a gift through the{' '}
          <Link href={`/account/friends#${FriendsPanels.SendGifts}`}>
            Send Gifts
          </Link>{' '}
          section.
          <br />
          <br />
          You can find your friends by visiting your{' '}
          <Link href={`/account/friends#${FriendsPanels.FriendsList}`}>
            Friends List
          </Link>{' '}
          in your account settings.
          <br />
          <br />
          You can send a maximum of {MAX_DAILY_GIFT_BOX_SHARES} Gift Boxes per
          day. VIP members can send more Gift Boxes every day.
        </Typography>
        <HelpfulLinks
          links={[
            { href: '/account/friends', text: 'See Your Friends' },
            {
              href: '/help/tokens#what-is-a-gift-box',
              text: 'Learn more about Gift Boxes',
            },
            {
              href: '/help/vip',
              text: 'Learn more about VIP',
            },
          ]}
        />
      </Box>
    ),
  },
];
