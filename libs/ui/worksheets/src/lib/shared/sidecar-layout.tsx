import { Box, Divider, Drawer } from '@mui/material';

export const SidecarLayout: React.FC<{
  open: boolean;
  onClose: () => void;
  section1?: React.ReactNode;
  section2?: React.ReactNode;
  section3?: React.ReactNode;
  title?: React.ReactNode;
  width?: number | string;
}> = ({ open, onClose, section1, section2, section3, title, width }) => (
  <Drawer
    anchor="right"
    open={open}
    onClose={onClose}
    sx={{
      '& .MuiDrawer-paper': {
        width: width,
        maxWidth: width,
        minWidth: width,
        padding: 0,
      },
    }}
  >
    <Box mt={'64px'}>
      {title && (
        <Box px={3} py={1}>
          {title}
        </Box>
      )}
      {title && <Divider />}

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
