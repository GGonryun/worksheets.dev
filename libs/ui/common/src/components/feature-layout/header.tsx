import { Box, Typography } from '@mui/material';
import { MicroMarkdown, MicroMarkdownText } from '@worksheets/ui-core';
import Image from 'next/image';
import { FC } from 'react';

export type FeatureHeaderProps = {
  title: string;
  subtitle: MicroMarkdownText;
  src: string;
};

export const FeatureHeader: FC<FeatureHeaderProps> = ({
  title,
  subtitle,
  src,
}) => (
  <Box pt={1}>
    <Box display="flex" gap={1} alignItems="center">
      <Image alt={title} height={40} width={40} src={src} />
      <Typography variant="h4" fontWeight={900}>
        {title}
      </Typography>
    </Box>
    <Box pt={2}>
      <Typography variant="body2" color="text.secondary">
        <MicroMarkdown text={subtitle} />
      </Typography>
    </Box>
  </Box>
);