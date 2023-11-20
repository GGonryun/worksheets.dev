import './styles.scss';
import { ThemeProvider } from '@mui/material';
import { theme } from '../src/lib/theme';

const preview = {
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
};
export default preview;
