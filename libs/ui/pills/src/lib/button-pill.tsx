import { FC } from 'react';
import { ReferencePillSkeleton } from './reference-pill-skeleton';
import Box from '@mui/material/Box';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { SvgIconComponent } from '@mui/icons-material';

export type ButtonPillProps = {
  href?: string;
  onClick?: () => void;
  text?: {
    content?: TypographyProps['children'];
    color?: TypographyProps['color'];
    variant?: TypographyProps['variant'];
  };
  backgroundColor?: string;
  Icon?: SvgIconComponent;
};

export const ButtonPill: FC<ButtonPillProps> = ({
  href,
  onClick,
  text,
  backgroundColor,
  Icon,
}) => (
  <ReferencePillSkeleton href={href} onClick={onClick}>
    <Box
      sx={{
        display: 'grid',
        placeItems: 'center',
        width: '100%',
        p: 1,
        backgroundColor: (theme) =>
          backgroundColor ?? theme.palette.primary.main,
      }}
    >
      <Typography
        display="flex"
        alignItems="center"
        gap={1}
        variant={text?.variant ?? 'h5'}
        color={text?.color ?? 'primary.contrastText'}
      >
        {Icon && <Icon fontSize="inherit" />}
        {text?.content ?? 'Button'}
      </Typography>
    </Box>
  </ReferencePillSkeleton>
);
