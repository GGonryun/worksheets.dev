import { ButtonProps, Palette, Box, Paper, Typography } from '@mui/material';
import { ReactNode } from 'react';

export const SettingsCardGeneric: React.FC<{
  title: string;
  caption?: string;
  children?: ReactNode;
  color?: ButtonProps['color'];
}> = ({ color, title, caption, children }) => {
  const pickBorder = (palette: Palette) => {
    const border = (c: string) => `1px solid ${c}`;
    switch (color) {
      case 'error':
        return border(palette.error.main);
      case 'primary':
        return border(palette.primary.main);
      case 'secondary':
        return border(palette.secondary.main);
      case 'info':
        return border(palette.info.main);
      case 'success':
        return border(palette.success.main);
      case 'warning':
        return border(palette.warning.main);
      case 'inherit':
        return border(palette.text.primary);
      default:
        return 'none';
    }
  };
  return (
    <Box width="100%">
      <Paper
        elevation={6}
        sx={({ palette }) => ({
          border: pickBorder(palette),
          padding: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        })}
      >
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2">{caption}</Typography>
        {children}
      </Paper>
    </Box>
  );
};
