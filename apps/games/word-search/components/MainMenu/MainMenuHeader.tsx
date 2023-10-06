import { Settings, WaterDropOutlined } from '@mui/icons-material';
import { SvgIconProps, IconButton, useTheme } from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import { animate } from '../../util';
import { motion } from 'framer-motion';
import { FC } from 'react';

export type MainMenuHeaderProps = {
  onSettings: () => void;
  onDonate: () => void;
};

export const MainMenuHeader: FC<MainMenuHeaderProps> = ({
  onSettings,
  onDonate,
}) => {
  const theme = useTheme();

  const iconProps: SvgIconProps = {
    sx: {
      color: theme.palette.primary.contrastText,
    },
    fontSize: 'large',
  };

  return (
    <Flex fullWidth mx={'auto'} pt={2}>
      <Flex grow spaceBetween px={2}>
        <motion.div {...animate(100, 0.3)}>
          <IconButton disableRipple onClick={onDonate}>
            <WaterDropOutlined {...iconProps} />
          </IconButton>
        </motion.div>
        <motion.div {...animate(100, 0.3)}>
          <IconButton disableRipple onClick={onSettings}>
            <Settings {...iconProps} />
          </IconButton>
        </motion.div>
      </Flex>
    </Flex>
  );
};
