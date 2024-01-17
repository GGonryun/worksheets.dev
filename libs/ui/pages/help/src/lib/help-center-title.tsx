import { Search } from '@mui/icons-material';
import { Box, Link, TextField, Tooltip, Typography } from '@mui/material';

export const HelpCenterTitle: React.FC = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      width: '100%',
      maxWidth: 700,
    }}
  >
    <Typography variant="h3" fontSize={{ xs: '2rem', sm: '3rem' }}>
      Help Center
    </Typography>
    <Box my={0.5} />
    <Typography fontSize={{ xs: '0.875rem', sm: '1rem' }}>
      Get answers to all your questions about the{' '}
      <Link href="/">Charity Games</Link> platform.
    </Typography>
    <Box my={{ xs: 2, sm: 3 }} />
    <Tooltip
      title="Search feature is currently in progress."
      className={'try-search'}
    >
      <Box component="span" width="100%">
        <TextField
          disabled
          placeholder="Search feature coming soon!"
          // placeholder="Search the Knowledge Base"
          fullWidth
          InputProps={{
            startAdornment: <Search color="primary" fontSize="large" />,
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
      </Box>
    </Tooltip>
  </Box>
);

export type HelpCenterTitleProps = React.ComponentProps<typeof HelpCenterTitle>;
