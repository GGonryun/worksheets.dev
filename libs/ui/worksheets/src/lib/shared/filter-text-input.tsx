import { Box, TextField, InputAdornment } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterListOutlined';
import { FC } from 'react';

export type FilterTextInputProps = {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
};
export const FilterTextInput: FC<FilterTextInputProps> = ({
  placeholder,
  value,
  onChange,
}) => (
  <Box paddingLeft={2} marginTop={'0.25em'}>
    <TextField
      sx={{ display: 'flex', gap: 2, alignItems: 'center' }}
      size="small"
      variant="standard"
      fullWidth
      placeholder={placeholder}
      InputProps={{
        disableUnderline: true,
        startAdornment: (
          <InputAdornment position="start" sx={{ marginTop: '-4px' }}>
            <FilterListIcon color="action" />
          </InputAdornment>
        ),
      }}
    />
  </Box>
);
