import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { autocompleteFor } from '@worksheets/util/misc';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useGameSubmissionFormContext } from '../../../../form-context';
import { inputBaseClasses } from '@mui/material';

// TODO: load tags from the backend
const tags = [
  'action',
  'adventure',
  'arcade',
  'board',
  'card',
  'educational',
  'fighting',
  'idle',
  'novel',
  'platformer',
  'puzzle',
  'racing',
  'rhythm',
  'role-playing',
  'shooter',
  'simulation',
  'sports',
  'strategy',
  'survival',
  'trivia',
  'word',
  'advertising',
  'art',
  'casual',
  'cooperative',
  'crafting',
  'exploration',
  'horror',
  'music',
  'party',
  'puzzle-platformer',
  'sandbox',
  'stealth',
].sort();

const filter = createFilterOptions<string>();

export const TagsAutocompleteField = () => {
  const label = 'Tags';

  const id = 'tags';

  const { values, errors, setFieldValue } = useGameSubmissionFormContext();

  const error = errors[id];
  const value = values[id];

  return (
    <Autocomplete
      id={autocompleteFor(id)}
      value={value}
      multiple
      filterSelectedOptions
      onChange={(event, newValue) => {
        // search for any values that are in the newValue that include the "Add" prefix.
        // if there are any, remove the prefix and add them to the list
        const filtered = newValue
          .filter((v) => v.startsWith('Add '))
          .map((v) => v.replace('Add ', '').replace(/"/g, ''));
        // remove any values that are in the newValue that include the "Add" prefix.
        newValue = newValue.filter((v) => !v.startsWith('Add '));
        // add the new values to the list
        newValue = [...newValue, ...filtered];

        // if the value already exists in the list, don't add it again
        setFieldValue(id, newValue);
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // cleanse the input value of special characters, only allow lowercase letters, and dashes.
        const replacedSpaces = inputValue.replace(/\s/g, '-');
        const cleanValue = replacedSpaces.replace(/[^a-z-]/g, '');

        // Suggest the creation of a new value
        const isExisting = options.some((option) => cleanValue === option);

        if (cleanValue !== '' && !isExisting) {
          filtered.push(`Add "${cleanValue}"`);
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      options={tags}
      getOptionLabel={(option) => option}
      renderOption={(props, option) => (
        <MenuItem dense {...props}>
          {option}
        </MenuItem>
      )}
      freeSolo
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            {...getTagProps({ index })}
            size="small"
            color={tags.includes(option) ? 'primary' : 'secondary'}
            sx={{
              m: 0,
              py: 0,
              px: 0.5,
            }}
            label={<Typography variant="body3">{option}</Typography>}
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          id={id}
          size="small"
          required
          label={label}
          error={Boolean(error)}
          helperText={
            error ||
            'Additional keywords or categories that someone might search to find your game, max 10.'
          }
          sx={{
            //& .MuiInputBase-sizeSmall
            [`& ${inputBaseClasses.sizeSmall}`]: {
              pt: 1,
            },
          }}
          InputProps={{
            ...params.InputProps,
            sx: {
              paddingTop: '10px !important',
            },
          }}
        />
      )}
    />
  );
};
