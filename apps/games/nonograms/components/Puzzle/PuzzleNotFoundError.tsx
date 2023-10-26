import { Typography, Button } from '@mui/material';
import Link from 'next/link';
import { FC } from 'react';
import { Flex } from '@worksheets/ui-core';
import { Error } from '@mui/icons-material';
import { urls } from '@worksheets/ui-games';

export const PuzzleNotFoundError: FC = () => {
  return (
    <Flex grow centered p={3} column gap={1}>
      <Error sx={{ fontSize: 64 }} color="error" />
      <Typography variant="h5" textAlign="center">
        This puzzle does not exist.
        <br />
        <Link href={urls.charityGames.contact()}>Contact us</Link> if you think
        this is an error.
      </Typography>
      <Button
        sx={{
          mt: 3,
        }}
        href={urls.relative.home}
      >
        <Typography variant="h5">Main Menu</Typography>
      </Button>
    </Flex>
  );
};
