import { Typography, Link } from '@mui/material';
import assets from '@worksheets/assets-common';
import { textShadow, urls } from '../../util';
import { Flex } from '@worksheets/ui-core';
import Image from 'next/image';

export const Publisher = () => (
  <Flex centered pb={2} gap={1}>
    <Typography
      color="primary.contrastText"
      variant="body2"
      sx={{
        textShadow: textShadow(),
      }}
    >
      by{' '}
      <Link href={urls.charityGames.home()} color="primary.contrastText">
        Charity.Games
      </Link>
    </Typography>
    <Image
      src={assets.worksheets.logo}
      alt={'Worksheets Logo'}
      height={30}
      width={30}
    />
  </Flex>
);
