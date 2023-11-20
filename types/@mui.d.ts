import { PaletteColor } from '@mui/material';
import { fontSizes } from '@stoplight/mosaic/components/Textarea/variants';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    primary: React.CSSProperties;
    secondary: React.CSSProperties;
    coiny: React.CSSProperties;
    dangrek: React.CSSProperties;
    concertOne: React.CSSProperties;
    mPlus1p: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    primary?: React.CSSProperties;
    secondary?: React.CSSProperties;
    coiny?: React.CSSProperties;
    dangrek?: React.CSSProperties;
    concertOne?: React.CSSProperties;
    mPlus1p?: React.CSSProperties;
  }

  interface Palette {
    highlight: PaletteColor;
    love: PaletteColor;
    default: PaletteColor;
    black: PaletteColor;
    white: PaletteColor;
    border: PaletteColor;
  }

  interface PaletteOptions {
    highlight?: PaletteColor;
    love?: PaletteColor;
    default?: PaletteColor;
    black: PaletteColor;
    white?: PaletteColor;
    border?: PaletteColor;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    highlight: true;
    love: true;
    default: true;
    black: true;
    white: true;
  }
}

declare module '@mui/material/IconButton' {
  interface IconButtonPropsColorOverrides {
    highlight: true;
    love: true;
    default: true;
    black: true;
    white: true;
  }
}

declare module '@mui/material/Chip' {
  interface ChipPropsColorOverrides {
    highlight: true;
    love: true;
    default: true;
    black: true;
    white: true;
  }
}

// TODO: not working as expected yet
// https://github.com/mui/material-ui/issues/33054
declare module '@mui/material/SvgIcon' {
  interface SvgIconPropsColorOverrides {
    highlight: true;
    love: true;
    default: true;
    black: true;
    white: true;
  }
}

declare module '@mui/material/AppBar' {
  interface AppBarPropsColorOverrides {
    white: true;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    primary: true;
  }
}
