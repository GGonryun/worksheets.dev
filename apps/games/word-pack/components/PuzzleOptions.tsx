import {
  HelpCenterOutlined,
  Replay,
  ReportOutlined,
} from '@mui/icons-material';
import {
  Divider,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { denseBoxShadow } from '@worksheets/ui-games';
import { FC } from 'react';

export const PuzzleOptions: FC<{
  anchor?: Element;
  onClose: () => void;
  onReport: () => void;
  onReplay: () => void;
  onHelp: () => void;
}> = ({ anchor, onClose, onReplay, onReport, onHelp }) => {
  return (
    <Menu
      anchorEl={anchor}
      open={Boolean(anchor)}
      onClose={onClose}
      PaperProps={{
        elevation: 0,
        variant: 'outlined',
        sx: { boxShadow: denseBoxShadow({ height: 6 }) },
      }}
      sx={{
        '& .MuiMenuItem-root': {
          paddingY: 0,
        },
        '& .MuiListItemText-root': {
          paddingLeft: 2,
        },
      }}
    >
      <MenuItem dense onClick={onReplay}>
        <Replay color="action" />
        <ListItemText inset>
          <Typography>Restart Level</Typography>
        </ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem dense onClick={onReport}>
        <ReportOutlined color="action" />
        <ListItemText inset>
          <Typography>Report Issue</Typography>
        </ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem dense onClick={onHelp}>
        <HelpCenterOutlined color="action" />
        <ListItemText inset>
          <Typography>How to Play</Typography>
        </ListItemText>
      </MenuItem>
    </Menu>
  );
};
