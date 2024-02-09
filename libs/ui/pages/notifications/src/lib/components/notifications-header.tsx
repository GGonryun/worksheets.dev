import { Clear } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';

export const NotificationsHeader: React.FC<{
  onClear: () => void;
}> = ({ onClear }) => {
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
