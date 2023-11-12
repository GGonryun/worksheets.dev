import { PaletteColor, createTheme, responsiveFontSizes } from '@mui/material';
import { grey, pink, yellow } from '@mui/material/colors';
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

const theme = createTheme({
  typography: {
    primary: {
      fontFamily: 'Corben,serif',
    },
    secondary: {
      fontFamily: 'Montserrat,sans-serif',
    },
  },
  palette: {
    highlight: {
      light: yellow[500],
      main: yellow[700],
      dark: yellow[900],
      contrastText: '#fff',
    },
    love: {
      light: pink[200],
      main: pink[400],
      dark: pink[600],
      contrastText: '#fff',
    },
    default: {
      light: grey[500],
      main: grey[600],
      dark: grey[700],
      contrastText: '#000',
    },
    black: {
      light: '#000',
      main: '#000',
      dark: '#000',
      contrastText: '#fff',
    },
  },
});

export default responsiveFontSizes(theme, {});
