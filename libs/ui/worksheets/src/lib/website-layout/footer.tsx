import { Paper } from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import { SharedWebsiteFooter } from '@worksheets/ui/common';

export function WebsiteFooter() {
  return (
    <Flex column fullWidth>
      <Paper elevation={0} sx={{ p: 3 }}>
        <SharedWebsiteFooter />
      </Paper>
    </Flex>
  );
}
