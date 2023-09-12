import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';
import { FC } from 'react';
import { Flex } from '@worksheets/ui-core';
import { TinyLogo, TinyPill } from '@worksheets/ui-basic-style';
import { ListApplicationsResponse } from '@worksheets/schemas-applications';
import { filterLabel, filterOptionColors } from '../lib/application-filters';

export type ApplicationDetails = ListApplicationsResponse[number];

export const ApplicationCard: React.FC<{
  application: ApplicationDetails;
}> = ({ application }) => {
  return (
    <Card variant="outlined">
      <CardActionArea href={`/applications/${application.id}`} sx={{ pb: 2 }}>
        <CardHeader
          avatar={
            <Box>
              <Typography variant="body2" fontWeight={900}>
                {application.name}
              </Typography>
              <Typography
                variant="caption"
                color="primary"
                sx={{ textDecoration: 'underline' }}
              >
                Worksheets.dev
              </Typography>
            </Box>
          }
          action={
            <Box pr={1} pt={1}>
              <TinyLogo
                borderless
                area={24}
                label={application.name}
                src={application.logo}
              />
            </Box>
          }
        />
        <CardContent sx={{ px: 2, py: 0, height: 80, overflow: 'scroll' }}>
          <Typography variant="body2">{application.description}</Typography>
        </CardContent>
        <Box px={2} pt={1} height={32} overflow={'scroll'}>
          <ApplicationTags {...application} />
        </Box>
      </CardActionArea>
    </Card>
  );
};

export const ApplicationTags: FC<{
  tags: ApplicationDetails['tags'];
}> = ({ tags }) => {
  return (
    <Flex wrap={false} gap={1}>
      {tags.map((t, i) => (
        <TinyPill
          key={i}
          label={filterLabel[t]}
          color={filterOptionColors[t]}
        />
      ))}
    </Flex>
  );
};
