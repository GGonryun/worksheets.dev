import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { routes } from '@worksheets/routes';
import { ClipboardText } from '@worksheets/ui/components/inputs';
import { BasicModal, ModalWrapper } from '@worksheets/ui/components/modals';
import {
  shareGameIntent,
  SocialButtons,
} from '@worksheets/ui/components/social-media';
import { FC } from 'react';

export const ShareGameModal: FC<
  ModalWrapper<{
    id: string;
    name: string;
  }>
> = ({ id, name, open, onClose }) => {
  const gameUrl = routes.game.url({
    params: {
      gameId: id,
    },
  });

  const handleClose = () => {
    onClose && onClose({}, 'backdropClick');
  };
  return (
    <BasicModal open={open} onClose={onClose}>
      <Typography typography={{ xs: 'h6', sm: 'h5' }}>
        Share this game
      </Typography>
      <SocialButtonsWrapper title={name} id={id} />
      <ClipboardText label="Game URL" text={gameUrl} />
      <Button fullWidth variant="arcade" size="small" onClick={handleClose}>
        Close
      </Button>
    </BasicModal>
  );
};

const SocialButtonsWrapper: FC<{ title: string; id: string }> = ({
  title,
  id,
}) => {
  const intent = shareGameIntent({ title, id });

  return (
    <SocialButtons
      twitter={intent.twitter}
      facebook={intent.facebook}
      reddit={intent.reddit}
    />
  );
};
