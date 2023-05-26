import { Container, Box, Typography } from '@mui/material';
import Applications from './Applications';
import Templates from './Templates';
import Worksheets from './Worksheets';
import { LoginWithGoogle } from '@worksheets/feat/user-auth';

export default function Main() {
  return (
    <Container maxWidth="md">
      <LoginWithGoogle />
      <Box
        display="flex"
        flexDirection="column"
        gap={4}
        marginTop={4}
        alignItems="center"
      >
        <Typography variant="h3">worksheets.dev</Typography>
        <Box display="flex" gap={3}>
          <Applications />
          <Worksheets />
          <Templates />
        </Box>
      </Box>
    </Container>
  );
}
