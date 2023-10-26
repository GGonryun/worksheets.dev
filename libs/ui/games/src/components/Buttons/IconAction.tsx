import { SvgIconComponent } from '@mui/icons-material';
import { SvgIconProps, IconButton, useTheme } from '@mui/material';
import { FC, MouseEventHandler } from 'react';
import { boxShadow } from '../../util';

export const IconAction: FC<{
  onClick?: MouseEventHandler<HTMLButtonElement>;
  Icon: SvgIconComponent;
  dense?: boolean;
  color?: string;
  border?: string;
  shadowless?: boolean;
}> = ({
  Icon,
  onClick,
  dense,
  color: colorOverride,
  shadowless,
  border: borderOverride,
}) => {
  const theme = useTheme();
  const color = colorOverride ?? theme.palette.primary.dark;
  const border = borderOverride ?? `3px solid ${color}`;

  const iconProps: SvgIconProps = {
    sx: {
      p: 0.5,
      borderRadius: '50%',
      boxShadow: shadowless ? undefined : boxShadow(),
      backgroundColor: theme.palette.primary.contrastText,
      border,
      color,
    },
    fontSize: dense ? 'medium' : 'large',
  };

  return (
    <IconButton
      size={dense ? 'small' : 'medium'}
      disableRipple
      onClick={onClick}
    >
      <Icon {...iconProps} />
    </IconButton>
  );
};
