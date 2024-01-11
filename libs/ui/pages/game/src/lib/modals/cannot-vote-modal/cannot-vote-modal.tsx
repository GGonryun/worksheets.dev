import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import { BaseModal, ModalWrapper } from '@worksheets/ui-core';
import { ColoredGestureThumbsCombo } from '@worksheets/ui/icons';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

export const CannotVoteModal: React.FC<
  ModalWrapper<{
    href: string;
  }>
> = ({ href, open, onClose }) => {
  const handleClose = () => {
    onClose && onClose({}, 'backdropClick');
  };
  return (
    <BaseModal open={open} onClose={onClose}>
      <Box
        sx={{
          maxWidth: 400,
          minWidth: 300,
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
          }}
        >
          <IconButton
            onClick={handleClose}
            size="small"
            sx={{ m: 1, alignSelf: 'flex-end' }}
          >
            <CancelIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            p: 3,
          }}
        >
          <ColoredGestureThumbsCombo
            sx={{
              fontSize: 150,
            }}
          />

          <Typography variant="h4" color="error" textAlign="center">
            Account Required
          </Typography>
          <Typography variant="body1">
            Create an account to vote on games, earn tokens, participate in
            auctions, and more!
          </Typography>
          <Button
            href={href}
            variant="round"
            color="error"
            onClick={handleClose}
            endIcon={<ArrowRightAltIcon />}
            sx={{
              mt: 2,
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
