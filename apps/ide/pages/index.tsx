import { Box } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import { useTimeout } from '@worksheets/ui/common';
export default function Index() {
  const { push } = useRouter();
  useTimeout(() => {
    push(`/ide/${uuidv4()}`);
  }, 1000);
  return <Box>Loading IDE...</Box>;
}
