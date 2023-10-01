import { Flex } from '@worksheets/ui-core';
import { FC, Fragment, ReactNode } from 'react';
import { linedPaper } from '../../backgrounds';
import { border } from '../../layouts';
import { useTheme } from '@mui/material';

export const LinedPaperLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const theme = useTheme();

  return (
    <Flex fill centered sx={linedPaper} p={2}>
      <Flex
        fill
        column
        p={2}
        maxWidth={400}
        maxHeight={700}
        sx={{
          border: border(theme),
          borderRadius: 4,
          backgroundColor: 'background.paper',
        }}
      >
        <Fragment>{children}</Fragment>
      </Flex>
    </Flex>
  );
};
