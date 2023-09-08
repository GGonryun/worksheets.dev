import { Drawer, Box, CircularProgress, useTheme } from '@mui/material';

export type TinySidecarProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: number | string;
  maxWidth?: number | string;
  loading?: boolean;
  slow?: boolean;
};

export const TinySidecar: React.FC<TinySidecarProps> = ({
  children,
  open,
  onClose,
  width,
  maxWidth,
  loading,
  slow,
}) => {
  const theme = useTheme();
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: width,
          maxWidth: maxWidth,
          padding: 0,
        },
      }}
      transitionDuration={slow ? { enter: 500, exit: 700 } : undefined}
      SlideProps={
        slow
          ? {
              easing: {
                enter: theme.transitions.easing.easeInOut,
                exit: theme.transitions.easing.easeOut,
              },
            }
          : undefined
      }
    >
      <Box height="100%" width="100%">
        {loading ? (
          <Box
            height="100%"
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <CircularProgress size={72} />
          </Box>
        ) : (
          children
        )}
      </Box>
    </Drawer>
  );
};
