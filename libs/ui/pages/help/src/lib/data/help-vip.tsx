import { Box, Typography } from '@mui/material';
import { ListItem, OrderedList } from '@worksheets/ui-core';
import { QuestionAnswer } from '@worksheets/util/types';

import { HelpfulLinks } from '../helpful-links';

export const helpVip: QuestionAnswer[] = [
  {
    id: 'what-is-vip',
    question: 'What is VIP?',
    summary: 'VIP is a membership program that offers exclusive benefits.',
    answer: (
      <Box>
        <Typography>
          The VIP membership program offers exclusive benefits to its members.
          VIP members receive additional tokens, gift boxes, and other perks.
          <br />
          <br />
          VIP Membership starts at less than $1 a month, or $10 a year.
          <br />
          <br />
          The VIP membership program is currently <b>in development</b> and will
          be available soon. You can join the wait list to be notified when VIP
          status becomes available.
        </Typography>
        <br />
        <HelpfulLinks
          links={[
            { text: 'Join the wait list', href: '/vip' },
            {
              text: 'Learn more about Tokens',
              href: '/help/tokens',
            },
            {
              text: 'Create an account',
              href: '/account',
            },
          ]}
        />
      </Box>
    ),
  },
  {
    id: 'what-are-the-benefits-of-vip',
    question: 'What are the benefits of VIP?',
    summary:
      'VIP members receive additional tokens, gift boxes, and other perks.',
    answer: (
      <Box>
        <Typography variant="h6">VIP Benefits</Typography>
        <OrderedList>
          <ListItem>Ad-Free Experience</ListItem>
          <ListItem>Additional tokens when playing games</ListItem>
          <ListItem>Additional gift boxes</ListItem>
          <ListItem>Access to exclusive events and promotions</ListItem>
          <ListItem>Bonus tickets when participating in raffles</ListItem>
          <ListItem>Free second chance raffles</ListItem>
          <ListItem>Priority support</ListItem>
        </OrderedList>
        <br />
        <HelpfulLinks
          links={[
            { text: 'Join the wait list', href: '/vip' },
            {
              text: 'Learn more about Tokens',
              href: '/help/tokens',
            },
            {
              text: 'Create an account',
              href: '/account',
            },
          ]}
        />
      </Box>
    ),
  },
  {
    id: 'how-do-i-become-a-vip-member',
    question: 'How do I become a VIP member?',
    summary: 'VIP membership is currently in development.',
    answer: (
      <Box>
        <Typography>
          <b>
            VIP membership is currently in development and will be available
            soon.
          </b>
          <br />
          <br />
          You can join the wait list to be notified when VIP becomes available.
        </Typography>
        <br />
        <HelpfulLinks
          links={[
            { text: 'Join the wait list', href: '/vip' },
            {
              text: 'Learn more about Tokens',
              href: '/help/tokens',
            },
            {
              text: 'Create an account',
              href: '/account',
            },
          ]}
        />
      </Box>
    ),
  },
];
