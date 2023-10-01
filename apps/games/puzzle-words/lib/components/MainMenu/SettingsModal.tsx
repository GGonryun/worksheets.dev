import {
  Alert,
  Button,
  Divider,
  MenuItem,
  NativeSelect,
  Typography,
} from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import { ChangeEventHandler, FC, useState } from 'react';
import { Modal, ModalHeader } from '../Modal';
import { EnterDirectionally } from '../Animators';
import { puzzles } from '../../puzzles';
import { randomizeArray } from '@worksheets/util/arrays';

export type SettingsModalProps = {
  onClose: () => void;
  open: boolean;
} & ActionsProps;

export const SettingsModal: FC<SettingsModalProps> = ({
  open,
  onClose,
  ...props
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Flex column p={2}>
        <EnterDirectionally delay={0.15}>
          <ModalHeader onClose={onClose}>Settings</ModalHeader>
        </EnterDirectionally>
        <Divider sx={{ backgroundColor: 'error.dark' }} />
        <ModalBody {...props} />
      </Flex>
    </Modal>
  );
};

const ModalBody: FC<ActionsProps> = (props) => (
  <Flex column fullWidth sx={{ overflowY: 'auto', flex: 1, gap: 2 }}>
    <EnterDirectionally delay={0.3}>
      <Actions {...props} />
    </EnterDirectionally>
  </Flex>
);

export type ActionsProps = {
  onLoad: (puzzleId: number) => void;
  onReset: () => void;
};

const Actions: FC<ActionsProps> = ({ onLoad, onReset }) => {
  const [puzzle, setPuzzle] = useState(0);

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setPuzzle(Number(event.target.value));
  };

  return (
    <Flex column gap={2} pt={1}>
      <Typography fontFamily="sans-serif">
        These options will reset your progress and restart the game.{' '}
        <b>Do not use these options unless you want to start over.</b>
      </Typography>
      <Flex column gap={1}>
        <Typography variant="h6">Jump to a puzzle</Typography>
        <NativeSelect
          size="small"
          value={puzzle.toString()}
          onChange={handleChange}
        >
          {puzzles.map((p, i) => (
            <option key={i} value={i}>
              Puzzle #{i + 1}: {randomizeArray(p.letters).join('')}
            </option>
          ))}
        </NativeSelect>
        <Button
          variant="contained"
          color="warning"
          onClick={() => onLoad(puzzle)}
        >
          <Typography fontFamily={'sans-serif'} variant="caption">
            Load Puzzle #{puzzle + 1}
          </Typography>
        </Button>
      </Flex>
      <Flex gap={1} column pt={6}>
        <Typography>Reset Progress</Typography>
        <Button
          size="small"
          variant="contained"
          color="error"
          onClick={() => onReset()}
        >
          <Typography fontFamily={'sans-serif'} variant="caption">
            Reset Progress & Start Over
          </Typography>
        </Button>
      </Flex>
    </Flex>
  );
};
