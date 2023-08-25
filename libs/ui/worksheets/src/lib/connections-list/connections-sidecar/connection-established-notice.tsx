import { Paper, alpha, Typography } from '@mui/material';
import { FC } from 'react';
import { TinyLogo } from '../../shared/tiny-logo';
import { Flex } from '@worksheets/ui/common';
import { isLastBitOne } from '@worksheets/util-sys';

export const ConnectionEstablishedNotice: FC<{ connectionId: string }> = ({
  connectionId,
}) => (
  <Paper
    variant="outlined"
    sx={(theme) => ({
      backgroundColor: alpha(theme.palette.success.main, 0.1),
      borderColor: theme.palette.success.main,
    })}
  >
    <Flex px={3} column>
      <Flex gap={3}>
        {isLastBitOne(connectionId) ? (
          <TinyLogo
            label={'happy woman'}
            src={'/art/happy-woman.svg'}
            borderless
            area={164}
          />
        ) : (
          <TinyLogo
            label={'happy man'}
            src={'/art/happy-man.svg'}
            borderless
            area={164}
          />
        )}
        <Flex column gap={3} my={1}>
          <Flex column gap={0}>
            <Typography variant="h6" fontWeight={900}>
              Connection established
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your connection was established successfully. Click on
              configuration for advanced options.
            </Typography>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  </Paper>
);
