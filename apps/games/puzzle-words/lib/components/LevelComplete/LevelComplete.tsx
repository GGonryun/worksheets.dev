import { Flex, Spacing } from '@worksheets/ui-core';
import { LinedPaperLayout } from '../Layouts';
import { FC } from 'react';
import { Link, Typography } from '@mui/material';
import { TextButton } from '../TextButton';
import { useRouter } from 'next/router';
import { urls } from '../../urls';
import { puzzles } from '../../puzzles';
import Image from 'next/image';
import { WaterDrop } from '@mui/icons-material';
import { EnterDirectionally } from '../Animators';

export const LevelComplete: FC<{
  level: number;
  tokens: number;
  water: number;
  loadPuzzle: (level: number) => void;
}> = ({ level, tokens, water, loadPuzzle }) => {
  const { push } = useRouter();
  const maxLevel = puzzles.length;

  return (
    <LinedPaperLayout>
      <Flex fill centered column pt={3}>
        <EnterDirectionally y={-50} delay={0}>
          <Typography fontSize={34}>Puzzle #{level + 1} Complete</Typography>
        </EnterDirectionally>
        <EnterDirectionally y={-100} delay={0.15}>
          <Typography fontSize={20}>
            You&#39;ve completed this puzzle.
          </Typography>
        </EnterDirectionally>
        <EnterDirectionally y={-100} delay={0.3}>
          <Spacing top={3} bottom={1}>
            {level < maxLevel - 1 ? (
              <TextButton
                onClick={() => {
                  loadPuzzle(level + 1);
                }}
              >
                <Typography fontSize={26}>Next Puzzle</Typography>
              </TextButton>
            ) : (
              <Typography fontSize={26} color="error.main">
                No more puzzles!
              </Typography>
            )}
          </Spacing>
        </EnterDirectionally>
        <EnterDirectionally y={-100} delay={0.45}>
          <Spacing y={1}>
            <TextButton
              onClick={() => {
                push(urls.home());
              }}
            >
              <Typography fontSize={16}>Main Menu</Typography>
            </TextButton>
          </Spacing>
        </EnterDirectionally>
        <Flex centered column gap={1} pt={1}>
          <EnterDirectionally y={-100} delay={0.6}>
            <Typography fontSize={28}>Tokens: {tokens}</Typography>
          </EnterDirectionally>
          <EnterDirectionally y={-100} delay={0.75}>
            <Typography fontSize={20}>Water Donated: {water} ml</Typography>
          </EnterDirectionally>
          <EnterDirectionally y={-100} delay={0.9}>
            <WaterDrop fontSize="large" color="primary" />
          </EnterDirectionally>
        </Flex>
        <Flex column centered grow>
          <EnterDirectionally y={-100} delay={1.05}>
            <Link href={urls.waterOrg()}>
              <Image
                src={'/logos/water-org.png'}
                height={141}
                width={300}
                alt="water.org logo"
              />
            </Link>
          </EnterDirectionally>
        </Flex>
      </Flex>
    </LinedPaperLayout>
  );
};
