import { Box, Button, Typography } from '@mui/material';
import { ReportReason } from '@worksheets/prisma';
import { BasicModal, ModalWrapper } from '@worksheets/ui/components/modals';
import { FC, useState } from 'react';

import { AdditionalComments } from './additional-comments';
import { InfringementText } from './infringement-text';
import { ReportReasonForm } from './report-reason-form';

export const ReportIssueModal: FC<
  ModalWrapper<{
    onReport: (reason: ReportReason, comment: string) => void;
  }>
> = ({ onReport, open, onClose }) => {
  const [success, setSuccess] = useState(false);

  const handleClose = () => {
    onClose && onClose({}, 'backdropClick');
    setSuccess(false);
  };

  const handleReport = (reason: ReportReason, comment: string) => {
    onReport(reason, comment);
    setSuccess(true);
  };

  return (
    <BasicModal
      open={open}
      onClose={onClose}
      sx={{
        width: '90%',
        maxWidth: 600,
      }}
    >
      {success ? (
        <ReportReceived onClose={handleClose} />
      ) : (
        <ReportForm onReport={handleReport} onClose={handleClose} />
      )}
    </BasicModal>
  );
};

const ReportReceived: FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography variant="h4" fontSize={{ xs: '1.8rem', sm: '2.5rem' }}>
        Report Received
      </Typography>
      <Typography variant="body2">
        We have received your report and will review it as soon as possible.
        Thank you for helping us keep Charity.Games a safe and fun place to
        play!
      </Typography>
      <Box mt={2} alignSelf={'flex-end'}>
        <Button variant="arcade" onClick={onClose}>
          Close
        </Button>
      </Box>
    </Box>
  );
};

const ReportForm: FC<{
  onReport: (reason: ReportReason, comment: string) => void;
  onClose: () => void;
}> = ({ onReport, onClose }) => {
  const [reason, setReason] = useState<ReportReason | undefined>(undefined);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!reason) {
      setError('Please select a reason');
    } else {
      onReport(reason, comment);
    }
  };

  const handleCancel = () => {
    onClose();
    setReason(undefined);
    setComment('');
    setError('');
  };

  return (
    <Box display="flex" flexDirection="column" gap={2} textAlign="left">
      <Typography variant="h4" fontSize={{ xs: '1.8rem', sm: '2.5rem' }}>
        Report this Game
      </Typography>
      <ReportReasonForm error={error} onChange={setReason} reason={reason} />
      <AdditionalComments comment={comment} onChange={setComment} />
      <InfringementText />
      <FormActions onCancel={handleCancel} onSubmit={handleSubmit} />
    </Box>
  );
};

const FormActions: FC<{ onSubmit: () => void; onCancel: () => void }> = ({
  onSubmit,
  onCancel,
}) => {
  return (
    <Box
      display="flex"
      alignSelf={'flex-end'}
      gap={2}
      mt={2}
      mr={{ xs: 0, sm: -2 }}
    >
      <Button variant="text" color="primary" onClick={onCancel}>
        Cancel
      </Button>
      <Button variant="arcade" color="success" onClick={onSubmit}>
        Report
      </Button>
    </Box>
  );
};
