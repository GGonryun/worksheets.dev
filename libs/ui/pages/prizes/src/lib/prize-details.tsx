import { Box, Link, Typography } from '@mui/material';
import { ColoredSteamGames } from '@worksheets/icons/companies';
import { ActivationCodeImage } from '@worksheets/ui/components/activation-codes';
import { Row } from '@worksheets/ui/components/flex';
import { PrizeSchema } from '@worksheets/util/types';
import React from 'react';

import { PrizePrice } from './prize-price';

export const PrizeDetails: React.FC<{ prize: PrizeSchema }> = ({ prize }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'flex-start',
        gap: 2,
        p: { xs: 2, sm: 1.5 },
        background: (theme) =>
          theme.palette.background.marketing.gradients.blue.secondary,
        borderRadius: (theme) => theme.shape.borderRadius,
      }}
    >
      <Box
        sx={{
          width: { xs: '100%', sm: '50%' },
          borderRadius: (theme) => theme.shape.borderRadius,
          overflow: 'hidden',
        }}
      >
        <ActivationCodeImage src={prize.imageUrl} alt={prize.name} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'space-between',
          overflow: 'hidden',
          gap: 1,
          width: { xs: '100%', sm: '50%' },
        }}
      >
        <Typography
          typography="h6"
          fontWeight={900}
          color="text.arcade"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {prize.name}
        </Typography>
        <Box width="fit-content" alignItems="flex-end">
          <PrizePrice
            value={prize.value}
            discount={prize.discount}
            backgroundColor="solid"
          />
        </Box>
        <Row mt={0.5} gap={1}>
          <ColoredSteamGames />
          <Link
            color="text.arcade"
            typography="body2"
            fontWeight={700}
            href={prize.url}
            target="_blank"
          >
            View in Steam Games
          </Link>
        </Row>
      </Box>
    </Box>
  );
};
