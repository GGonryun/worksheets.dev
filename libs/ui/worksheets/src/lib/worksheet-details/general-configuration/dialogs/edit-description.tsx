import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { WorksheetDescriptionField } from '../../../create-a-worksheet/configure/fields/worksheet-description';
import { EditFieldDialog } from './base-dialog';

export const EditDescriptionDialog: React.FC<{
  value: string; // starting value
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
}> = ({ open, onClose, onSubmit, value }) => {
  const [description, setDescription] = useState(value);

  useEffect(() => {
    setDescription(value);
  }, [value]);

  return (
    <EditFieldDialog
      open={open}
      handleClose={() => {
        onClose();
        setDescription(value);
      }}
      handleSubmit={() => {
        if (description !== value) {
          onSubmit(description);
          onClose();
        } else {
          onClose();
        }
      }}
    >
      <Box sx={{ width: 400 }}>
        <WorksheetDescriptionField
          description={description}
          onUpdate={(n) => setDescription(n)}
        />
      </Box>
    </EditFieldDialog>
  );
};
