import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useTimeout } from '@worksheets/ui/common';
import { FC } from 'react';
export const HomeLoader: FC = () => {
  const { push } = useRouter();

  useTimeout(() => {
    push(`/ide`);
  }, 1250);
  return (
    <Box>
      <Box>Loading Integrated Development Environment . . .</Box>
    </Box>
  );
};
