import {
  Box,
  Button,
  ButtonProps,
  IconButton,
  Typography,
} from '@mui/material';
import { FC, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { ReportReasonForm } from './report-reason-form';
import { AdditionalComments } from './additional-comments';
import { InfringementText } from './infringement-text';
import { BaseModal, ModalWrapper } from '@worksheets/ui-core';
import { ReportReason } from '@prisma/client';

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
    <BaseModal open={open} onClose={onClose}>
      <Box display="flex" flexDirection="column" minWidth={250} maxWidth={600}>
        <IconButton
          onClick={handleClose}
          size="small"
          sx={{ m: 1, alignSelf: 'flex-end' }}
        >
          <CloseIcon />
        </IconButton>
        <Box
          display="flex"
          flexDirection="column"
          py={2}
          px={{ xs: 2, sm: 4 }}
          mt={-3}
        >
          {success ? (
            <ReportReceived onClose={handleClose} />
          ) : (
            <ReportForm onReport={handleReport} onClose={handleClose} />
          )}
        </Box>
      </Box>
    </BaseModal>
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
        <CustomButton color="success" onClick={onClose}>
          Okay
        </CustomButton>
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
    <Box display="flex" flexDirection="column" gap={2}>
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
      gap={1}
      mt={2}
      mr={{ xs: 0, sm: -2 }}
    >
      <CustomButton color="success" onClick={onSubmit}>
        Report
      </CustomButton>
      <CustomButton variant="outlined" color="primary" onClick={onCancel}>
        Cancel
      </CustomButton>
    </Box>
  );
};

const CustomButton: FC<Omit<ButtonProps, 'sx'>> = (props) => {
  return (
    <Button
      variant="contained"
      color="primary"
      size="small"
      {...props}
      sx={{
        px: 3,
        borderRadius: 6,
        fontFamily: (theme) => theme.typography.body1.fontFamily,
        textTransform: 'none',
        fontWeight: 700,
      }}
    />
  );
};
