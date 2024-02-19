import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { ClipboardText } from '@worksheets/ui/components/inputs';
import {
  sharePrizeIntent,
  SocialButtons,
} from '@worksheets/ui/components/social-media';
import { routes } from '@worksheets/ui/routes';
import { BaseModal, ModalWrapper } from '@worksheets/ui-core';
import { FC } from 'react';

export const SharePrizeModal: FC<
  ModalWrapper<{
    id: number;
    name: string;
  }>
> = ({ id, name, open, onClose }) => {
  const url = routes.prize.url({
    params: {
      prizeId: id,
    },
  });

  const handleClose = () => {
    onClose && onClose({}, 'backdropClick');
  };
  return (
    <BaseModal open={open} onClose={onClose}>
      <Box display="flex" flexDirection="column">
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
          width={{ xs: 250, sm: 350 }}
          px={{ xs: 2, sm: 4 }}
          mt={-3}
        >
          <Typography typography={{ xs: 'h6', sm: 'h5' }}>
            Share this Prize
          </Typography>
          <SocialButtonsWrapper name={name} id={id} />
          <Box mt={1} mb={3}>
            <ClipboardText text={url} />
          </Box>
          <Button variant="arcade" size="small" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </Box>
    </BaseModal>
  );
};

const SocialButtonsWrapper: React.FC<{ name: string; id: number }> = ({
  id,
  name,
}) => {
  const intent = sharePrizeIntent({ name, id });

  return <SocialButtons facebook={intent.facebook} twitter={intent.twitter} />;
};
