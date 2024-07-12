import { Button, Typography } from '@mui/material';
import { CharityGamesLogo } from '@worksheets/icons/native';
import { Column } from '@worksheets/ui/components/flex';
import { InfoModal, ModalWrapper } from '@worksheets/ui/components/modals';

export const AdBlockModal: React.FC<ModalWrapper<{ message?: string }>> = ({
  open,
  onClose,
  message = `We'll still let you play
          without ads`,
}) => {
  return (
    <InfoModal
      open={open}
      onClose={(event, reason) => {
        if (reason !== 'backdropClick') {
          onClose?.(event, reason);
        }
      }}
      hideClose
    >
      <Column textAlign="center" alignItems="center" mb={2}>
        <CharityGamesLogo size={128} />
        <Typography typography={{ xs: 'h5', sm: 'h4' }} gutterBottom>
          <strong>We need your help!</strong>
        </Typography>

        <Typography px={4} mb={2}>
          We rely on ads to keep our website running. <b>{message}</b>, but we'd
          appreciate it if you could disable your ad blocker for this site.
        </Typography>

        <Button
          id="ignore-ad-block"
          variant="arcade"
          color="secondary"
          onClick={() => onClose?.({}, 'escapeKeyDown')}
        >
          I Don't Care
        </Button>
      </Column>
    </InfoModal>
  );
};
