import { ChangeEventHandler, FC, useState } from 'react';
import { Modal, ModalHeader } from '../Modal';
import { Flex } from '@worksheets/ui-core';
import { Button, Divider, NativeSelect, Typography } from '@mui/material';
import { borderRadius } from '../../util';
import { WarningAmber } from '@mui/icons-material';
import { puzzles } from '../../puzzles';

export const SettingsModal: FC<{
  open: boolean;
  onClose: () => void;
  onReset: () => void;
  onJumpTo: (puzzleId: number) => void;
}> = ({ open, onClose, onReset, onJumpTo }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Flex column p={2} grow>
        <ModalHeader onClose={onClose}>Settings</ModalHeader>
        <Divider sx={{ backgroundColor: 'primary.main', mb: 2 }} />
        <Flex gap={5} column fullWidth centered>
          <Flex gap={0.5}>
            <WarningAmber color="error" />
            <Typography variant="caption">
              <b>These changes are destructive.</b>
            </Typography>
            <WarningAmber color="error" />
          </Flex>
          <JumpToPuzzle onJumpTo={onJumpTo} />
          <ResetProgress onReset={onReset} />
        </Flex>
      </Flex>
    </Modal>
  );
};

type JumpToPuzzleProps = {
  onJumpTo: (puzzleId: number) => void;
};

export const JumpToPuzzle: FC<JumpToPuzzleProps> = ({ onJumpTo }) => {
  const [puzzle, setPuzzle] = useState(0);

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setPuzzle(Number(event.target.value));
  };

  return (
    <Flex column gap={1} fullWidth>
      <Typography variant="h6">
        <b>Jump to a puzzle</b>
      </Typography>
      <NativeSelect
        size="small"
        value={puzzle.toString()}
        onChange={handleChange}
        sx={{
          '.MuiNativeSelect-select': {
            pl: 1,
            pt: 0.5,
            border: '1px solid',
          },
        }}
      >
        {puzzles.map((p, i) => (
          <option key={i} value={i}>
            Puzzle #{i + 1}: {p.words[0]}
          </option>
        ))}
      </NativeSelect>
      <Button
        variant="contained"
        color="warning"
        onClick={() => {
          onJumpTo(puzzle);
        }}
        sx={{ borderRadius }}
      >
        <Typography fontFamily={'sans-serif'} variant="caption">
          Load Puzzle #{puzzle + 1}
        </Typography>
      </Button>
    </Flex>
  );
};

type ResetProgressProps = {
  onReset: () => void;
};

export const ResetProgress: FC<ResetProgressProps> = ({ onReset }) => {
  return (
    <Flex gap={1} column fullWidth>
      <Typography variant="h6">
        <b>Reset Progress</b>
      </Typography>
      <Button
        size="small"
        variant="contained"
        color="error"
        onClick={() => onReset()}
        sx={{
          borderRadius,
        }}
      >
        <Typography fontFamily={'sans-serif'} variant="caption">
          Delete all saved data
        </Typography>
      </Button>
    </Flex>
  );
};
