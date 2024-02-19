import { Box } from '@mui/material';

export const BookmarkAnchor: React.FC<{ id: string }> = ({ id }) => (
  <Box
    component="a"
    id={id}
    sx={{
      display: 'block',
      position: 'relative',
      top: { xs: -60, sm: -80 },
      visibility: 'hidden',
    }}
  />
);
