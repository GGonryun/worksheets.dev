import { Box, Divider, Typography } from '@mui/material';
import { FC, ReactNode } from 'react';
import { Flex, MicroMarkdown, MicroMarkdownText } from '@worksheets/ui-core';

export const HeaderSection: FC<{
  icon?: ReactNode;
  title: MicroMarkdownText;
  subtitle?: MicroMarkdownText;
  dividerless?: boolean;
}> = ({ icon, title, subtitle, dividerless }) => {
  return (
    <Flex centered column>
      {icon && <Box pb={2}>{icon}</Box>}
      <Typography variant="h5">
        <MicroMarkdown text={title} />
      </Typography>
      {subtitle && (
        <Typography
          variant="caption"
          color="text.secondary"
          px={4}
          pt={0.5}
          textAlign="center"
        >
          <MicroMarkdown text={subtitle} />
        </Typography>
      )}
      {dividerless && <Divider sx={{ width: 100, pt: 2 }} />}
    </Flex>
  );
};
