import { DeleteForever } from '@mui/icons-material';
import { IconButton, SxProps, Button, Typography } from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import { textShadow, responsiveFontSize } from '@worksheets/ui-games';
import { FC, ReactNode } from 'react';

export type WordsProps = {
  onRemove: () => void;
  onClick: (word: string) => void;
  words: string[];
  found: string[];
  isLevelComplete?: boolean;
  active?: number; // the matching X letter words are active and highlighted.
};

export const Words: FC<WordsProps> = ({
  onRemove,
  onClick,
  isLevelComplete,
  words,
  found,
  active,
}) => {
  words.sort((a, b) => {
    // sort words by length
    if (a.length !== b.length) {
      return a.length - b.length;
    }
    return a.localeCompare(b);
  });
  return (
    <Flex fill centered>
      <Flex wrap>
        {words.map((word) => (
          <Word
            found={isLevelComplete || found.includes(word)}
            key={word}
            onClick={() => onClick(word)}
            active={word.length === active}
          >
            {word}
          </Word>
        ))}
        {Boolean(words.length) && (
          <Flex
            gap={1.5}
            sx={{
              pl: 1,
              mb: 0,
              marginLeft: 'auto',
            }}
          >
            <IconButton
              onClick={() => {
                if (isLevelComplete) return;
                onRemove();
              }}
              size="small"
              sx={{
                boxShadow: textShadow(2.5, 0.5),
                border: (theme) =>
                  `2px solid ${theme.palette.secondary.contrastText}`,
                color: 'secondary.contrastText',
              }}
            >
              <DeleteForever
                sx={{
                  fontSize: responsiveFontSize({ min: 4, grow: 6, max: 42 }),
                }}
              />
            </IconButton>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export const Word: FC<{
  children: ReactNode;
  onClick: () => void;
  found?: boolean;
  active?: boolean;
}> = ({ children, found, active, onClick }) => {
  const backgroundColor = active ? `rgba(0, 0, 0, 0.20)` : undefined;
  const sx: SxProps = {
    py: 0.5,
    my: 0.5,
    borderRadius: 0,
    backgroundColor,
    '&:hover': {
      backgroundColor,
    },
    '&:active': {
      backgroundColor,
    },
    '&:focus': {
      backgroundColor,
    },
  };

  return (
    <Button
      disableRipple
      disableFocusRipple
      disableTouchRipple
      onClick={onClick}
      sx={sx}
    >
      <Typography
        color={(theme) => theme.palette.primary.contrastText}
        fontSize={responsiveFontSize({ min: 10, grow: 4 })}
        fontWeight={900}
        sx={{
          opacity: found ? 0.4 : 1,
          textShadow: textShadow(),
        }}
      >
        {children}
      </Typography>
    </Button>
  );
};
