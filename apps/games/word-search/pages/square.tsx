import { Box } from '@mui/material';

export function Index() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        p: 1,
        backgroundColor: 'red',
      }}
    >
      <Box
        sx={{
          height: '50%',
          width: '100%',
          position: 'relative',
          border: '2px dashed',
        }}
      >
        <Box
          sx={{
            aspectRatio: '1 / 1',
            width: '100%',
            maxHeight: '100%',
            backgroundColor: 'green',
          }}
        >
          <Box
            sx={{
              aspectRatio: '1 / 1',
              height: '100%',
              maxWidth: '100%',
              marginLeft: 'auto',
              marginRight: 'auto',
              display: 'grid',
              placeContent: 'center',
              backgroundColor: 'pink',
            }}
          >
            Top
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          height: '50%',
          border: '2px dashed',
          display: 'grid',
          placeContent: 'center',
        }}
      >
        I am the bottom
      </Box>
    </Box>
  );
}

export default Index;
