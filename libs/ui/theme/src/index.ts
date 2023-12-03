import { createTheme } from '@mui/material';
import { grey, pink, yellow } from '@mui/material/colors';

export type PaletteColor =
  | 'success'
  | 'error'
  | 'warning'
  | 'primary'
  | 'secondary'
  | 'highlight'
  | 'love'
  | 'default';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      mobile1: 375,
      mobile2: 480,
      sm: 600,
      desktop1: 768,
      md: 900,
      desktop2: 1024,
      lg: 1200,
      desktop3: 1440,
      xl: 1536,
    },
  },
  typography: {
    h1: {
      fontFamily: 'Dangrek,serif',
    },
    h2: {
      fontFamily: 'Dangrek,serif',
    },
    h3: {
      fontFamily: 'Dangrek,serif',
    },
    h4: {
      fontFamily: 'Dangrek,serif',
    },
    h5: {
      fontFamily: 'Dangrek,serif',
    },
    h6: {
      fontFamily: 'Dangrek,serif',
    },
    body1: {
      fontFamily: "'M PLUS Rounded 1c', sans-serif",
    },
    body2: {
      fontFamily: "'M PLUS Rounded 1c', sans-serif",
    },
    body3: {
      fontFamily: "'M PLUS Rounded 1c', sans-serif",
      fontSize: '0.775rem',
    },
    dangrek: {
      fontFamily: 'Dangrek,serif',
    },
    mPlus1p: {
      fontFamily: "'M PLUS Rounded 1c', sans-serif",
    },
    // TODO - remove primary and secondary variants
    corben: {
      fontFamily: 'Corben,serif',
    },
  },
  palette: {
    border: {
      light: grey[300],
      main: grey[400],
      dark: grey[500],
      contrastText: '#000',
    },
    white: {
      light: '#fff',
      main: '#fff',
      dark: '#fff',
      contrastText: '#000',
    },
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

export default theme;
