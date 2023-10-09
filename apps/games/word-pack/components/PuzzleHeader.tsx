import { ArrowBack, Menu } from '@mui/icons-material';
import { IconButton, SvgIconProps, Typography, useTheme } from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import { responsiveFontSize } from '@worksheets/ui-games';
import { FC, MouseEventHandler } from 'react';

export type PuzzleHeaderProps = {
  title: string;
  level: number;
  onMenu: MouseEventHandler<HTMLButtonElement>;
  onBack: MouseEventHandler<HTMLButtonElement>;
};

export const PuzzleHeader: FC<PuzzleHeaderProps> = ({
  title,
  level,
  onBack,
  onMenu,
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
        <Typography
          color={'primary.contrastText'}
          fontSize={responsiveFontSize({ min: 8, max: 30 })}
          textTransform={'uppercase'}
          textAlign={'center'}
        >
          <b>
            {level}. {title}
          </b>
        </Typography>
        <IconButton disableRipple onClick={onMenu}>
          <Menu {...iconProps} />
        </IconButton>
      </Flex>
    </Flex>
  );
};
