import React, { FC, useState } from 'react';
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import urls from '@worksheets/util/urls';
import { GameFile } from './game-file';
import {
  GameSubmissionFileKeys,
  GameSubmissionForm,
  GameSubmissionFormContextType,
  useGameSubmissionFormContext,
} from '../../../../form-context';

export const GameFiles: FC = () => {
  const id = 'gameFile';

  const { values, errors, upload, destroy } = useGameSubmissionFormContext();

  const value = values[id];
  const error = errors[id];

  const isHTML5 = values.projectType === 'HTML';

  return (
    <Box display={isHTML5 ? 'flex' : 'none'} flexDirection="column" gap={2}>
      <Typography variant="h5" mb={-1}>
        Game Files
      </Typography>
      <Box>
        <FormHelperText
          component="span"
          error={Boolean(error)}
          sx={{
            fontWeight: 900,
          }}
        >
          {error || 'Upload a ZIP file containing your game'}
        </FormHelperText>
        <FormHelperText component="span">
          {' '}
          &#8212; Your ZIP file must include an index.html file. For more
          information on the zip file requirements, see the{' '}
          <Link
            href="/contribute#what-file-formats-are-supported"
            target="_blank"
          >
            FAQ: 'How do I upload an HTML5 Game?'{' '}
            <OpenInNewIcon fontSize="inherit" sx={{ mb: '-2px' }} />
          </Link>
          .
        </FormHelperText>
      </Box>
      <GameFileInput
        id={id}
        value={value}
        error={error}
        destroy={destroy}
        upload={upload}
      />
    </Box>
  );
};

const GameFileInput: React.FC<{
  id: Extract<GameSubmissionFileKeys, 'gameFile'>;
  value: GameSubmissionForm['gameFile'];
  error: string;
  destroy: GameSubmissionFormContextType['destroy'];
  upload: GameSubmissionFormContextType['upload'];
}> = ({ id, value, upload, error, destroy }) => {
  const [uploading, setUploading] = useState(false);

  if (value) {
    return (
      <GameFile
        name={value.name}
        timestamp={value.timestamp}
        size={value.size}
        status={error ? 'error' : uploading ? 'uploading' : 'uploaded'}
        error={error}
        onDelete={async () => {
          return await destroy(id);
        }}
      />
    );
  }

  return (
    <FormControl variant="standard">
      <Input
        id={id}
        error={Boolean(error)}
        size="small"
        type="file"
        disableUnderline
        inputProps={{
          accept: '.zip',
        }}
        onChange={async (e) => {
          const target = e.target as HTMLInputElement;
          const files = target.files;

          setUploading(true);
          await upload(id, files);
          setUploading(false);
        }}
      />
      <GameFileHelperText error={error} />
    </FormControl>
  );
};

const GameFileHelperText: React.FC<{ error?: string }> = ({ error }) =>
  error ? (
    <FormHelperText error>{error}</FormHelperText>
  ) : (
    <FormHelperText>
      File size limit: 50MB.{' '}
      <Link href={`mailto:${urls.email.admin}`} target="_blank">
        Contact us
      </Link>{' '}
      if you need more space.
    </FormHelperText>
  );
