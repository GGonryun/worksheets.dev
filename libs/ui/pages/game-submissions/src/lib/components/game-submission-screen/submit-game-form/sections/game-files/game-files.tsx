import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { routes } from '@worksheets/routes';
import { HelpDevelopersQuestions } from '@worksheets/util/enums';
import {
  GameSubmissionFileKeys,
  GameSubmissionForm,
  GameSubmissionFormContextType,
} from '@worksheets/util/types';
import urls from '@worksheets/util/urls';
import React, { FC, useState } from 'react';

import { useGameSubmissionFormContext } from '../../../../form-context';
import { GameFile } from './game-file';

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
            href={routes.help.developers.path({
              bookmark: HelpDevelopersQuestions.FileFormats,
            })}
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

  if (value || uploading) {
    return (
      <GameFile
        name={value?.name ?? 'Uploading...'}
        timestamp={value?.timestamp ?? new Date().getTime()}
        size={value?.size ?? 0}
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
