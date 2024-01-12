import CancelIcon from '@mui/icons-material/Cancel';
import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { BaseModal } from '@worksheets/ui-core';
import React from 'react';

import ColoredCancelIcon from '../../icons/cancel';
import { BasicGameSubmission } from '../../types';

export const ConfirmDeletionModal: React.FC<{
  submission: BasicGameSubmission | undefined;
  onConfirm: () => void;
  onCancel: () => void;
}> = ({ onConfirm, onCancel, submission }) => {
  const [loading, setLoading] = React.useState(false);
  return (
    <BaseModal onClose={() => onCancel()} open={Boolean(submission)}>
      <Box
        sx={{
          maxWidth: 400,
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
          }}
        >
          <IconButton size="small" onClick={onCancel}>
            <CancelIcon fontSize="medium" />
          </IconButton>
        </Box>
        <Box
          sx={{
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
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
            variant="round"
            color="error"
            disabled={loading}
            onClick={() => {
              setLoading(true);
              onConfirm();
            }}
            startIcon={
              loading ? (
                <CircularProgress color="inherit" size="1rem" />
              ) : undefined
            }
            fullWidth
            sx={{
              mt: 1,
            }}
          >
            {loading ? 'Deleting...' : 'Delete Permanently'}
          </Button>
        </Box>
      </Box>
    </BaseModal>
  );
};
