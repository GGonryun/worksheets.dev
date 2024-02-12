import { Box, BoxProps, Paper, Typography } from '@mui/material';
import { ReactNode } from 'react';

export const CustomPaper: React.FC<{
  children: ReactNode | ReactNode[];
  title: string;
  backgroundColor?: string;
  boxProps?: BoxProps;
}> = ({ children, title, backgroundColor, boxProps }) => {
  return (
    <Paper
      sx={{
        p: 4,
        backgroundColor: backgroundColor ?? 'background.solid-blue',
        color: 'inherit',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography typography="h3">{title}</Typography>
      <Box display="flex" flexDirection="column" {...boxProps}>
        {children}
      </Box>
    </Paper>
  );
};
