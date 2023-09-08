import { Typography, Box } from '@mui/material';
import { FC, ReactNode } from 'react';
import { Flex } from '@worksheets/ui-core';
import { TinyLink } from '@worksheets/ui-basic-style';
import Grid from '@mui/material/Unstable_Grid2';
import { PaddingStyles } from '@worksheets/ui/common';

export type ResourceGridItem = {
  icon: ReactNode;
  title: string;
  subtitle: string;
  href: string;
};
export const ResourceGridSection: FC<
  PaddingStyles & {
    resources: ResourceGridItem[];
  }
> = ({ resources, ...styles }) => {
  return (
    <Grid container sx={{ width: '100%', ...styles }} spacing={2}>
      {resources.map((r) => (
        <Grid xs={12} sm={6} md={4} key={r.title}>
          <ResourceCard {...r} />
        </Grid>
      ))}
    </Grid>
  );
};

const ResourceCard: FC<{
  icon: ReactNode;
  title: string;
  subtitle: string;
  href: string;
}> = ({ icon, title, subtitle, href }) => (
  <Flex column alignItems="flex-start">
    {icon}
    <Flex column pt={1} gap={0.5} minHeight={160}>
      <Typography variant="h6">
        <b>{title}</b>
      </Typography>

      <Typography variant="caption" color="text.secondary">
        {subtitle}
      </Typography>
    </Flex>
    <Box>
      <TinyLink size="small" href={href}>
        Learn more
      </TinyLink>
    </Box>
  </Flex>
);
