import { Typography, Link, Paper } from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import { urls } from '@worksheets/ui/common';
import Image from 'next/image';

export const SidecarFooter = () => {
  return (
    <Paper variant="outlined">
      <Flex gap={3} p={3} centered>
        <Image
          src="/art/worried-man.svg"
          width={92}
          height={92}
          alt="person reading a book"
        />
        <Flex column>
          <Typography variant="h6" color="text.secondary">
            Can't find what you need?
          </Typography>

          <Typography variant="body2" component="span" color="text.secondary">
            <Link href={urls.app.contact} component="a">
              Contact us for help
            </Link>{' '}
            or{' '}
            <Link href={urls.app.contact} component="a">
              create a support ticket
            </Link>
          </Typography>
        </Flex>
      </Flex>
    </Paper>
  );
};
