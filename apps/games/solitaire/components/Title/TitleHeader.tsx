import { Settings, WaterDropOutlined } from '@mui/icons-material';
import { SvgIconProps, IconButton, useTheme } from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import { animate } from '@worksheets/ui-games';
import { motion } from 'framer-motion';
import { FC } from 'react';

export type TitleHeaderProps = {
  onSettings: () => void;
  onDonate: () => void;
  water: number;
};

export const TitleHeader: FC<TitleHeaderProps> = ({
  onSettings,
  onDonate,
  water,
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
