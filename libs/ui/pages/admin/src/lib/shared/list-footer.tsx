import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { Box, Button } from '@mui/material';

export const ListFooter: React.FC<{
  pageSize: number;
  page: number;
  count: number;
  onPrevious: () => void;
  onNext: () => void;
}> = ({ pageSize, page, count, onPrevious, onNext }) => (
  <Box display="flex" justifyContent="space-between" mt={2}>
    <Button
      variant="arcade"
      onClick={onPrevious}
      startIcon={<ArrowBack />}
      sx={{
        visibility: page === 0 ? 'hidden' : 'visible',
      }}
    >
      Previous
    </Button>

    <Button
      variant="arcade"
      onClick={onNext}
      endIcon={<ArrowForward />}
      sx={{
        visibility: count < pageSize ? 'hidden' : 'visible',
      }}
    >
      Next
    </Button>
  </Box>
);
