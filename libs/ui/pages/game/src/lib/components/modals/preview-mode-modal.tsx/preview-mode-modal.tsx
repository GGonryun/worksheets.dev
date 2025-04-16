import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ColoredAudience } from '@worksheets/icons/youtube';
import { BasicModal, ModalWrapper } from '@worksheets/ui/components/modals';

export const PreviewModeModal: React.FC<
  ModalWrapper<{
    href: string;
  }>
> = ({ href, open, onClose }) => {
  const handleClose = () => {
    onClose && onClose({}, 'backdropClick');
  };
  return (
    <BasicModal open={open} onClose={onClose}>
      <ColoredAudience
        sx={{
          fontSize: 150,
        }}
      />

      <Typography variant="h4" color="error">
        Preview Mode
      </Typography>
      <Typography variant="body1">
        This game is currently in preview mode. Games in preview mode can only
        be played by their developers. If you are the developer, please publish
        your game to make it available to others and enable voting, sharing, and
        other features.
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
        Developer Dashboard
      </Button>
    </BasicModal>
  );
};
