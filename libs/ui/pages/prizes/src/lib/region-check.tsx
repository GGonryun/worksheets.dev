import { Public } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { Row } from '@worksheets/ui/components/flex';

export const RegionCheck = () => {
  return (
    <Row gap={0.5}>
      <Public />
      <Typography typography="body3" fontWeight={900} textTransform="uppercase">
        Activates Globally
      </Typography>
    </Row>
  );
};
