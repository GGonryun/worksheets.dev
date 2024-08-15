import { Typography } from '@mui/material';
import { QuestionAnswer } from '@worksheets/util/types';
export const helpLoot: QuestionAnswer[] = [
  {
    id: 'what-is-loot',
    question: 'What is loot?',
    summary:
      'Loot are the items that a monster drops when it is defeated. There are two types of loot: basic loot and MVP loot.',
    answer: (
      <Typography>
        Loot are the items that a monster drops when it is defeated. There are
        two types of loot: basic loot and MVP loot.
      </Typography>
    ),
  },
  {
    id: 'What is basic loot?',
    question: 'What is basic loot?',
    summary: 'Basic loot is the loot that a monster drops when it is attacked.',
    answer: (
      <Typography>
        Basic loot is the loot that a monster drops when it is defeated. Basic
        loot is awarded to all players who deal at least the minimum amount of
        damage required to receive loot. The item that you will receive is
        determined by the monster's loot table.
        <br />
        <br />
        For example, if a monster has a defense value of 10, you must deal at
        least 10 damage to the monster in order to receive basic loot. For every
        10 damage dealt, you will receive an additional basic loot item.
      </Typography>
    ),
  },
  {
    id: 'What is MVP loot?',
    question: 'What is MVP loot?',
    summary:
      'MVP loot is the loot that a monster drops when it is defeated by the player who dealt the most damage.',
    answer: (
      <Typography>
        MVP loot is the loot that a monster drops when it is defeated. MVP loot
        is awarded to the player who dealt the most damage to the monster. The
        item that you will receive is determined by the monster's loot table.
        <br />
        <br />
        For example, if a monster has two MVP items, each with a 50% chance to
        drop. The player who dealt the most damage will receive one of the two
        MVP items. If the player who dealt the most damage is not eligible to
        receive MVP loot, the item will be awarded to the next player in line.
      </Typography>
    ),
  },
  {
    id: 'how-to-get-loot',
    question: 'How do I get loot?',
    summary:
      "To get loot, you must deal at least the minimum amount of damage required to receive loot. The item that you will receive is determined by the monster's loot table.",
    answer: (
      <Typography>
        To get loot, you must deal at least the minimum amount of damage
        required to receive loot. The item that you will receive is determined
        by the monster's loot table.
      </Typography>
    ),
  },
];
