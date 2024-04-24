import { Close, QuestionMarkOutlined } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';

import { OnClose } from './modal';

export const CloseButton: React.FC<{ onClick: OnClose }> = (props) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 6,
        right: 6,
      }}
    >
      <IconButton
        onClick={() => props.onClick?.({}, 'escapeKeyDown')}
        size="small"
        disableRipple
        sx={{
          p: '3px',
          background: (theme) => theme.palette.primary.gradient,
        }}
      >
        <Close fontSize="small" color="white" />
      </IconButton>
    </Box>
  );
};
export const InfoButton: React.FC<{ href: string }> = ({ href }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 6,
        right: 6,
      }}
    >
      <IconButton
        href={href}
        target="_blank"
        size="small"
        disableRipple
        sx={{
          p: '3px',
          background: (theme) => theme.palette.primary.gradient,
        }}
      >
        <QuestionMarkOutlined fontSize="small" color="white" />
      </IconButton>
    </Box>
  );
};
