import { PaletteColor } from '@mui/material';
import { fontSizes } from '@stoplight/mosaic/components/Textarea/variants';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    title: React.CSSProperties;
    body3: React.CSSProperties;

    coiny: React.CSSProperties;
    dangrek: React.CSSProperties;
    concertOne: React.CSSProperties;
    mPlus1p: React.CSSProperties;
    // TODO - remove primary and secondary variants
    primary: React.CSSProperties;
    secondary: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    title?: React.CSSProperties;
    body3?: React.CSSProperties;
    coiny?: React.CSSProperties;
    dangrek?: React.CSSProperties;
    concertOne?: React.CSSProperties;
    mPlus1p?: React.CSSProperties;
    // TODO - remove primary and secondary variants
    primary?: React.CSSProperties;
    secondary?: React.CSSProperties;
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

  interface BreakpointOverrides {
    mobile1: true;
    mobile2: true;
    desktop1: true;
    desktop2: true;
    desktop3: true;
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
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
    title: true;
    body3: true;
  }
}
