import { Box, Container, Divider, useTheme } from '@mui/material';
import { FC, ReactNode } from 'react';

export const HorizontalSpreadLayout: FC<{
  header: ReactNode;
  body: ReactNode;
  footer: ReactNode;
}> = ({ header, body, footer }) => {
  const theme = useTheme();

  return (
    <Box height="100%" display="flex" flexDirection="column">
      <Box
        flexShrink={0}
        sx={{ backgroundColor: theme.palette.background.paper }}
      >
        {header}
      </Box>
      <Divider />
      <Box flex="1 0 auto">
        <Container maxWidth={'xl'}>{body}</Container>
      </Box>
      <Divider />
      <Box
        flexShrink={0}
        sx={{ backgroundColor: theme.palette.background.paper }}
      >
        <Container maxWidth={'xl'}>{footer}</Container>
      </Box>
    </Box>
  );
};
