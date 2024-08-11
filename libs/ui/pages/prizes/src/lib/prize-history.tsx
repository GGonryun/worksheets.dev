import { Box, Link, Typography } from '@mui/material';
import { routes } from '@worksheets/routes';
import { ActivationCodeImage } from '@worksheets/ui/components/activation-codes';
import { Description } from '@worksheets/ui/components/description';
import { Column } from '@worksheets/ui/components/flex';
import { printShortDateTime } from '@worksheets/util/time';
import {
  calculatePrizePrice,
  PrizeHistorySchema,
} from '@worksheets/util/types';
import React from 'react';

export const PrizeHistory: React.FC<{ history: PrizeHistorySchema[] }> = ({
  history,
}) => {
  return (
    <Description
      title="Prize History"
      description={
        <Box mt={{ xs: 1, sm: 2 }}>
          <Typography typography="body1" fontWeight={500}>
            Showing {history.length} most recently unlocked prizes
          </Typography>
          {history.map((prize) => (
            <Box
              key={prize.id}
              sx={{
                mt: 2,
                p: 2,
                borderRadius: (theme) => theme.shape.borderRadius,
                background: (theme) =>
                  theme.palette.background.marketing.gradients.blue.secondary,
              }}
            >
              <Box
                gap={2}
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: 'flex-start',
                }}
              >
                <Box
                  sx={{
                    borderRadius: (theme) => theme.shape.borderRadius,
                    width: { xs: '100%', sm: 264 },
                    overflow: 'hidden',
                  }}
                >
                  <ActivationCodeImage src={prize.imageUrl} alt={prize.name} />
                </Box>
                <Column>
                  <Typography typography="h5" fontWeight={900} gutterBottom>
                    {prize.name}
                  </Typography>
                  <Typography typography="body2" fontWeight={500}>
                    Prize ID: {prize.id}
                  </Typography>
                  <Typography typography="body2" fontWeight={500}>
                    Purchased At: {printShortDateTime(prize.purchasedAt)}
                  </Typography>
                  <Typography typography="body2" fontWeight={500}>
                    Purchased For: {calculatePrizePrice(prize)} tokens
                  </Typography>
                  <Typography typography="body2" fontWeight={500}>
                    Owner:{' '}
                    <Link
                      color="inherit"
                      href={routes.user.path({
                        params: { userId: prize.user.id },
                      })}
                    >
                      {prize.user.username}
                    </Link>
                  </Typography>
                </Column>
              </Box>
            </Box>
          ))}
        </Box>
      }
    />
  );
};
