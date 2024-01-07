import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';
import { useFormContext } from '../../context';
import { ImageUpload } from '@worksheets/ui/images';

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

    <ScreenshotsImageField />

    <TrailerVideoField />
  </Box>
);

const ThumbnailImageField = () => {
  const { values, errors, uploadThumbnail, deleteThumbnail } = useFormContext();

  const id = 'thumbnail';

  const error = errors[id];
  const value = values[id];

  const size = {
    height: 200,
    width: 200,
  };

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

      {value && (
        <ImageUpload
          {...size}
          src={value.url}
          onDelete={async () => await deleteThumbnail(value)}
        />
      )}

      {!value && (
        <Input
          id={id}
          size="small"
          type="file"
          disableUnderline
          inputProps={{ accept: 'image/*' }}
          onChange={async (e) => {
            const target = e.target as HTMLInputElement;
            const file = target.files?.[0];
            if (file) {
              return await uploadThumbnail(file);
            }
          }}
        />
      )}
    </Box>
  );
};

const CoverImageField = () => {
  const { values, errors, uploadCover, deleteCover } = useFormContext();

  const id = 'cover';

  const error = errors[id];
  const value = values[id];

  const size = {
    height: 200,
    width: 300,
  };

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

      {value && (
        <ImageUpload
          {...size}
          src={value.url}
          onDelete={async () => await deleteCover(value)}
        />
      )}

      {!value && (
        <Input
          id={id}
          size="small"
          type="file"
          disableUnderline
          inputProps={{ accept: 'image/*' }}
          onChange={async (e) => {
            const target = e.target as HTMLInputElement;
            const file = target.files?.[0];
            if (file) {
              return await uploadCover(file);
            }
          }}
        />
      )}
    </Box>
  );
};

const ScreenshotsImageField = () => {
  const { values, errors, uploadScreenshots, deleteScreenshot } =
    useFormContext();

  const size = {
    height: 200,
    width: 200,
  };

  const id = 'screenshots';

  const error = errors[id];
  const value = values[id];

  return (
    <Box display="flex" flexDirection="column" gap={0.5}>
      <Box>
        <FormHelperText component="span" error={Boolean(error)}>
          <b>Upload screenshots of your game</b>
        </FormHelperText>
        <FormHelperText component="span">
          {' '}
          &#8212; Screenshots are used to showcase your game on the game page.
          You can upload up to 6 screenshots. Select multiple images to upload
          them all at once.
        </FormHelperText>
        <FormHelperText error={Boolean(error)}>
          {error || '(Minimum: 200 pixels wide. Recommended: 512 pixels wide.)'}
        </FormHelperText>
      </Box>

      <Box
        gap={1}
        flexWrap="wrap"
        display={value.length ? 'flex' : 'none'}
        mb={1}
      >
        {value.map((image, index) => (
          <ImageUpload
            {...size}
            key={index}
            src={image.url}
            onDelete={async () => {
              await deleteScreenshot(image);
            }}
          />
        ))}
      </Box>

      {!value.length && (
        <Input
          id={id}
          error={Boolean(error)}
          size="small"
          type="file"
          disableUnderline
          inputProps={{ multiple: true, accept: 'image/*' }}
          onChange={async (e) => {
            const target = e.target as HTMLInputElement;
            const files = target.files;
            if (files) {
              return await uploadScreenshots(files);
            }
          }}
        />
      )}
    </Box>
  );
};

const TrailerVideoField = () => {
  const { values, errors, setFieldValue } = useFormContext();
  const id = 'trailer';

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
