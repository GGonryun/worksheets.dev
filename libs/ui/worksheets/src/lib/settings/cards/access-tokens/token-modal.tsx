import { ContentCopy } from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { useClipboard } from '@worksheets/ui/common';
import { SharedTextField } from '../../../shared/shared-text-field';

export const TokenModal: React.FC<{
  open: boolean;
  text: string;
  onClose: () => void;
}> = ({ open, onClose, text }) => {
  const clipboard = useClipboard();
  return (
    <Dialog
      open={open}
      onClose={() => onClose()}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      fullWidth
    >
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={1}>
          <Typography variant="h6">Token Created</Typography>
          <Box py={1}>
            <Typography variant="body1">
              Please save your token in a safe place.
            </Typography>
            <Typography variant="body2" fontWeight={900}>
              We will not show it again.
            </Typography>
          </Box>
          <Box display="flex" width="400px" alignItems="center" gap={4}>
            <SharedTextField
              value={text}
              InputProps={{ color: 'primary' }}
              onFocus={(event) => event.target.select()}
            />
            <Tooltip title="Copy to clipboard">
              <IconButton onClick={() => clipboard.copy(text)}>
                <span>
                  <ContentCopy />
                </span>
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          fullWidth
          onClick={() => {
            onClose();
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
