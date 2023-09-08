import { Typography } from '@mui/material';
import { Flex, MicroMarkdown, MicroMarkdownText } from '@worksheets/ui-core';
import { FC, ReactNode } from 'react';

export const CustomStep: FC<{
  title: MicroMarkdownText;
  subtitle: MicroMarkdownText;
  description: MicroMarkdownText;
  children: ReactNode;
  actions: ReactNode;
}> = ({ title, subtitle, children, description, actions }) => (
  <Flex column gap={3}>
    <Flex column>
      <span>
        <Typography variant="h5" component="span">
          <MicroMarkdown text={title} />
        </Typography>
        <Typography variant="h6" component="span">
          , <MicroMarkdown text={subtitle} />
        </Typography>
      </span>
      <Typography variant="body2" color="text.secondary">
        <MicroMarkdown text={description} />
      </Typography>
    </Flex>
    {children}
    <Flex spaceBetween mt={4} fullWidth>
      {actions}
    </Flex>
  </Flex>
);
