import { FC, ReactNode } from 'react';
import { Flex } from '@worksheets/ui-core';
import {
  BackgroundColors,
  PaddingStyles,
  useLayout,
} from '@worksheets/ui/common';

export const HorizontalSection: FC<
  PaddingStyles & {
    backgroundColor?: BackgroundColors;
    left?: ReactNode;
    right: ReactNode;
    flip?: boolean;
  }
> = ({ flip, left, right, backgroundColor, ...styles }) => {
  const { isMobile } = useLayout();
  const l = flip ? right : left;
  const r = flip ? left : right;
  return (
    <Flex
      fullWidth
      spaceBetween={!isMobile}
      centered={isMobile}
      sx={styles}
      gap={2}
      wrap={isMobile}
    >
      <Flex centered width={isMobile ? '90%' : '45%'}>
        {l}
      </Flex>
      <Flex width={isMobile ? '90%' : '45%'}>{r}</Flex>
    </Flex>
  );
};
