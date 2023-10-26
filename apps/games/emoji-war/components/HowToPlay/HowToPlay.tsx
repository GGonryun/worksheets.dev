import { Flex, MicroMarkdown } from '@worksheets/ui-core';
import {
  Accordion,
  AccordionDetails,
  AccordionProps,
  AccordionSummary,
  Box,
  Button,
  Divider,
  Link,
  Typography,
  styled,
} from '@mui/material';
import { FC, useState } from 'react';
import { ArrowBack, ExpandMore } from '@mui/icons-material';
import { uppercase } from '@worksheets/util/strings';

export const HowToPlay: FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <Flex column fullWidth centered gap={1}>
      <Flex fullWidth column>
        <Title />
        <Divider />
        <InstructionsAccordion />
      </Flex>
      <Flex fullWidth>
        <Button
          variant="contained"
          color="success"
          startIcon={<ArrowBack />}
          sx={{
            my: 2,
            alignSelf: 'flex-start',
          }}
          onClick={onBack}
        >
          Back to Menu
        </Button>
      </Flex>
    </Flex>
  );
};

const Title = () => (
  <Flex column pb={1}>
    <Typography variant="h5">
      <strong>How to play?</strong>
    </Typography>
    <Typography variant="body1">
      Emoji Wars is a real-time strategy battle game.
    </Typography>
  </Flex>
);

export type Instruction = {
  emoji: string;
  title: string;
  content: string;
};

export const Instructions: Instruction[] = [
  {
    emoji: '🎯',
    title: 'Objective',
    content:
      "The objective is to destroy your opponent's Emoji before they destroy yours.",
  },
  {
    emoji: '🚀',
    title: 'Game Play',
    content:
      '☝️ Each player is given a random assortment of movement and attack cards with a color value assigned to it.\n✌️ Playing three cards with matching colors will strike all tiles on the specified row or column.\n🤟 Getting hit will cause the player to lose a health point.',
  },
  {
    emoji: '🏆',
    title: 'Winning',
    content:
      '❤️ The first player to reach 0 hit points loses the game.\n⏲️ If the timer runs out the player with the most health points wins.\n🗡️ If both players reach 0 hit points at the same time, the game is a draw.',
  },
];

export const InstructionsAccordion = () => {
  const [expanded, setExpanded] = useState<number>(-1);

  const handleChange =
    (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : -1);
    };

  return (
    <>
      {Instructions.map((instruction, index) => (
        <div key={index}>
          <ThemedAccordtion
            expanded={expanded === index}
            onChange={handleChange(index)}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Flex gap={1}>
                <Box sx={{ fontSize: 24 }}>{instruction.emoji}</Box>
                <Typography color="text.secondary">
                  <strong>{uppercase(instruction.title)}</strong>
                </Typography>
              </Flex>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                maxHeight: 175,
                overflowY: 'auto',
              }}
            >
              <Typography whiteSpace={'pre-wrap'}>
                <MicroMarkdown text={instruction.content} />
              </Typography>
            </AccordionDetails>
          </ThemedAccordtion>
          <Divider />
        </div>
      ))}
    </>
  );
};

const ThemedAccordtion = styled((props: AccordionProps) => (
  <Accordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
}));
