import { FC } from 'react';
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import urls from '@worksheets/util/urls';
import { useFormContext } from '../../context';
import { GameFile } from './game-file';

export const GameFiles: FC = () => {
  const { values } = useFormContext();
  const isHTML5 = values.projectType === 'html';
  return (
    <Box display={isHTML5 ? 'flex' : 'none'} flexDirection="column" gap={2}>
      <Typography variant="h5" mb={-1}>
        Game Files
      </Typography>
      <FormHelperText>
        <b>Upload a ZIP file containing your game.</b> Your ZIP file must
        include an index.html file. For more information on the zip file
        requirements, see the{' '}
        <Link
          href="/contribute#what-file-formats-are-supported"
          target="_blank"
        >
          FAQ: 'How do I upload an HTML5 Game?'{' '}
          <OpenInNewIcon fontSize="inherit" sx={{ mb: '-2px' }} />
        </Link>
        .
      </FormHelperText>
      <GameFileInput />
    </Box>
  );
};

const GameFileInput = () => {
  const id = 'gameFile';
  const { values, errors } = useFormContext();

  const value = values[id];
  const error = errors[id];

  if (value) {
    return <GameFile file={value} error={error} />;
  }

  return (
    <FormControl variant="standard">
      <Input
        id={id}
        size="small"
        type="file"
        disableUnderline
        inputProps={{
          accept: '.zip',
        }}
      />
      <GameFileHelperText />
    </FormControl>
  );
};

const GameFileHelperText = () => (
  <FormHelperText>
    File size limit: 50MB.{' '}
    <Link href={`mailto:${urls.email.admin}`} target="_blank">
      Contact us
    </Link>{' '}
    if you need more space.
  </FormHelperText>
);
