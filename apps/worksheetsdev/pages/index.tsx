import { Box, Container, Typography } from '@mui/material';
import Worksheets from '../components/Worksheets';
import Applications from '../components/Applications';
import Templates from '../components/Templates';

export function Index() {
  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        gap={3}
      >
        <Typography variant="h3">worksheets.dev</Typography>
        <Worksheets />
        <Applications />
        <Templates />
      </Box>
    </Container>
  );
}

export default Index;
