import { ArrowRight } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { useMediaQuery } from '@worksheets/ui/hooks/use-media-query';
import { Markdown, MarkdownText } from '@worksheets/ui-core';
import { FC } from 'react';

import { CustomPaper } from './custom-paper';

export type CharityDescriptionProps = {
  description: MarkdownText;
};

export const CharityDescription: FC<CharityDescriptionProps> = ({
  description,
}) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  return (
    <CustomPaper>
      <Markdown
        text={description}
        sx={{
          '& h2:first-child': { marginTop: 0 },
          color: (theme) => theme.palette.text.arcade,
        }}
      />
      <Box mt={2}>
        <Button
          variant="arcade"
          color="error"
          size={isMobile ? 'small' : 'large'}
          href="/"
          endIcon={<ArrowRight />}
        >
          All Games
        </Button>
      </Box>
    </CustomPaper>
  );
};
