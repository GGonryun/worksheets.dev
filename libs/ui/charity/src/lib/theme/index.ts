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

export const theme = createTheme({
  typography: {
    primary: {
      fontFamily: 'Corben,serif',
    },
    secondary: {
      fontFamily: 'Montserrat,sans-serif',
    },
    coiny: {
      fontFamily: 'Coiny,serif',
    },
    dangrek: {
      fontFamily: 'Dangrek,serif',
    },
    concertOne: {
      fontFamily: 'Concert One,serif',
    },
    mPlus1p: {
      fontFamily: "'M PLUS Rounded 1c', sans-serif",
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