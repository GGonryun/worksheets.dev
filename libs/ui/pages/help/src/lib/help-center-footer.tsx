import { ContactPage, Gamepad } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { routes } from '@worksheets/ui/routes';

export const HelpCenterFooter = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      width: '100%',
    }}
  >
    <Typography variant="h4">Need more help?</Typography>
    <Typography mb={4} mt={1}>
      We're standing by, ready to assist you.
    </Typography>

    <Box
      sx={{
        display: 'flex',
        gap: 2,
        flexDirection: { xs: 'column', sm: 'row' },
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Button
        href={routes.contact.path()}
        variant="arcade"
        startIcon={<ContactPage />}
        sx={{
          width: { xs: '100%', sm: 'auto' },
          px: { xs: 3, sm: 6 },
        }}
      >
        Contact Us
      </Button>
      <Button
        href={routes.games.path()}
        variant="arcade"
        color="secondary"
        startIcon={<Gamepad />}
        sx={{
          width: { xs: '100%', sm: 'auto' },
          px: { xs: 3, sm: 6 },
        }}
      >
        Play Games
      </Button>
    </Box>
  </Box>
);
