import { Box, Button, IconButton, Modal, ModalProps } from '@mui/material';
import { FC } from 'react';
import { JoinNewsletterBox } from './JoinNewsletterBox';
import { Close } from '@mui/icons-material';
import { ParagraphText } from './Typography';

export const NewsletterPopup: FC<
  Pick<ModalProps, 'open'> & { onClose: () => void; onIgnore: () => void }
> = ({ open, onClose, onIgnore }) => {
  return (
    <Modal
      open={open}
      onClose={(e, reason) => {
        // do not allow closing by clicking outside of the modal.
        if (reason === 'backdropClick') return;
        onClose && onClose();
      }}
    >
      <div>
        <Box
          sx={{
            p: 3,
            pt: 1,
            borderRadius: 2,
            border: (theme) => `4px solid ${theme.palette.grey[600]}`,
            backgroundColor: (theme) => theme.palette.grey[100],
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            top: '50%',
            left: '50%',
            minWidth: 300,
            transform: 'translate(-50%, -50%)',
            overflow: 'scroll',
          }}
        >
          <IconButton
            onClick={onClose}
            sx={{
              alignSelf: 'flex-end',
            }}
          >
            <Close fontSize="large" />
          </IconButton>
          <JoinNewsletterBox />
          <Button onClick={onIgnore} sx={{ pt: 3 }}>
            <ParagraphText
              sx={{
                fontWeight: 400,
                color: (theme) => theme.palette.grey[800],
                textTransform: 'none',
              }}
            >
              Don&apos;t ask me again
            </ParagraphText>
          </Button>
        </Box>
      </div>
    </Modal>
  );
};
