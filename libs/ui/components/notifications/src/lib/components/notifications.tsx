import { Clear } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Column } from '@worksheets/ui/components/flex';
import { LoadingBar } from '@worksheets/ui/components/loading';
import { useMediaQueryUp } from '@worksheets/ui/hooks/use-media-query';
import {
  FilterableNotificationType,
  NotificationSchema,
} from '@worksheets/util/types';
import React from 'react';

import { NotificationsTypeFilter } from './notifications-filter';
import { NotificationsList } from './notifications-list';
export const Notifications: React.FC<{
  loading: boolean;
  notifications: NotificationSchema[];
  onClear: () => void;
  activeFilter: FilterableNotificationType;
  onChangeFilter: (type: FilterableNotificationType) => void;
}> = ({ loading, notifications, onClear, activeFilter, onChangeFilter }) => {
  const isBiggerThanPhone = useMediaQueryUp('sm');
  return (
    <Column>
      <Button
        disabled={notifications.length === 0}
        onClick={onClear}
        size="small"
        variant="arcade"
        color="error"
        startIcon={<Clear />}
        sx={{
          width: { xs: '100%', sm: 'fit-content' },
          mb: { xs: 0, sm: 1.5 },
          alignSelf: 'flex-end',
        }}
      >
        Clear All
      </Button>
      {isBiggerThanPhone && (
        <NotificationsTypeFilter
          active={activeFilter}
          onChange={onChangeFilter}
        />
      )}
      <br />
      {loading ? (
        <LoadingBar />
      ) : (
        <NotificationsList notifications={notifications} />
      )}
    </Column>
  );
};
