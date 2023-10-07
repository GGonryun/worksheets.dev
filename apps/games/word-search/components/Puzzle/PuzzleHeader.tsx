import { ArrowBack, ReportOutlined } from '@mui/icons-material';
import { IconButton, SvgIconProps, useTheme } from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import { urls } from '../../util';
import { useRouter } from 'next/router';
import { Word } from '../Words';
import { FC } from 'react';

export type PuzzleHeaderProps = {
  level: number;
  onBack: () => void;
  onReport: () => void;
};

export const PuzzleHeader: FC<PuzzleHeaderProps> = ({
  level,
  onBack,
  onReport,
}) => {
  const { push } = useRouter();
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
        <Word onClick={() => push(urls.home())}>Puzzle #{level}</Word>
        <IconButton disableRipple onClick={onReport}>
          <ReportOutlined {...iconProps} />
        </IconButton>
      </Flex>
    </Flex>
  );
};
