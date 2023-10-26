import { ArrowBack, Help, HelpOutline } from '@mui/icons-material';
import { Flex } from '@worksheets/ui-core';
import { IconButton } from '../IconButton';
import { Divider, Typography, useTheme } from '@mui/material';
import { FC } from 'react';
import { PuzzleRule, printPuzzleRule } from '../../puzzles';
import { IconAction, textShadow } from '@worksheets/ui-games';

export const Header: FC<{
  id: number;
  rules: PuzzleRule[];
  exitLevel: () => void;
  openHelp: () => void;
}> = ({ id, rules, exitLevel, openHelp }) => {
  const theme = useTheme();
  const color = theme.palette.primary.light;
  return (
    <Flex position="relative" pt={1}>
      <Flex column centered position="absolute" fullWidth>
        <Typography
          fontSize={24}
          color="secondary.dark"
          fontWeight={900}
          sx={{
            textShadow: textShadow(1.5, 1),
          }}
        >
          Puzzle #{id + 1}
        </Typography>
        {rules.length > 0 && (
          <>
            <Typography fontSize={16} color="secondary.dark" fontWeight={900}>
              {printPuzzleRule(rules)}
            </Typography>
            <Divider
              sx={{ backgroundColor: 'secondary.dark', width: '100px' }}
            />
          </>
        )}
      </Flex>
      <Flex spaceBetween fullWidth px={2}>
        <IconAction color={color} onClick={exitLevel} Icon={ArrowBack} />
        <IconAction color={color} onClick={openHelp} Icon={HelpOutline} />
      </Flex>
    </Flex>
  );
};
