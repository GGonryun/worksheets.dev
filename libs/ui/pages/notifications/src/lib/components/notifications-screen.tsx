import { Container, Paper } from '@mui/material';
import { LoadingBar } from '@worksheets/ui/components/loading';
import { useMediaQueryUp } from '@worksheets/ui/hooks/use-media-query';
import {
  FilterableNotificationType,
  NotificationSchema,
} from '@worksheets/util/types';
import React from 'react';

import { NotificationsTypeFilter } from './notifications-filter';
import { NotificationsFooter } from './notifications-footer';
import { NotificationsHeader } from './notifications-header';
import { NotificationsList } from './notifications-list';

export const NotificationsScreen: React.FC<{
  loading: boolean;
  notifications: NotificationSchema[];
  onClear: () => void;
  activeFilter: FilterableNotificationType;
  onChangeFilter: (type: FilterableNotificationType) => void;
}> = ({ loading, notifications, onClear, activeFilter, onChangeFilter }) => {
  const isBiggerThanPhone = useMediaQueryUp('sm');
  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 2,
      }}
    >
      <Paper
        sx={{
          padding: { xs: 2, sm: 4 },
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: 2, sm: 3 },
        }}
      >
        <NotificationsHeader notifications={notifications} onClear={onClear} />

        {isBiggerThanPhone && (
          <NotificationsTypeFilter
            active={activeFilter}
            onChange={onChangeFilter}
          />
        )}

        {loading ? (
          <LoadingBar />
        ) : (
          <NotificationsList notifications={notifications} />
        )}

        <NotificationsFooter />
      </Paper>
    </Container>
  );
};
