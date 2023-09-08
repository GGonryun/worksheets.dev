import { Key, Domain } from '@mui/icons-material';
import { CardHeader, Typography, CardActions, useTheme } from '@mui/material';
import { ProjectBasics } from '@worksheets/schemas-projects';
import { TinyLogo } from '@worksheets/ui-basic-style';
import { FC } from 'react';
import { cardHeight } from './custom-card';
import { ProjectCardLayout } from './layout';
import { Flex } from '@worksheets/ui-core';
import {
  projectFeatureIcons,
  projectFeatureLabels,
} from '../../util/constants';
import { useRouter } from 'next/router';
import { urls } from '@worksheets/ui/common';

export const ProjectCard: FC<ProjectBasics> = ({
  title,
  id,
  domain,
  features,
}) => {
  const theme = useTheme();
  const { push } = useRouter();
  // split features into overflow and non-overflow, if more than 4 features
  const [startFeatures, overflowFeatures] =
    features.length > 4
      ? [features.slice(0, 4), features.slice(4)]
      : [features, []];

  return (
    <ProjectCardLayout onClick={() => push(urls.app.project(id).overview)}>
      <Flex column height={cardHeight} spaceBetween>
        <CardHeader
          avatar={
            <Flex column>
              <Typography variant="h6">{title}</Typography>
              <Flex gap={'4px'} pt={0.5}>
                <Key
                  fontSize="small"
                  sx={{ mt: '-2px', color: 'text.secondary' }}
                />

                <Typography
                  variant="caption"
                  color="text.secondary"
                  alignItems="baseline"
                >
                  {id}
                </Typography>
              </Flex>
              {domain && (
                <Flex gap={'4px'} pt={0.5}>
                  <Domain
                    fontSize="small"
                    sx={{ mt: '-7px', color: 'text.secondary' }}
                  />

                  <Typography
                    variant="caption"
                    color="text.secondary"
                    alignItems="baseline"
                  >
                    {domain}
                  </Typography>
                </Flex>
              )}
            </Flex>
          }
        />

        <CardActions sx={{ justifyContent: 'flex-end' }}>
          {overflowFeatures.length > 0 && (
            <TinyLogo
              sx={{
                backgroundColor: theme.palette.background.paper,
                p: 1,
              }}
              src={'/icons/features/more2.svg'}
              label={`${
                overflowFeatures.length
              } more features enabled: ${overflowFeatures
                .map((f) => projectFeatureLabels[f])
                .join(', ')}`}
              area={22}
            />
          )}
          {startFeatures.map((feature) => (
            <TinyLogo
              sx={{ backgroundColor: theme.palette.background.paper, p: 0.5 }}
              key={feature}
              src={projectFeatureIcons[feature]}
              label={`${projectFeatureLabels[feature]} enabled`}
              area={28}
            />
          ))}
        </CardActions>
      </Flex>
    </ProjectCardLayout>
  );
};
