import { Box, Divider } from '@mui/material';
import { FC, ReactNode } from 'react';

export const HorizontalSpreadLayout: FC<{
  header: ReactNode;
  body: ReactNode;
  footer: ReactNode;
}> = ({ header, body, footer }) => (
  <Box height="100%" display="flex" flexDirection="column">
    <Box flexShrink={0}>{header}</Box>
    <Divider />
    <Box flex="1 0 auto">{body}</Box>
    <Divider />
    <Box flexShrink={0}>{footer}</Box>
  </Box>
);
