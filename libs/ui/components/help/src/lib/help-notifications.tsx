import { Notifications } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { routes } from '@worksheets/routes';
import { ListItem, OrderedList } from '@worksheets/ui-core';
import {
  HelpNotificationsQuestions,
  SettingsPanels,
} from '@worksheets/util/enums';
import { QuestionAnswer } from '@worksheets/util/types';

import { HelpfulLinks } from './helpful-links';

export const helpNotifications: QuestionAnswer[] = [
  {
    id: HelpNotificationsQuestions.Description,
    question: 'What are notifications?',
    summary:
      'Notifications are messages that are sent to you when something happens on the platform. For example, when you win a prize or if a referral signs up.',
    answer: (
      <Box>
        <Typography>
          Notifications are messages that are sent to you when something happens
          on the platform. For example, when you win a prize or if a referral
          signs up.
          <br />
          <br />
          We send both in-app and email notifications. More notification
          providers will be added in the future. You can manage your
          notifications in your account settings.
        </Typography>
        <br />
        <Typography variant="h6">Prize Notifications</Typography>
        <OrderedList>
          <ListItem>When you win a prize</ListItem>
          <ListItem>When a referral signs up</ListItem>
          <ListItem>When you find a gift box while playing a game.</ListItem>
          <ListItem>When someone starts following you.</ListItem>
        </OrderedList>
        <HelpfulLinks
          links={[
            {
              text: 'See my notifications',
              href: routes.account.notifications.path(),
            },
            {
              text: 'Change my notification settings',
              href: routes.account.path({
                bookmark: SettingsPanels.Communication,
              }),
            },
          ]}
        />
      </Box>
    ),
  },
  {
    id: HelpNotificationsQuestions.Viewing,
    question: 'How do I see my notifications?',
    summary: 'You can see your notifications by clicking on the bell icon.',
    answer: (
      <Box>
        <Typography>
          You must be logged in to see your notifications.
          <br />
          <br />
          You can see your notifications by clicking on the bell icon (
          <Notifications fontSize="small" sx={{ mb: -0.5 }} />) in the top right
          corner of the screen.
        </Typography>
        <br />
        <HelpfulLinks
          links={[
            {
              text: 'See my notifications',
              href: routes.account.notifications.path(),
            },
          ]}
        />
      </Box>
    ),
  },
  {
    id: HelpNotificationsQuestions.Disabling,
    question: 'How do I turn off notifications?',
    summary: 'You can manage your notifications in your account settings.',
    answer: (
      <Box>
        <Typography>
          <b>
            This feature is currently not enabled, only mandatory notifications
            are being sent to users. We will enable this feature in the future.
          </b>
          <br />
          <br />
          You can manage your notifications in your account settings.
          <br />
          <br />
          You can turn off notifications for specific events or completely turn
          off notifications.
        </Typography>
        <br />
        <HelpfulLinks
          links={[
            {
              text: 'Change my notification settings',
              href: routes.account.path({
                bookmark: SettingsPanels.Communication,
              }),
            },
          ]}
        />
      </Box>
    ),
  },
];
