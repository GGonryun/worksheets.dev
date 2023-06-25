import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { EditFieldDialog } from './base-dialog';
import { WorksheetTimeoutField } from '../../../create-a-worksheet/configure/fields/worksheet-timeout';
import {
  printCountdownDuration,
  durationFromSeconds,
} from '@worksheets/util/time';

export const EditTimeoutDialog: React.FC<{
  value: number; // starting value
  open: boolean;
  onClose: () => void;
  onSubmit: (timeout: number) => void;
}> = ({ open, onClose, onSubmit, value }) => {
  const [timeout, setTimeout] = useState(value);
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    setTimeout(value);
  }, [value]);

  return (
    <EditFieldDialog
      open={open}
      handleClose={() => {
        onClose();
      }}
      handleSubmit={() => {
        if (value !== timeout) {
          onSubmit(timeout);
        }
        onClose();
      }}
    >
      <Box sx={{ width: 400 }}>
        <WorksheetTimeoutField
          label={
            changed
              ? printCountdownDuration(durationFromSeconds(timeout ?? 0))
              : undefined
          }
          timeout={timeout}
          onUpdate={(t) => {
            setTimeout(t);
            setChanged(true);
          }}
        />
      </Box>
    </EditFieldDialog>
  );
};
