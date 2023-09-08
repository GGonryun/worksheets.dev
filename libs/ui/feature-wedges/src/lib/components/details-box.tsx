import { Box, Typography } from '@mui/material';
import { TinyLink } from '@worksheets/ui-basic-style';
import { MicroMarkdownText, MicroMarkdown, Flex } from '@worksheets/ui-core';
import { FC, ReactNode } from 'react';
import { PaddingStyles } from './section-layout';

export const DetailsBox: FC<
  PaddingStyles & {
    title: string;
    subtitle: MicroMarkdownText;
    icon: ReactNode;
    href: string;
  }
> = ({ title, subtitle, icon, href, ...styles }) => {
  return (
    <Box sx={styles}>
      <Flex column gap={2}>
        <Flex gap={2}>
          {icon}
          <Typography variant="h6">
            <b>{title}</b>
          </Typography>
        </Flex>
        <Typography variant="caption" color="text.secondary">
          <MicroMarkdown text={subtitle} />
        </Typography>
        <Box>
          <TinyLink size="small" href={href}>
            Learn more
          </TinyLink>
        </Box>
      </Flex>
    </Box>
  );
};
