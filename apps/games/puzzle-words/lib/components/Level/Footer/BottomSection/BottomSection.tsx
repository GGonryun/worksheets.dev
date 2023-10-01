import { Flex } from '@worksheets/ui-core';
import { IconButton } from '../../../IconButton';
import { Report } from '@mui/icons-material';
import { FC } from 'react';
import { FooterProps } from '../Footer';
import { BonusWordsButton } from './BonusWordsButton';

export const BottomSection: FC<FooterProps> = (props) => {
  const { openSubmitReport } = props;

  return (
    <Flex fullWidth spaceBetween position="absolute" bottom={0}>
      <BonusWordsButton {...props} />
      <IconButton onClick={openSubmitReport}>
        <Report />
      </IconButton>
    </Flex>
  );
};
