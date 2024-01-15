import { Box } from '@mui/material';
import { ListItem, UnorderedList } from '@worksheets/ui-core';

import { TitleText } from './title-text';

export const BulletPoints: React.FC<{
  icon: React.ReactNode;
  title: string;
  points: React.ReactNode[];
}> = ({ title, icon, points }) => (
  <Box>
    <TitleText icon={icon} title={title} />
    <UnorderedList>
      {points.map((point, index) => (
        <ListItem key={index} disablePadding variant="body2">
          {point}
        </ListItem>
      ))}
    </UnorderedList>
  </Box>
);
