import Box from '@mui/material/Box';
import Button, { ButtonProps } from '@mui/material/Button';
import { FC, JSXElementConstructor } from 'react';
import ShareIcon from '@mui/icons-material/Share';
import ReportIcon from '@mui/icons-material/Flag';
import { styled } from '@mui/material/styles';

export const GameActions: FC<{ onShare: () => void; onReport: () => void }> = ({
  onShare,
  onReport,
}) => (
  <Box display="flex" gap={1}>
    <GameActionButton onClick={onShare} startIcon={<ShareIcon />}>
      Share
    </GameActionButton>
    <GameActionButton onClick={onReport} startIcon={<ReportIcon />}>
      Report
    </GameActionButton>
  </Box>
);

export const GameActionButton = styled<JSXElementConstructor<ButtonProps>>(
  (props) => (
    <Button
      variant="contained"
      color="primary"
      disableElevation
      size="small"
      {...props}
    />
  )
)(({ theme }) => ({
  fontFamily: theme.typography.dangrek.fontFamily,
  textTransform: 'none',
  borderRadius: theme.shape.borderRadius * 4,
}));
