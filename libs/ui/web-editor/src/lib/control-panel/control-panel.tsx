import { Box, Button } from '@mui/material';
import { LoginWithGoogle, useUser } from '@worksheets/auth/client';

export interface ControlPanelProps {
  onExecute: () => void;
  onNew: () => void;
  onSave: () => void;
  onDelete: () => void;
}

export function ControlPanel({
  onExecute,
  onNew,
  onSave,
  onDelete,
}: ControlPanelProps) {
  const { user } = useUser();
  return (
    <Box gap={2} display="flex" alignItems="center">
      <LoginWithGoogle />
      {user && (
        <>
          <Button
            variant="contained"
            color="success"
            onClick={() => onExecute()}
          >
            execute
          </Button>
          <Button variant="contained" color="warning" onClick={() => onNew()}>
            new
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => onSave()}
          >
            save
          </Button>
          <Button variant="contained" color="error" onClick={() => onDelete()}>
            delete
          </Button>
        </>
      )}
    </Box>
  );
}

export default ControlPanel;
