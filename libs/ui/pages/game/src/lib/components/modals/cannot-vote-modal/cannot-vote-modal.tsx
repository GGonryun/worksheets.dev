import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ColoredGestureThumbsCombo } from '@worksheets/icons/youtube';
import { BasicModal, ModalWrapper } from '@worksheets/ui/components/modals';

export const CannotVoteModal: React.FC<
  ModalWrapper<{
    href: string;
  }>
> = ({ href, open, onClose }) => {
  const handleClose = () => {
    onClose && onClose({}, 'backdropClick');
  };
  return (
    <BasicModal open={open} onClose={onClose}>
      <ColoredGestureThumbsCombo
        sx={{
          fontSize: 150,
        }}
      />

      <Typography variant="h4" color="error">
        Account Required
      </Typography>
      <Typography variant="body1">
        Create an account to vote on games, earn tokens, participate in raffles,
        and more!
      </Typography>
      <Button
        href={href}
        variant="arcade"
        size="small"
        color="error"
        onClick={handleClose}
        endIcon={<ArrowRightAltIcon />}
        sx={{
          mt: 2,
          alignSelf: 'flex-end',
          width: { xs: '100%', sm: 'fit-content' },
        }}
      >
        Sign In
      </Button>
    </BasicModal>
  );
};
