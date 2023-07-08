import {
  ButtonProps,
  Box,
  Paper,
  Stack,
  Typography,
  Button,
} from '@mui/material';
import { ReactNode } from 'react';

export const NowRowsOverlay: React.FC<{
  title: string;
  subtext: string;
  children: ReactNode[] | ReactNode;
  action?: ButtonProps & { target?: string };
}> = ({ title, subtext, children, action }) => (
  <Box
    sx={{
      display: 'flex',
      height: '100%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Paper elevation={10} sx={{ p: 3, width: 400 }}>
      <Stack spacing={1}>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2">{subtext}</Typography>
        <Stack spacing={2} sx={{ pt: 1 }}>
          {children}
          {action && <Button {...action} />}
        </Stack>
      </Stack>
    </Paper>
  </Box>
);
