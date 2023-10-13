import { Box, Typography, useTheme } from '@mui/material';
import { selectRandomItem } from '@worksheets/util/arrays';
import { FC, useEffect, useState } from 'react';

export type SpeechBubbleProps = {
  size: number;
  onClick: () => void;
};

const affirmations = [
  'Puzzle Complete!',
  'Nice Work!',
  'Great Job!',
  'Awesome!',
  'Excellent!',
  'Amazing!',
  'Fantastic!',
  'Wonderful!',
  'Spectacular!',
  'Incredible!',
  'Unbelievable!',
  'Extraordinary!',
  'Phenomenal!',
  'Stupendous!',
  'Terrific!',
  'Tremendous!',
  'Stunning!',
  'Marvelous!',
  'Impressive!',
  'Superb!',
  'Unreal!',
  'Outstanding!',
  'Magnificent!',
  'Brilliant!',
  'Mind-blowing!',
  'Astonishing!',
  'Majestic!',
  'Breathtaking!',
  'Astounding!',
  'Mind-boggling!',
  'Bewildering!',
  'Staggering!',
  'Remarkable!',
  'Stupendous!',
  'Wondrous!',
  'Prodigious!',
  'Miraculous!',
  'Singular!',
  'Phenomenal!',
  'Unbelievable!',
  'Incredible!',
  'Fabulous!',
  'You Did It!',
  'You Got It!',
  'You Rock!',
  'You Rule!',
  'You Are Awesome!',
  'Lets Go!',
];

export const SpeechBubble: FC<SpeechBubbleProps> = ({ size, onClick }) => {
  const { palette, spacing } = useTheme();
  const [text, setText] = useState<string>();

  useEffect(() => {
    setText(selectRandomItem(affirmations));
  }, []);

  return (
    <Box
      onClick={onClick}
      sx={{
        cursor: 'pointer',
        position: 'absolute',
        color: palette.text.primary,
        backgroundColor: palette.background.paper,
        px: 2,
        py: 1,
        border: '2px solid black',
        borderRadius: spacing(1),
        '&:before': {
          content: '""',
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          margin: '0 auto',
          height: `${size * 0.2}px`,
          width: `${size * 0.2}px`,
          backgroundColor: palette.background.paper,
          boxSizing: 'border-box',
          transform: 'rotate(45deg) translate(-50%)',
          borderBottom: 'inherit',
          borderRight: 'inherit',
          boxShadow: 'inherit',
        },
      }}
    >
      <Typography fontWeight={900} fontSize={size * 0.3}>
        {text}
      </Typography>
    </Box>
  );
};
