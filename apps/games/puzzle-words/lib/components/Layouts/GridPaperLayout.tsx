import { Flex } from '@worksheets/ui-core';
import { FC, ReactNode } from 'react';
import { gridPaper } from '../../backgrounds';
import { useTheme } from '@mui/material';
import { border } from '../../layouts';

export type GridPaperLayout = {
  children: ReactNode;
};

export const GridPaperLayout: FC<GridPaperLayout> = ({ children }) => {
  const theme = useTheme();

  return (
    <Flex centered fill column sx={gridPaper} p={2}>
      <Flex
        fill
        column
        maxWidth={400}
        maxHeight={700}
        sx={{
          border: border(theme),
          borderRadius: 4,
          backgroundColor: 'background.paper',
        }}
      >
        {children}
      </Flex>
    </Flex>
  );
};
