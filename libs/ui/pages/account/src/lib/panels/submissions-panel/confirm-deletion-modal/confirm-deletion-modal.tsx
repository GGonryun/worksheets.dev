import { CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { BasicModal } from '@worksheets/ui/components/modals';
import { BasicGameSubmission } from '@worksheets/util/types';
import React from 'react';

import ColoredCancelIcon from '../../../components/icons/cancel';

export const ConfirmDeletionModal: React.FC<{
  submission: BasicGameSubmission | undefined;
  onConfirm: () => void;
  onCancel: () => void;
}> = ({ onConfirm, onCancel, submission }) => {
  const [loading, setLoading] = React.useState(false);
  return (
    <BasicModal onClose={() => onCancel()} open={Boolean(submission)}>
      <ColoredCancelIcon
        sx={{
          fontSize: 150,
        }}
      />
      <Typography variant="h4" color="error" textAlign="center">
        Delete Submission
      </Typography>
      <Typography variant="body1" textAlign="center">
        Are you sure you want to delete this submission?
        <br />
        <b>This action cannot be undone.</b>
      </Typography>
      <Button
        variant="arcade"
        color="error"
        disabled={loading}
        onClick={() => {
          setLoading(true);
          onConfirm();
        }}
        startIcon={
          loading ? <CircularProgress color="inherit" size="1rem" /> : undefined
        }
        fullWidth
        sx={{
          mt: 1,
        }}
      >
        {loading ? 'Deleting...' : 'Delete Permanently'}
      </Button>
    </BasicModal>
  );
};
