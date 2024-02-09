import { Clear } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { NotificationSchema } from '@worksheets/util/types';

export const NotificationsHeader: React.FC<{
  notifications: NotificationSchema[];
  onClear: () => void;
}> = ({ onClear, notifications }) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexWrap="wrap"
      gap={2}
    >
      <Typography typography={{ xs: 'h4', sm: 'h3' }}>Notifications</Typography>

      <Button
        disabled={notifications.length === 0}
        onClick={onClear}
        size="small"
        variant="arcade"
        color="error"
        startIcon={<Clear />}
        sx={{
          width: { xs: '100%', sm: 'auto' },
        }}
      >
        Clear All
      </Button>
    </Box>
  );
};
