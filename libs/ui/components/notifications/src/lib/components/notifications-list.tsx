import {
  Diversity1,
  HowToVote,
  LocalActivity,
  Mail,
  SportsMma,
  SquareOutlined,
  StarBorder,
  VideogameAsset,
} from '@mui/icons-material';
import { alpha, Box, Typography } from '@mui/material';
import { CharityGamesLogo } from '@worksheets/icons/native';
import { NotificationType } from '@worksheets/prisma';
import { HTMLinator } from '@worksheets/ui-core';
import { printRelativeDate } from '@worksheets/util/time';
import { NotificationSchema } from '@worksheets/util/types';
import React, { ReactNode } from 'react';

export const NotificationsList: React.FC<{
  notifications: NotificationSchema[];
}> = ({ notifications }) => {
  return (
    <Box display="flex" flexDirection="column">
      {notifications.length === 0 && <EmptyNotificationsMessage />}
      {notifications.map((notification) => (
        <NotificationListItem key={notification.id} {...notification} />
      ))}
    </Box>
  );
};

const EmptyNotificationsMessage: React.FC = () => {
  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <CharityGamesLogo size={128} />
      <Typography variant="h6" align="center">
        You're all caught up!
      </Typography>
      <Typography align="center">
        We will notify you when you have new messages, rewards, and more.
      </Typography>
    </Box>
  );
};

const NotificationListItem: React.FC<NotificationSchema> = ({
  id,
  read,
  text,
  createdAt,
  type,
}) => (
  <Box
    key={id}
    display="flex"
    alignItems="flex-start"
    gap={{ xs: 1, sm: 2 }}
    sx={{
      backgroundColor: !read
        ? (theme) => alpha(theme.palette.primary.main, 0.1)
        : undefined,
      boxSizing: 'border-box',
      borderTop: (theme) => `1px solid ${theme.palette.divider}`,
      py: 1,
      px: { xs: 1, sm: 2 },
    }}
  >
    {notificationIcon[type]}
    <Box display="flex" flexDirection="column">
      <Typography component="div" typography={{ xs: 'body2', sm: 'body1' }}>
        <HTMLinator
          sx={{
            '& a': {
              color: (theme) => theme.palette.primary.main,
              textDecoration: 'underline',
            },
          }}
        >
          {text}
        </HTMLinator>
      </Typography>
      <Typography typography="body3">
        <i>
          {printRelativeDate({
            stamp: createdAt,
          })}
        </i>{' '}
        |{' '}
        <Box component="span" textTransform="capitalize">
          {type.toLowerCase()}
        </Box>
      </Typography>
    </Box>
  </Box>
);

const notificationIcon: Record<NotificationType, ReactNode> = {
  SYSTEM: <Mail color="primary" />,
  INVENTORY: <SquareOutlined color="warning" />,
  FRIEND: <Diversity1 color="secondary" />,
  RAFFLE: <HowToVote color="success" />,
  REWARD: <LocalActivity color="warning" />,
  GAME: <VideogameAsset color="error" />,
  QUEST: <StarBorder color="info" />,
  BATTLE: <SportsMma color="error" />,
};
