import { Link, darken, lighten, useTheme } from '@mui/material';
import { FC } from 'react';
import { PaletteColor } from '../theme';
import { SvgIconComponent } from '@mui/icons-material';
import { CaptionText } from '../typography';

export type IconBoxProps = {
  href?: string;
  Icon: SvgIconComponent;
  text: string;
  color: PaletteColor;
};

export const IconBox: FC<IconBoxProps> = ({ Icon, text, color, href }) => {
  const theme = useTheme();
  const lighterColor = lighten(theme.palette[color].light, 0.8);
  const lightColor = lighten(theme.palette[color].light, 0.6);
  const darkColor = darken(theme.palette[color].dark, 0.1);
  return (
    <Link
      href={href}
      underline="none"
      sx={{
        width: 'min-content',
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
        rotateY: '180deg',
        px: 0.5,
        borderRadius: 1,
        backgroundColor: lighterColor,
        '&:hover': {
          backgroundColor: lightColor,
        },
      }}
    >
      <Icon
        sx={{
          fontSize: 16,
          '@media (max-width: 600px)': {
            fontSize: 14,
          },
          color: darkColor,
        }}
      />
      <CaptionText
        sx={{
          color: darkColor,
        }}
      >
        {text}
      </CaptionText>
    </Link>
  );
};
