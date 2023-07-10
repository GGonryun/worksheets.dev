import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { EditFieldDialog } from './base-dialog';
import { WorksheetLogLevelField } from '../../../create-a-worksheet/configure/fields/worksheet-log-level';
import { LogLevel } from '@worksheets/schemas-logging';

export const EditLogLevelDialog: React.FC<{
  value: LogLevel; // starting value
  open: boolean;
  onClose: () => void;
  onSubmit: (level: LogLevel) => void;
}> = ({ open, onClose, onSubmit, value }) => {
  const [level, setLevel] = useState<LogLevel>(value);

  useEffect(() => {
    setLevel(value);
  }, [value]);

  return (
    <EditFieldDialog
      open={open}
      handleClose={() => {
        onClose();
        setLevel(value);
      }}
      handleSubmit={() => {
        if (level !== value) {
          onSubmit(level);
          onClose();
        } else {
          onClose();
        }
      }}
    >
      <Box sx={{ width: 400 }}>
        <WorksheetLogLevelField level={level} onUpdate={(n) => setLevel(n)} />
      </Box>
    </EditFieldDialog>
  );
};
