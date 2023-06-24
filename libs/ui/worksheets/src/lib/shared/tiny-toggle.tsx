import { Box, Button } from '@mui/material';

import OnCircleIcon from '@mui/icons-material/Circle';
import OffCircleIcon from '@mui/icons-material/CircleOutlined';

export const TinyToggle = ({
  onChange,
  disabled = false,
  value = false,
}: {
  disabled?: boolean;
  value?: boolean;
  onChange: (newValue: boolean) => void;
}) => (
  <Button
    sx={{ p: 0, m: 0 }}
    disabled={disabled}
    variant="text"
    size="small"
    onClick={() => onChange(!value)}
    startIcon={
      value ? (
        <OnCircleIcon fontSize="small" color="primary" />
      ) : (
        <OffCircleIcon fontSize="small" color="primary" />
      )
    }
  >
    <Box width="32px">{value ? 'on' : 'off'}</Box>
  </Button>
);
