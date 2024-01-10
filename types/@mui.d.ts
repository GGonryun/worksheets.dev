import { PaletteColor } from '@mui/material';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    body3: React.CSSProperties;
    corben: React.CSSProperties;
    dangrek: React.CSSProperties;
    mPlus1p: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    body3?: React.CSSProperties;
    corben?: React.CSSProperties;
    dangrek?: React.CSSProperties;
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
  interface ButtonPropsVariantOverrides {
    round: true;
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
