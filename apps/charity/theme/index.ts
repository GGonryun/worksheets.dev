import { createTheme, responsiveFontSizes } from '@mui/material';
import { grey, pink, yellow } from '@mui/material/colors';

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
