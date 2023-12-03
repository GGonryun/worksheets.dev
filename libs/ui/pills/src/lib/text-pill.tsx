import { FC } from 'react';
import { ReferencePillSkeleton } from './reference-pill-skeleton';
import Box from '@mui/material/Box';
import Typography, { TypographyProps } from '@mui/material/Typography';

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
      <Typography
        variant={variant ?? 'h4'}
        sx={{
          fontSize: { xs: '1.5rem', sm: '2rem' },
        }}
      >
        {text}
      </Typography>
    </Box>
  </ReferencePillSkeleton>
);
