import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { playRoutes } from '@worksheets/routes';
import { PrefixTextField } from '@worksheets/ui/components/inputs';
import { labelFor } from '@worksheets/util/misc';
import { GameSubmissionForm } from '@worksheets/util/types';
import { FC } from 'react';

import { useGameSubmissionFormContext } from '../../../form-context';
import { DetailedListItemText } from '../detailed-list-item-text';

export const BasicInformationSection: FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <TitleField />
      <GameIdField />
      <HeadlineField />
      <ProjectTypeField />
    </Box>
  );
};

const TitleField: FC = () => {
  const { errors, values, setFieldValue } = useGameSubmissionFormContext();
  const id = 'title';
  const error = errors[id];

  return (
    <TextField
      id={id}
      error={Boolean(error)}
      value={values[id]}
      onChange={(e) => {
        setFieldValue(id, e.target.value);
      }}
      label="Title"
      required
      size="small"
      placeholder="My Awesome Game"
      helperText={error || 'A user friendly title for your game.'}
    />
  );
};

const GameIdField: FC = () => {
  const { values, errors, setFieldValue } = useGameSubmissionFormContext();

  const id = 'slug';
  const error = errors[id];
  const value = values[id];

  return (
    <PrefixTextField
      id={id}
      error={Boolean(error)}
      value={value}
      onChange={(e) => {
        setFieldValue(id, e.target.value);
      }}
      size="small"
      required
      label="Game ID"
      placeholder="game-id"
      helperText={
        error ||
        'Used in to identify and share your game link. Only letters, numbers, and dashes are allowed.'
      }
      prefix={playRoutes.play.url() + '/'}
    />
  );
};

const HeadlineField: FC = () => {
  const { errors, values, setFieldValue } = useGameSubmissionFormContext();

  const id = 'headline';
  const error = errors[id];
  const value = values[id];

  return (
    <TextField
      id={id}
      error={Boolean(error)}
      value={value}
      onChange={(e) => {
        setFieldValue(id, e.target.value);
      }}
      size="small"
      required
      label="Tagline"
      placeholder="My awesome game is awesome!"
      helperText={error || 'A short tagline for your game.'}
    />
  );
};

const ProjectTypeField: FC = () => {
  const { values, errors, setFieldValue } = useGameSubmissionFormContext();

  const id = 'projectType';
  const error = errors[id];
  const value = values[id];

  return (
    <FormControl fullWidth>
      <InputLabel size="small" id={labelFor(id)}>
        Project Type
      </InputLabel>
      <Select
        id={id}
        size="small"
        labelId={labelFor(id)}
        error={Boolean(error)}
        value={value ?? ''}
        label="Project Type"
        onChange={(e) =>
          setFieldValue(id, e.target.value as GameSubmissionForm['projectType'])
        }
      >
        <MenuItem dense value={'HTML'}>
          <DetailedListItemText
            primary="HTML"
            secondary=" &#8212; You have a zip file containing an HTML5 game."
          />
        </MenuItem>
        <MenuItem dense value={'EXTERNAL'}>
          <DetailedListItemText
            primary="Web Embed"
            secondary=" &#8212; You have a website that hosts your game."
          />
        </MenuItem>
      </Select>
      <FormHelperText error={Boolean(error)}>
        {error ||
          'Whether your game should be hosted on our platform or if we should link to an external site.'}
      </FormHelperText>
    </FormControl>
  );
};
