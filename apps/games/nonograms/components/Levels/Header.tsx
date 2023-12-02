import { HomeOutlined, InfoOutlined } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import {
  IconAction,
  animate,
  responsiveFontSize,
  textShadow,
} from '@worksheets/ui-games';
import { motion } from 'framer-motion';
import { FC } from 'react';

export type HeaderProps = {
  onHome: () => void;
  onInfo: () => void;
};

export const Header: FC<HeaderProps> = ({ onHome, onInfo }) => {
  return (
    <Flex fullWidth>
      <Flex grow spaceBetween>
        <motion.div {...animate(-100, 0.3)}>
          <IconAction Icon={HomeOutlined} onClick={onHome} />
        </motion.div>
        <motion.div {...animate(-100, 0.3)}>
          <Typography
            color="primary.contrastText"
            fontWeight={900}
            variant="h5"
            fontSize={responsiveFontSize({ grow: 6 })}
            sx={{
              textShadow: textShadow(2),
            }}
          >
            Levels
          </Typography>
        </motion.div>
        <motion.div {...animate(-100, 0.3)}>
          <IconAction Icon={InfoOutlined} onClick={onInfo} />
        </motion.div>
      </Flex>
    </Flex>
  );
};
