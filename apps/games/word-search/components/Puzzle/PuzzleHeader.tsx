import { ArrowBack, ReportOutlined } from '@mui/icons-material';
import { useTheme } from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import { useRouter } from 'next/router';
import { Word } from '../Words';
import { FC } from 'react';
import { IconAction, urls } from '@worksheets/ui-games';

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

  return (
    <Flex fullWidth maxWidth={700} mx={'auto'} pt={1}>
      <Flex grow spaceBetween px={2}>
        <IconAction dense Icon={ArrowBack} onClick={onBack} />
        <Word large onClick={() => push(urls.relative.home)}>
          Puzzle #{level}
        </Word>
        <IconAction dense Icon={ReportOutlined} onClick={onReport} />
      </Flex>
    </Flex>
  );
};
