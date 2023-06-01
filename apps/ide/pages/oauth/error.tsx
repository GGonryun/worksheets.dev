import { Box } from '@mui/material';
import { useRouter } from 'next/router';

export default function Error() {
  const router = useRouter();
  const reason = router.query.reason as string;
  return <Box>Failed to complete connection. Error: {reason || '???'}</Box>;
}
