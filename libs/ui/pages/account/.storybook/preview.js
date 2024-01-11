import './styles.scss';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '@worksheets/ui/theme';

const preview = {
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Story />
      </ThemeProvider>
    ),
  ],
};
export default preview;
