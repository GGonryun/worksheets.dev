import { ArrowRightAlt } from '@mui/icons-material';
import { Paper, alpha, Typography, Button } from '@mui/material';
import { FC } from 'react';
import { TinyLogo } from '../../shared/tiny-logo';
import { Flex } from '@worksheets/ui/common';

export const ConnectionInvalidNotice: FC = () => (
  <Paper
    variant="outlined"
    sx={(theme) => ({
      backgroundColor: alpha(theme.palette.warning.main, 0.1),
      borderColor: theme.palette.warning.main,
    })}
  >
    <Flex p={2} gap={5.5}>
      <TinyLogo
        label={'Person with stomach pain'}
        src={'/art/abdominal-pain-male.svg'}
        borderless
        area={132}
      />
      <Flex column gap={3}>
        <Flex column>
          <Typography variant="h6" fontWeight={900}>
            There's something wrong
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Your connection has a problem. Reconnect to fix it.
          </Typography>
        </Flex>
        <Button
          size="small"
          color="warning"
          variant="contained"
          endIcon={<ArrowRightAlt />}
        >
          Reconnect now
        </Button>
      </Flex>
    </Flex>
  </Paper>
);
