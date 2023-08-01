import { Box, Divider, Drawer } from '@mui/material';

export const SidecarLayout: React.FC<{
  open: boolean;
  onClose: () => void;
  section1: React.ReactNode;
  section2: React.ReactNode;
  section3: React.ReactNode;
  title: React.ReactNode;
  width?: number | string;
}> = ({ open, onClose, section1, section2, section3, title, width = 600 }) => (
  <Drawer anchor="right" open={open} onClose={onClose}>
    <Box mt={'64px'} width={width}>
      <Box px={3} py={1}>
        {title}
      </Box>
      <Divider />

      {section1 && (
        <>
          <Box px={3} py={2}>
            {section1}
          </Box>
          <Divider />
        </>
      )}
      {section2 && (
        <>
          <Box px={3} py={2}>
            {section2}
          </Box>
          <Divider />
        </>
      )}
      {section3 && (
        <>
          <Box px={3} py={2}>
            {section3}
          </Box>
          <Divider />
        </>
      )}
    </Box>
  </Drawer>
);
