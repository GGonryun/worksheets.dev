import { ArrowBack, Help } from '@mui/icons-material';
import { Flex } from '@worksheets/ui-core';
import { IconButton } from '../IconButton';
import { Divider, Typography } from '@mui/material';
import { FC } from 'react';
import { PuzzleRule, printPuzzleRule } from '../../puzzles';

export const Header: FC<{
  id: number;
  rules: PuzzleRule[];
  exitLevel: () => void;
  openHelp: () => void;
}> = ({ id, rules, exitLevel, openHelp }) => {
  return (
    <Flex position="relative" fullWidth>
      <Flex
        column
        centered
        position="absolute"
        fullWidth
        pt={rules.length > 0 ? 3 : 0}
      >
        <Typography fontSize={24}>Puzzle #{id + 1}</Typography>
        {rules.length > 0 && (
          <>
            <Typography fontSize={16} color="error.main" fontWeight={900}>
              {printPuzzleRule(rules)}
            </Typography>
            <Divider sx={{ backgroundColor: 'red', width: '100px' }} />
          </>
        )}
      </Flex>
      <Flex spaceBetween fullWidth px={2}>
        <Flex gap={1}>
          <IconButton onClick={exitLevel}>
            <ArrowBack />
          </IconButton>
        </Flex>

        <Flex gap={1}>
          <IconButton onClick={openHelp}>
            <Help />
          </IconButton>
        </Flex>
      </Flex>
    </Flex>
  );
};
