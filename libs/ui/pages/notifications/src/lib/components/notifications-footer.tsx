import { ArrowRightAlt, InfoOutlined } from '@mui/icons-material';
import { Box, Button, Link, Typography } from '@mui/material';
import { routes } from '@worksheets/ui/routes';

export const NotificationsFooter = () => (
  <Box
    sx={{
      mt: 1,
      display: 'flex',
      justifyContent: 'space-between',
      gap: 1,
      alignItems: 'center',
      flexDirection: { xs: 'column', sm: 'row' },
    }}
  >
    <Box display="flex" alignItems="center" gap={1}>
      <InfoOutlined color="info" fontSize="small" />
      <Typography variant="body3" color="text.secondary">
        Learn more about <b>Notifications</b> in the{' '}
        <Box component="span" color="primary.main">
          <Link href={routes.help.notifications.path()}>Help Center</Link>
        </Box>
      </Typography>
    </Box>
    <Button
      endIcon={<ArrowRightAlt />}
      color={'secondary'}
      variant="arcade"
      size="small"
      href={routes.account.path()}
      sx={{
        mt: { xs: 1, sm: 0 },
        width: { xs: '100%', sm: 'fit-content' },
      }}
    >
      Account Settings
    </Button>
  </Box>
);
