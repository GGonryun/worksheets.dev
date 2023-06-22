import { Box, Typography, Divider } from '@mui/material';

export const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
  <Box px={3} py={2}>
    <Typography variant="h5">{title}</Typography>
    <Divider />
  </Box>
);
