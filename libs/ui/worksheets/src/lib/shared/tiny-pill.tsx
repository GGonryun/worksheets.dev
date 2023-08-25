import { Chip, ChipProps, alpha, useTheme } from '@mui/material';
import { selectPaletteColor } from './palettes';

export const TinyPill: React.FC<
  Pick<ChipProps, 'label' | 'color' | 'icon'>
> = ({ ...chipProps }) => {
  const theme = useTheme();

  const opacity = 0.1;
  const palette = selectPaletteColor(theme, chipProps.color);

  return (
    <Chip
      {...chipProps}
      size="small"
      sx={{
        borderRadius: `${theme.shape.borderRadius}px !important`,
        border: `1px solid ${palette.main}`,
        backgroundColor: alpha(palette.main, opacity),
        color: palette.main,
        fontWeight: 900,
      }}
    />
  );
};
