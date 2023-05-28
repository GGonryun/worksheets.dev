import { Box, Button } from '@mui/material';
import { LoginWithGoogle } from '@worksheets/auth/client';

export interface ControlPanelProps {
  onExecute: () => void;
  onNew: () => void;
  onSave: () => void;
}

export function ControlPanel({ onExecute, onNew, onSave }: ControlPanelProps) {
  return (
    <Box gap={2} display="flex" alignItems="center">
      <LoginWithGoogle />
      <Button variant="contained" color="success" onClick={() => onExecute()}>
        execute
      </Button>
      <Button variant="contained" color="warning" onClick={() => onNew()}>
        new
      </Button>
      <Button variant="contained" color="secondary" onClick={() => onSave()}>
        save
      </Button>
    </Box>
  );
}

export default ControlPanel;
