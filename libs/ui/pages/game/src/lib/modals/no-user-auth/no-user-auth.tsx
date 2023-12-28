import { Box, Button, IconButton, Typography } from '@mui/material';
import { BaseModal, ModalWrapper } from '../base/base-modal';
import { FC, ReactNode } from 'react';
import CloseIcon from '@mui/icons-material/Close';

export const NoUserAuthModal: FC<
  ModalWrapper<{
    icon: ReactNode;
    text: string;
    href: string;
  }>
> = ({ href, icon, text, open, onClose }) => {
  const handleClose = () => {
    onClose && onClose({}, 'backdropClick');
  };
  return (
    <BaseModal open={open} onClose={onClose}>
      <Box display="flex" flexDirection="column" minWidth={250} maxWidth={400}>
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
          <Box>
            {icon}
            <Typography variant="h5">Connect to your account</Typography>
            <Typography variant="body1">{text}</Typography>
          </Box>
          <Button
            href={href}
            variant="contained"
            color="primary"
            size="small"
            onClick={handleClose}
            sx={{
              mt: 2,
              mr: { xs: 0, sm: -2 },
              borderRadius: 6,
              alignSelf: 'flex-end',
              width: { xs: '100%', sm: 'fit-content' },
              fontFamily: (theme) => theme.typography.body1.fontFamily,
              textTransform: 'none',
              fontWeight: 700,
            }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </BaseModal>
  );
};
