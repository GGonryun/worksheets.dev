import { ChangeEventHandler, FC, useState } from 'react';
import { Flex } from '@worksheets/ui-core';
import { Button, Divider, NativeSelect, Typography } from '@mui/material';
import { WarningAmber } from '@mui/icons-material';
import { Modal, ModalHeader } from '../Modal';
import { borderRadius } from '../../util';

export type JumpToOption = {
  id: number;
  label: string;
};
export const SettingsModal: FC<{
  open: boolean;
  options: JumpToOption[];
  onClose: () => void;
  onReset: () => void;
  onJumpTo: (puzzleId: number) => void;
}> = ({ open, options, onClose, onReset, onJumpTo }) => {
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
          <JumpToPuzzle onJumpTo={onJumpTo} options={options} />
          <ResetProgress onReset={onReset} />
        </Flex>
      </Flex>
    </Modal>
  );
};

type JumpToPuzzleProps = {
  onJumpTo: (puzzleId: number) => void;
  options: JumpToOption[];
};

export const JumpToPuzzle: FC<JumpToPuzzleProps> = ({ onJumpTo, options }) => {
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
        {options.map((p, i) => (
          <option key={i} value={i}>
            Puzzle #{i + 1}: {p.label}
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
