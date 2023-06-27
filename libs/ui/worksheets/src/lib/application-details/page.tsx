import { Box, Typography } from '@mui/material';
import { FloatingLayout } from '../floating-layout';
export const ApplicationDetailsPage: React.FC<{ appId: string }> = ({
  appId,
}) => {
  return (
    <FloatingLayout>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={3}
        flexDirection="column"
        gap={2}
      >
        <Typography variant="h2">{appId}</Typography>
      </Box>
    </FloatingLayout>
  );
};
