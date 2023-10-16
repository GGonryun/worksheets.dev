import { LockOpenOutlined } from '@mui/icons-material';
import { Typography, Box } from '@mui/material';
import { dokaBoxShadow, tabletBoxShadow } from '@worksheets/ui-games';
import { FC, ReactNode } from 'react';
import { findPuzzle } from '../../puzzles';
import { Flex } from '@worksheets/ui-core';
import Image from 'next/image';

export const LevelsCard: FC<{ onClick?: () => void }> = ({ onClick }) => {
  return (
    <CardLayout onClick={onClick}>
      <Flex column centered fill gap={1}>
        <LockOpenOutlined fontSize="large" />
        <Typography variant="caption">Unlock</Typography>
      </Flex>
    </CardLayout>
  );
};

export const ImageCard: FC<{ id: string; onClick?: () => void }> = ({
  id,
  onClick,
}) => {
  const puzzle = findPuzzle(id);
  return (
    <CardLayout onClick={onClick}>
      <Image src={puzzle.image} alt={puzzle.name} width={74} height={74} />
    </CardLayout>
  );
};

export const CardLayout: FC<{ children: ReactNode; onClick?: () => void }> = ({
  children,
  onClick,
}) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'inline-block',
        m: 0.5,
        backgroundColor: 'white',
        borderRadius: 2,
        height: 74,
        width: 74,
        pb: '2px',
        border: `3px solid black`,
        boxShadow: `${dokaBoxShadow}, ${tabletBoxShadow}`,
      }}
    >
      {children}
    </Box>
  );
};
