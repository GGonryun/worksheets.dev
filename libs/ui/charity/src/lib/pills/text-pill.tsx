import { FC } from 'react';
import { ReferencePillSkeleton } from './reference-pill-skeleton';
import { Box, Typography, TypographyProps } from '@mui/material';

export type TextPillProps = {
  text?: string;
  variant?: TypographyProps['variant'];
};
export const TextPill: FC<TextPillProps> = ({ text, variant }) => (
  <ReferencePillSkeleton>
    <Box
      sx={{
        display: 'grid',
        placeItems: 'center',
        width: '100%',
        userSelect: 'none',
      }}
    >
      <Typography variant={variant ?? 'h4'}>{text}</Typography>
    </Box>
  </ReferencePillSkeleton>
);
