import { Typography } from '@mui/material';
import { TinyLogo } from '@worksheets/ui-basic-style';
import { Flex } from '@worksheets/ui-core';
import { WORKSHEETS_URL } from '@worksheets/util-projects';
import Link from 'next/link';
import { FC } from 'react';

export const GameTitle: FC = () => (
  <Flex column centered pb={6}>
    <Typography variant="h3">
      <strong>Emoji War</strong>
    </Typography>
    <Typography variant="body1" pb={1}></Typography>
    <Flex gap={1}>
      <Link href={WORKSHEETS_URL} color="inherit">
        <Typography variant="body2">by Worksheets.dev</Typography>
      </Link>
      <TinyLogo
        borderless
        src={'/logo.svg'}
        area={24}
        sx={(theme) => ({
          mt: -0.5,
          backgroundColor: theme.palette.secondary.dark,
          borderRadius: '5px',
          p: 0.5,
        })}
      />
    </Flex>
  </Flex>
);
