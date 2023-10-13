import { ArrowBack, Menu } from '@mui/icons-material';
import { IconButton, SvgIconProps, useTheme } from '@mui/material';
import { Flex } from '@worksheets/ui-core';
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
  const theme = useTheme();
  const iconProps: SvgIconProps = {
    sx: {
      color: theme.palette.primary.contrastText,
    },
    fontSize: 'large',
  };

  return (
    <Flex fullWidth maxWidth={700} mx={'auto'} pt={1}>
      <Flex grow spaceBetween px={2}>
        <IconButton disableRipple onClick={onBack}>
          <ArrowBack {...iconProps} />
        </IconButton>
        {children}

        <IconButton disableRipple onClick={onMenu}>
          <Menu {...iconProps} />
        </IconButton>
      </Flex>
    </Flex>
  );
};
