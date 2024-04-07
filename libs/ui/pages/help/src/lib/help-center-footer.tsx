import { ContactPage, Gamepad } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { routes } from '@worksheets/routes';
import { GradientTypography } from '@worksheets/ui/components/typography';

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
    <GradientTypography
      component="h2"
      textAlign="center"
      typography={{ xs: 'h6', sm: 'h5', md: 'h4' }}
      background={(theme) => theme.palette.text.marketing.gradients.blue.dark}
    >
      Need more help?
    </GradientTypography>
    <Typography
      mb={4}
      mt={1}
      color={(theme) => theme.palette.text.blue.light}
      fontWeight={700}
    >
      Contact us or join our newsletter.
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
        href={routes.newsletter.subscribe.path()}
        variant="arcade"
        color="secondary"
        startIcon={<Gamepad />}
        sx={{
          width: { xs: '100%', sm: 'auto' },
          px: { xs: 3, sm: 6 },
        }}
      >
        Join the Fun
      </Button>
    </Box>
  </Box>
);
