import { Typography } from '@mui/material';
import { Row } from '@worksheets/ui/components/flex';
import { PaletteColor } from '@worksheets/ui/theme';

export const ItemDataRow: React.FC<{
  label: string;
  value: string | number;
  color?: PaletteColor;
}> = (props) => (
  <Row gap={0.5} alignItems={'flex-start'}>
    <Typography
      typography={{ xs: 'body3', sm: 'body2' }}
      fontWeight={{ xs: 500, sm: 500 }}
    >
      {props.label}:
    </Typography>
    <Typography
      typography={{ xs: 'body3', sm: 'body2' }}
      color={props.color ?? 'text.secondary'}
    >
      {props.value}
    </Typography>
  </Row>
);
