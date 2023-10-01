import { Typography } from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import Image from 'next/image';
import { WorksheetsLink } from '../Links';

export const Producer = () => (
  <Flex fullWidth centered gap={1}>
    <Typography>
      A game by <WorksheetsLink />
    </Typography>
    <Flex sx={{ backgroundColor: 'background.paper' }}>
      <Image src="/logo.svg" alt={'Worksheets Logo'} height={32} width={32} />
    </Flex>
  </Flex>
);
