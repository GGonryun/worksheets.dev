import { Typography } from '@mui/material';
import { TinyLogo } from '@worksheets/ui-basic-style';
import { Flex } from '@worksheets/ui-core';
import { FC } from 'react';
import { WhiteProductButton } from './product-buttons';
import { urls } from '@worksheets/ui/common';

export const GetStartedSection: FC = () => (
  <Flex column alignItems="center">
    <TinyLogo src="/logo.svg" area={108} borderless />
    <Typography variant="h4" fontWeight={900}>
      Try Worksheets today
    </Typography>
    <Typography
      py={1}
      variant="body1"
      maxWidth={320}
      textAlign="center"
      color="text.secondary"
    >
      Get back to building your product. Worksheets will handle the rest.
    </Typography>
    <WhiteProductButton
      sx={{
        my: 3,
        width: 200,
      }}
      href={urls.app.contact}
    >
      Get 30 days free
    </WhiteProductButton>
  </Flex>
);
