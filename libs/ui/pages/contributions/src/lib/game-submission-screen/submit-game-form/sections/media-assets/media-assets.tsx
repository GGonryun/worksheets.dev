import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';

export const MediaAssets = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
    }}
  >
    <Typography variant="h5" sx={{ mb: -1 }}>
      Media Assets
    </Typography>
    <Box display="flex" flexDirection="column" gap={0.5}>
      <FormHelperText>
        <b>Upload a thumbnail image for your game.*</b> This image will be
        displayed in the game list. The thumbnail should be a square image.
        <br />
        (Minimum: 250x250 pixels. Recommended: 512x512 pixels.)
      </FormHelperText>
      <Input
        id="thumbnail-upload"
        size="small"
        type="file"
        disableUnderline
        inputProps={{ accept: 'image/*' }}
      />
    </Box>
    <Box display="flex" flexDirection="column" gap={0.5}>
      <FormHelperText>
        <b>Upload a cover image for your game.*</b> The cover is used on load
        screens and other places where a wider image is needed. The cover should
        be a wide image.
        <br />
        (Minimum: 500 pixels wide. Recommended: 1080 pixels wide.)
        <br />
      </FormHelperText>
      <Input
        id="cover-upload"
        size="small"
        type="file"
        disableUnderline
        inputProps={{ accept: 'image/*' }}
      />
    </Box>
    <Box display="flex" flexDirection="column" gap={0.5}>
      <FormHelperText>
        <b>Optionally upload screenshots of your game.</b> Screenshots are used
        to showcase your game on the game page. You can upload up to 5
        screenshots.
      </FormHelperText>

      <Input
        id="screenshots-upload"
        size="small"
        type="file"
        disableUnderline
        inputProps={{ multiple: true, accept: 'image/*' }}
      />
    </Box>
    <FormControl>
      <FormHelperText sx={{ p: 0, m: 0, mb: 0.5 }}>
        <b>Game play video or trailer</b> <br />
        Use a YouTube or Vimeo link
      </FormHelperText>
      <TextField
        size="small"
        placeholder="https://www.youtube.com/watch?v=o8PWi-cJOx0"
      />
    </FormControl>
  </Box>
);
