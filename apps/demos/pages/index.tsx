import { Box, Button } from '@mui/material';
import { useRouter } from 'next/router';

export default function Index() {
  const { push } = useRouter();
  return (
    <Box>
      <Button onClick={() => push('/calculator')}>Calculator</Button>
      <Button onClick={() => push('/form-filler')}>Form Fillter</Button>
      <Button onClick={() => push('/disc-golf')}>Disc Golf Scorecard</Button>
    </Box>
  );
}
