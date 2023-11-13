import { PaletteColor } from '@mui/material';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    primary: React.CSSProperties;
    secondary: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    primary?: React.CSSProperties;
    secondary?: React.CSSProperties;
  }

  interface Palette {
    highlight: PaletteColor;
    love: PaletteColor;
    default: PaletteColor;
    black: PaletteColor;
  }

  interface PaletteOptions {
    highlight?: PaletteColor;
    love?: PaletteColor;
    default?: PaletteColor;
    black: PaletteColor;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    highlight: true;
    love: true;
    default: true;
    black: true;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    primary: true;
  }
}
