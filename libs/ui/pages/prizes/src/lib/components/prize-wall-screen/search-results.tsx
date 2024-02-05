import { ContactSupport, SearchOff } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { PrizeSchema } from '@worksheets/util/types';

import { PrizesGroup } from './prizes-group';

export const SearchResults: React.FC<{ searched: PrizeSchema[] }> = ({
  searched,
}) => {
  return (
    <PrizesGroup
      header={
        <Typography
          pb={{ xs: 1, sm: 2 }}
          sx={{
            typography: { xs: 'h6', sm: 'h4' },
          }}
        >
          Search Results
        </Typography>
      }
      empty={
        <Box display="flex" flexDirection="column" gap={2}>
          <SearchOff
            sx={{
              fontSize: '4rem',
            }}
          />
          <Typography>No results found for this search</Typography>
          <Button
            variant="arcade"
            color="secondary"
            href="/contact"
            sx={{
              alignSelf: 'flex-end',
              width: 'fit-content',
            }}
            startIcon={<ContactSupport />}
          >
            Request a Prize
          </Button>
        </Box>
      }
      prizes={searched}
    />
  );
};
