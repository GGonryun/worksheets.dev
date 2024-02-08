import { Clear, Search } from '@mui/icons-material';
import { IconButton, TextField, Theme, useMediaQuery } from '@mui/material';

export const FancySearch: React.FC<{
  search: string;
  setSearch: (value: string) => void;
}> = ({ search, setSearch }) => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );

  return (
    <TextField
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      size={isMobile ? 'small' : 'medium'}
      placeholder={'Search for a Raffle'}
      fullWidth
      InputProps={{
        startAdornment: (
          <Search color="primary" fontSize="large" sx={{ pl: 1 }} />
        ),
        endAdornment: (
          <IconButton
            sx={{
              mr: 1,
              display: search ? 'inline-flex' : 'none',
            }}
            onClick={() => setSearch('')}
          >
            <Clear color="primary" fontSize="large" />
          </IconButton>
        ),
        sx: {
          p: isMobile ? 0.25 : 1,
          fontSize: isMobile ? '1rem' : '1.25rem',
          fontWeight: 700,
          backgroundColor: (theme) => theme.palette.background.paper,
          boxShadow: (theme) => theme.shadows[10],
          borderRadius: 50,
        },
      }}
      sx={{
        maxWidth: 720,
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderWidth: '0px',
          },
          '&:hover fieldset': {
            borderWidth: '0px',
          },
          '&.Mui-focused fieldset': {
            borderWidth: '0px',
          },
        },
      }}
      inputProps={{
        sx: {
          pl: 2,
          '&::placeholder': {
            fontWeight: 700,
          },
        },
      }}
    />
  );
};
