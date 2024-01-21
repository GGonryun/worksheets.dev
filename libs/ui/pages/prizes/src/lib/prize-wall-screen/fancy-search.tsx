import { Search } from '@mui/icons-material';
import { TextField, Theme, useMediaQuery } from '@mui/material';

export const FancySearch = () => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );

  return (
    <TextField
      disabled
      size={isMobile ? 'small' : 'medium'}
      placeholder={'Search is coming soon!'}
      fullWidth
      InputProps={{
        disableUnderline: true,
        startAdornment: (
          <Search color="primary" fontSize="large" sx={{ pl: 1 }} />
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
          pl: 1,
          '&::placeholder': {
            fontWeight: 700,
          },
        },
      }}
    />
  );
};
