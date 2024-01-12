import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useGameSubmissionFormContext } from '../../../../form-context';
import { CategorySelectField } from './category-select-field';
import { TagsAutocompleteField } from './tags-autocomplete-field';

export const GameDetails = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
    }}
  >
    <Typography variant="h5">Game Details</Typography>

    <DescriptionField />

    <InstructionsField />

    <CategorySelectField />

    <TagsAutocompleteField />
  </Box>
);

const DescriptionField = () => {
  const { values, errors, setFieldValue } = useGameSubmissionFormContext();

  const id = 'description';

  const value = values[id];
  const error = errors[id];

  return (
    <TextField
      id={id}
      size="small"
      required
      label="Description"
      value={value}
      onChange={(e) => setFieldValue(id, e.target.value)}
      multiline
      rows={3}
      helperText={
        error ||
        "A short description of your game. If you need rich text formatting, please indicate that in the description and we'll contact you to discuss your options."
      }
      error={Boolean(error)}
    />
  );
};

const InstructionsField = () => {
  const { values, errors, setFieldValue } = useGameSubmissionFormContext();

  const id = 'instructions';

  const value = values[id];
  const error = errors[id];

  return (
    <TextField
      id={id}
      value={value}
      onChange={(e) => setFieldValue(id, e.target.value)}
      size="small"
      required
      label="Instructions"
      multiline
      rows={3}
      error={Boolean(error)}
      helperText={error || 'A short manual describing how to play your game.'}
    />
  );
};
