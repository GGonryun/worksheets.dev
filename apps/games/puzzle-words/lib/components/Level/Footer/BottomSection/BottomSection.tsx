import { Flex } from '@worksheets/ui-core';
import { IconButton } from '../../../IconButton';
import { Report } from '@mui/icons-material';
import { FC } from 'react';
import { FooterProps } from '../Footer';
import { BonusWordsButton } from './BonusWordsButton';
import { IconAction } from '@worksheets/ui-games';
import { useTheme } from '@mui/material';

export const BottomSection: FC<FooterProps> = (props) => {
  const { openSubmitReport } = props;
  const theme = useTheme();
  const color = theme.palette.primary.light;

  return (
    <Flex fullWidth spaceBetween position="absolute" bottom={0}>
      <BonusWordsButton {...props} />
      <IconAction onClick={openSubmitReport} Icon={Report} color={color} />
    </Flex>
  );
};
