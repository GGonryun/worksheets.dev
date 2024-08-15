import { Close, QuestionMarkOutlined } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { PaletteColor } from '@worksheets/ui/theme';

import { OnClose } from './modal';

export const CloseButton: React.FC<{
  onClick: OnClose;
  color?: PaletteColor;
}> = (props) => {
  const color = props.color || 'primary';
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
          zIndex: 1,
          background: (theme) => theme.palette[color].gradient,
        }}
      >
        <Close fontSize="small" color="white" />
      </IconButton>
    </Box>
  );
};
export const InfoButton: React.FC<{ href: string; color?: PaletteColor }> = (
  props
) => {
  const color = props.color || 'primary';

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 6,
        right: 6,
      }}
    >
      <IconButton
        href={props.href}
        target="_blank"
        size="small"
        disableRipple
        sx={{
          p: '3px',
          background: (theme) => theme.palette[color].gradient,
        }}
      >
        <QuestionMarkOutlined fontSize="small" color="white" />
      </IconButton>
    </Box>
  );
};
