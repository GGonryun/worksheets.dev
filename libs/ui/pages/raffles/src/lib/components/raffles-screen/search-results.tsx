import { ContactSupport, SearchOff } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { RafflesGroup } from '@worksheets/ui/components/raffles';
import { RaffleSchema } from '@worksheets/util/types';

export const SearchResults: React.FC<{ searched: RaffleSchema[] }> = ({
  searched,
}) => {
  return (
    <RafflesGroup
      title="Search Results"
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
      raffles={searched}
    />
  );
};
