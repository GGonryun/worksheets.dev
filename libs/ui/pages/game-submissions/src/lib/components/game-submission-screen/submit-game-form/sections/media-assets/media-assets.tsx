import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';
import { ImageUpload } from '@worksheets/ui/components/uploads';
import { useState } from 'react';

import { useGameSubmissionFormContext } from '../../../../form-context';

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

    <ThumbnailImageField />

    <CoverImageField />

    <TrailerVideoField />
  </Box>
);

const ThumbnailImageField = () => {
  const { values, errors, upload, destroy } = useGameSubmissionFormContext();
  const [uploading, setUploading] = useState(false);

  const id = 'thumbnailFile';

  const error = errors[id];
  const value = values[id];

  const size = {
    height: 200,
    width: 200,
  };

  const shouldShow = Boolean(uploading || value || error);

  return (
    <Box display="flex" flexDirection="column" gap={0.5}>
      <Box>
        <FormHelperText component="span" error={Boolean(error)}>
          <b>Upload a thumbnail image for your game.*</b>
        </FormHelperText>
        <FormHelperText component="span">
          {' '}
          &#8212; This image will be displayed in the game list. The thumbnail
          should be a square image.
        </FormHelperText>
        <FormHelperText error={Boolean(error)}>
          {error || '(Minimum: 250x250 pixels. Recommended: 512x512 pixels.)'}
        </FormHelperText>
      </Box>

      {shouldShow ? (
        <ImageUpload
          {...size}
          error={error}
          src={value?.url}
          onDelete={async () => await destroy(id)}
        />
      ) : (
        <Input
          id={id}
          size="small"
          type="file"
          disableUnderline
          inputProps={{ accept: 'image/*' }}
          onChange={async (e) => {
            setUploading(true);
            await upload(id, (e.target as HTMLInputElement).files);
            setUploading(false);
          }}
        />
      )}
    </Box>
  );
};

const CoverImageField = () => {
  const { values, errors, upload, destroy } = useGameSubmissionFormContext();
  const [uploading, setUploading] = useState(false);

  const id = 'coverFile';

  const error = errors[id];
  const value = values[id];

  const size = {
    height: 200,
    width: 300,
  };

  const shouldShow = Boolean(uploading || value || error);

  return (
    <Box display="flex" flexDirection="column" gap={0.5}>
      <Box>
        <FormHelperText component="span" error={Boolean(error)}>
          <b>Upload a cover image for your game*</b>
        </FormHelperText>
        <FormHelperText component="span">
          {' '}
          &#8212; The cover is used on load screens and other places where a
          wider image is needed. The cover should be a wide image.
        </FormHelperText>
        <FormHelperText error={Boolean(error)}>
          {error ||
            '(Minimum: 500 pixels wide. Recommended: 1080 pixels wide.)'}
        </FormHelperText>
      </Box>

      {shouldShow ? (
        <ImageUpload
          {...size}
          error={error}
          src={value?.url}
          onDelete={async () => await destroy(id)}
        />
      ) : (
        <Input
          id={id}
          size="small"
          type="file"
          disableUnderline
          inputProps={{ accept: 'image/*' }}
          onChange={async (e) => {
            setUploading(true);
            await upload(id, (e.target as HTMLInputElement).files);
            setUploading(false);
          }}
        />
      )}
    </Box>
  );
};

const TrailerVideoField = () => {
  const { values, errors, setFieldValue } = useGameSubmissionFormContext();
  const id = 'trailerUrl';

  const value = values[id];
  const error = errors[id];

  return (
    <FormControl>
      <FormHelperText sx={{ p: 0, m: 0, mb: 0.5 }} error={Boolean(error)}>
        <b>Game play video or trailer</b>
      </FormHelperText>
      <FormHelperText sx={{ p: 0, m: 0, mb: 0.5 }}>
        Use a YouTube or Vimeo link
      </FormHelperText>
      <TextField
        error={Boolean(error)}
        size="small"
        // Easter Egg: Nice Guys Love You - Vol. 3 [Full Compilation]
        placeholder="https://www.youtube.com/watch?v=o8PWi-cJOx0"
        value={value}
        onChange={(e) => setFieldValue(id, e.target.value)}
      />
      <FormHelperText error={Boolean(error)}>{error}</FormHelperText>
    </FormControl>
  );
};
