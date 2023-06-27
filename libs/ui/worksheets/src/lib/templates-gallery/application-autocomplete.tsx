import { Box, Chip, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { TinyLogo } from '../shared/tiny-logo';
import { trpc } from '@worksheets/trpc/ide';
import { ApplicationDetails } from '../shared/types';
import { Filter } from '@mui/icons-material';

export const ApplicationAutocomplete: React.FC<{
  selections: ApplicationDetails[];
  onSelect: (newSelections: ApplicationDetails[]) => void;
}> = ({ onSelect, selections }) => {
  const { data: applications } = trpc.applications.list.useQuery({});

  return (
    <Autocomplete
      value={selections}
      multiple
      onChange={(_, newValue) => {
        onSelect(newValue);
      }}
      id="applications-autocomplete"
      options={applications ?? []}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Filter worksheets by application"
          size="small"
        />
      )}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Box display="flex" alignItems="center" gap={1}>
            <TinyLogo borderless src={option.logo} label={option.name} />
            <Typography fontWeight={selected ? 900 : 500}>
              {option.name}
            </Typography>
          </Box>
        </li>
      )}
      renderTags={(value, getTagProps) => (
        <>
          {value.map((option, index) => (
            <Chip
              {...getTagProps({ index })}
              variant="outlined"
              label={option.name}
              size="small"
              icon={
                <TinyLogo
                  sx={{ pl: 1, mr: -0.5 }}
                  borderless
                  src={option.logo}
                  label={option.name}
                />
              }
            />
          ))}
        </>
      )}
      sx={{ width: '100%' }}
    />
  );
};
