import { ArrowBack, Menu } from '@mui/icons-material';
import { Box } from '@mui/material';
import { FC } from 'react';
import { HeaderButton } from './HeaderButton';

export type HeaderProps = {
  windowHeight: number;
  size: number;
};

export const Header: FC<HeaderProps> = ({ windowHeight, size }) => {
  return (
    <Box
      position="absolute"
      top={windowHeight * 0.02}
      left={0}
      right={0}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box display="flex" width="90%" justifyContent="space-between">
        <HeaderButton Icon={ArrowBack} size={size} />
        <HeaderButton Icon={Menu} size={size} />
      </Box>
    </Box>
  );
};
