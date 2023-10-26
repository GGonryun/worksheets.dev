import { Settings, WaterDropOutlined } from '@mui/icons-material';
import { Flex } from '@worksheets/ui-core';
import { motion } from 'framer-motion';
import { FC } from 'react';
import { IconAction } from '../Buttons';
import { animate } from '../../util';

export type TitleHeaderProps = {
  color?: string;
  onSettings: () => void;
  onDonate: () => void;
};

export const TitleHeader: FC<TitleHeaderProps> = ({
  color,
  onSettings,
  onDonate,
}) => {
  return (
    <Flex fullWidth mx={'auto'} pt={2}>
      <Flex grow spaceBetween px={2}>
        <motion.div {...animate(100, 0.3)}>
          <IconAction
            color={color}
            onClick={onDonate}
            Icon={WaterDropOutlined}
          />
        </motion.div>
        <motion.div {...animate(100, 0.3)}>
          <IconAction color={color} onClick={onSettings} Icon={Settings} />
        </motion.div>
      </Flex>
    </Flex>
  );
};
