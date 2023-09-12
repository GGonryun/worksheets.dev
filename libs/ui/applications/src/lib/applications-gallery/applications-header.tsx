import { Box, Container, Typography } from '@mui/material';
import { TinyLogo } from '@worksheets/ui-basic-style';

export const ApplicationsHeader = () => (
  <Container maxWidth="xl" sx={{ py: 3 }}>
    <Box display="flex" gap={1} alignItems="center">
      <TinyLogo
        borderless
        label="Applications"
        src="/icons/features/applications.svg"
        area={40}
      />
      <Typography variant="h4" fontWeight={900}>
        Applications gallery
      </Typography>
    </Box>
    <Box pt={2}>
      <Typography variant="body2" color="text.secondary">
        Our application registry offers easy to use building blocks for your
        workflows or custom solutions. Click on an application to learn more.
      </Typography>
    </Box>
  </Container>
);
