import { SvgIconComponent } from '@mui/icons-material';
import Box from '@mui/material/Box';
import { ButtonProps } from '@mui/material/Button';
import { FC } from 'react';
import { SubtitleText } from './subtitle-text';
import Typography from '@mui/material/Typography';
import { RoundedButton } from './rounded-button';

export const RedirectBox: FC<{
  title: string;
  description: string;
  Icon: SvgIconComponent;
  action: {
    href: string;
    target?: '_blank';
    label: string;
    variant: ButtonProps['variant'];
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
      }}
    >
      <Icon sx={{ fontSize: '5rem' }} />
      <SubtitleText variant="h2">{title}</SubtitleText>
      <Typography textAlign="center">{description}</Typography>
      <RoundedButton
        variant={action.variant}
        color="error"
        href={action.href}
        target={action.target}
      >
        {action.label}
      </RoundedButton>
    </Box>
  );
};
