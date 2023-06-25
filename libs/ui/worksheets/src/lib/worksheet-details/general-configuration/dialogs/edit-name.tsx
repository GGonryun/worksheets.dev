import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { WorksheetNameField } from '../../../create-a-worksheet/configure/fields/worksheet-name';
import { EditFieldDialog } from './base-dialog';

export const EditNameDialog: React.FC<{
  value: string; // starting value
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
}> = ({ open, onClose, onSubmit, value }) => {
  const [name, setName] = useState(value);

  useEffect(() => {
    setName(value);
  }, [value]);

  return (
    <EditFieldDialog
      open={open}
      handleClose={() => {
        onClose();
        setName(value);
      }}
      handleSubmit={() => {
        if (name !== value) {
          onSubmit(name);
        }
        onClose();
      }}
    >
      <Box sx={{ width: 400 }}>
        <WorksheetNameField name={name} onUpdate={(n) => setName(n)} />
      </Box>
    </EditFieldDialog>
  );
};
