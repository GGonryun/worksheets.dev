import { FC } from 'react';
import { ReferencePillSkeleton } from './reference-pill-skeleton';
import Box from '@mui/material/Box';
import Typography, { TypographyProps } from '@mui/material/Typography';

export type TextPillProps = {
  text?: string;
  variant?: TypographyProps['variant'];
  color?: {
    background?: string;
    font?: string;
  };
};
export const TextPill: FC<TextPillProps> = ({ text, variant, color }) => (
  <ReferencePillSkeleton>
    <Box
      sx={{
        display: 'grid',
        placeItems: 'center',
        width: '100%',
        userSelect: 'none',
        backgroundColor: (theme) =>
          color?.background ?? theme.palette.background.paper,
      }}
    >
      <Typography
        variant={variant ?? 'h4'}
        sx={{
          color: (theme) => color?.font ?? theme.palette.text.primary,
        }}
      >
        {text}
      </Typography>
    </Box>
  </ReferencePillSkeleton>
);
