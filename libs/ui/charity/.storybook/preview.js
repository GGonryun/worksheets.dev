import './styles.scss';
import { ThemeProvider } from '@mui/material';
import { theme } from '../src/lib/theme';

const preview = {
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <main>
          <Story />
        </main>
      </ThemeProvider>
    ),
  ],
};
export default preview;
