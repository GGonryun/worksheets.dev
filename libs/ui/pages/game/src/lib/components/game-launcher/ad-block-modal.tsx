import { ArrowRight, Close } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { CharityGamesLogo } from '@worksheets/icons/native';
import { Column } from '@worksheets/ui/components/flex';
import { InfoModal, ModalWrapper } from '@worksheets/ui/components/modals';

export const AdBlockModal: React.FC<ModalWrapper> = ({ open, onClose }) => {
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
          We rely on ads to keep our games free. We'll still let you play
          without ads, but we'd appreciate it if you could disable your ad
          blocker for this site.
        </Typography>

        <Button
          id="ignore-ad-block"
          variant="arcade"
          color="secondary"
          size="large"
          onClick={() => onClose?.({}, 'escapeKeyDown')}
          startIcon={<Close />}
        >
          I don't care
        </Button>
      </Column>
    </InfoModal>
  );
};
