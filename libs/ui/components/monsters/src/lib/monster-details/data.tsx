import { alpha, styled, Typography, TypographyProps } from '@mui/material';
import { Row } from '@worksheets/ui/components/flex';
import { PaletteColor } from '@worksheets/ui/theme';

import { BORDER_KEY } from './styles';

export const Data: React.FC<{
  label: string;
  value: string | number;
  color?: PaletteColor;
}> = ({ label, value, color }) => (
  <Row justifyContent="space-between" component="div">
    <DataCell
      fontWeight={900}
      variant="body2"
      sx={{
        borderRight: BORDER_KEY,
        color: (theme) => theme.palette.text.blue.darker,
        backgroundColor: (theme) =>
          alpha(theme.palette.background['solid-blue'], 0.2),
      }}
    >
      {label}
    </DataCell>
    <DataCell
      variant="body3"
      textAlign="right"
      sx={{
        color: (theme) =>
          color ? theme.palette[color].main : theme.palette.text.blue.darker,
      }}
    >
      {value}
    </DataCell>
  </Row>
);

export const DataCell = styled((props: TypographyProps) => (
  <Typography fontWeight={500} {...props} />
))(({ theme }) => ({
  width: '100%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  padding: theme.spacing(0.5, 1),
}));
