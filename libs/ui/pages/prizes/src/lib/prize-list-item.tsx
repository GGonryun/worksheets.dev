import { Paper } from '@mui/material';
import { ColoredSteamGames } from '@worksheets/icons/companies';
import { ActivationCodeImage } from '@worksheets/ui/components/activation-codes';
import { Row } from '@worksheets/ui/components/flex';
import { PrizeSchema } from '@worksheets/util/types';
import React from 'react';

import { PrizePrice } from './prize-price';

export const PrizeListItem: React.FC<{
  item: PrizeSchema;
  onClick: () => void;
}> = ({ item, onClick }) => {
  return (
    <Paper
      onClick={onClick}
      sx={{
        background: (theme) =>
          theme.palette.background.marketing.gradients.blue.primary,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.2s',
        '&:hover': {
          boxShadow: (theme) => theme.shadows[9],
          transform: 'scale(1.05)',
        },
      }}
    >
      <ActivationCodeImage src={item.imageUrl} alt={item.name} />
      <Row px={1} py={0.5} justifyContent="space-between" position="relative">
        <ColoredSteamGames
          sx={{
            height: 36,
            width: 36,
          }}
        />

        <PrizePrice value={item.value} discount={item.discount} />
      </Row>
    </Paper>
  );
};
