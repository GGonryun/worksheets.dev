import { Typography } from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import Link from 'next/link';
import { FC } from 'react';
import { urls } from '../urls';
import Image from 'next/image';

export const GameTitle: FC = () => (
  <Flex column centered>
    <Typography variant="h3">
      <strong>Emoji War</strong>
    </Typography>
    <Flex fullWidth column centered>
      <Typography variant="caption">
        A charity game made by{' '}
        <Link href={urls.worksheets('/games')} color="inherit">
          <Typography variant="caption">by Worksheets.dev</Typography>
        </Link>{' '}
        for
      </Typography>
      <Link href={urls.waterOrg()} color="inherit">
        <Image
          src={'/logos/water-org.png'}
          height={70.5}
          width={150}
          alt="water.org logo"
        />
      </Link>
    </Flex>
  </Flex>
);
