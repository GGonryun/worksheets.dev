import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { routes } from '@worksheets/routes';
import { ClipboardText } from '@worksheets/ui/components/inputs';
import { BasicModal, ModalWrapper } from '@worksheets/ui/components/modals';
import {
  shareRaffleIntent,
  SocialButtons,
} from '@worksheets/ui/components/social-media';
import { FC } from 'react';

export const ShareRaffleModal: FC<
  ModalWrapper<{
    id: number;
    name: string;
  }>
> = ({ id, name, open, onClose }) => {
  const url = routes.raffle.url({
    params: {
      raffleId: id,
    },
  });

  const handleClose = () => {
    onClose && onClose({}, 'backdropClick');
  };
  return (
    <BasicModal open={open} onClose={onClose}>
      <Typography typography={{ xs: 'h6', sm: 'h5' }}>
        Share this Raffle
      </Typography>
      <SocialButtonsWrapper name={name} id={id} />
      <ClipboardText text={url} />
      <Button fullWidth variant="arcade" size="small" onClick={handleClose}>
        Close
      </Button>
    </BasicModal>
  );
};

const SocialButtonsWrapper: React.FC<{ name: string; id: number }> = ({
  id,
  name,
}) => {
  const intent = shareRaffleIntent({ name, id });

  return <SocialButtons facebook={intent.facebook} twitter={intent.twitter} />;
};
