import { ArrowBack, Menu } from '@mui/icons-material';
import { Flex, useDeviceSize } from '@worksheets/ui-core';
import { IconAction } from '@worksheets/ui-games';
import { FC, MouseEventHandler } from 'react';

export type PuzzleHeaderProps = {
  children?: React.ReactNode;
  onMenu: MouseEventHandler<HTMLButtonElement>;
  onBack: MouseEventHandler<HTMLButtonElement>;
};
export const PuzzleHeader: FC<PuzzleHeaderProps> = ({
  onBack,
  onMenu,
  children,
}) => {
  const { isMobile } = useDeviceSize();

  return (
    <Flex fullWidth maxWidth={700} mx={'auto'} pt={1}>
      <Flex grow spaceBetween px={2}>
        <IconAction dense={isMobile} onClick={onBack} Icon={ArrowBack} />

        {children}

        <IconAction dense={isMobile} onClick={onMenu} Icon={Menu} />
      </Flex>
    </Flex>
  );
};
