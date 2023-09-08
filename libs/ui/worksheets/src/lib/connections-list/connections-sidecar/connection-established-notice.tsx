import { Paper, alpha, Typography, Button } from '@mui/material';
import { FC } from 'react';
import { Flex } from '@worksheets/ui-core';
import { isLastBitOne } from '@worksheets/util-sys';
import { East } from '@mui/icons-material';
import { TinyLogo } from '@worksheets/ui-basic-style';

export const ConnectionEstablishedNotice: FC<{
  connectionId: string;
  onClose: () => void;
}> = ({ connectionId, onClose }) => (
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
              Optionally, configure your connection's name or settings below.
            </Typography>
          </Flex>
          <Button
            size="small"
            variant="contained"
            color="success"
            endIcon={<East sx={{ ml: 1 }} />}
            onClick={onClose}
          >
            Close Sidecar
          </Button>
        </Flex>
      </Flex>
    </Flex>
  </Paper>
);
