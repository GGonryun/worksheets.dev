import { Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { MicroMarkdownText, MicroMarkdown, Flex } from '@worksheets/ui-core';
import { FC } from 'react';
import { OverviewCardProps, OverviewCard } from './card';

export const OverviewSection: FC<{
  title: string;
  subtitle: MicroMarkdownText;
  features: OverviewCardProps[];
}> = ({ title, subtitle, features }) => {
  return (
    <Flex column>
      <Flex column>
        <Typography variant="h5" fontWeight={900}>
          {title}
        </Typography>
      </Flex>
      <Typography variant="body2" color="text.secondary">
        <MicroMarkdown text={subtitle} />
      </Typography>
      <Grid
        mt={1}
        spacing={3}
        container
        display="flex"
        justifyContent="space-evenly"
      >
        {features?.map((feature) => (
          <Grid
            xs={10}
            sm={10}
            md={6}
            display="flex"
            justifyContent="center"
            key={feature.title}
          >
            <OverviewCard {...feature} />
          </Grid>
        ))}
      </Grid>
    </Flex>
  );
};
