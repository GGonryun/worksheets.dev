import { SvgIconComponent } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Button, { ButtonProps } from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FC } from 'react';

export const RedirectBox: FC<{
  title: string;
  description: string;
  Icon: SvgIconComponent;
  action: {
    href: string;
    target?: '_blank';
    label: string;
    color: ButtonProps['color'];
  };
}> = ({ title, description, Icon, action }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        maxWidth: 270,
        textAlign: 'center',
      }}
    >
      <Icon sx={{ fontSize: '5rem' }} />
      <Typography variant="h5">{title}</Typography>
      <Typography variant="body2">{description}</Typography>
      <Button
        variant="arcade"
        color={action.color}
        href={action.href}
        target={action.target}
      >
        {action.label}
      </Button>
    </Box>
  );
};
