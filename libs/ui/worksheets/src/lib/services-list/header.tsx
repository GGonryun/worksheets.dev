import { Box, Typography } from '@mui/material';
import { TinyLogo } from '../shared/tiny-logo';

export const ServicesHeader = () => (
  <Box pt={1}>
    <Box display="flex" gap={1} alignItems="center">
      <TinyLogo
        borderless
        label="Services"
        src="/icons/features/services.svg"
        area={40}
      />
      <Typography variant="h4" fontWeight={900}>
        Explore Services
      </Typography>
    </Box>
    <Box pt={2}>
      <Typography variant="body2" color="text.secondary">
        Worksheets provides a consistent interface for all Business services.
        Here you can find what you need to get started with a service:
        providers, demos, use cases, and more!
      </Typography>
    </Box>
  </Box>
);
