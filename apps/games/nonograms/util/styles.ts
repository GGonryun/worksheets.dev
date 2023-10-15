import { Theme, lighten } from '@mui/material';
import {
  dokaBoxShadow,
  megaBoxShadow,
  tabletBoxShadow,
} from '@worksheets/ui-games';

export const boxShadow = `${tabletBoxShadow}, ${dokaBoxShadow}, ${megaBoxShadow}`;

export const highlightColor = (theme: Theme) =>
  lighten(theme.palette.success.light, 0.5);

export const completionColor = (theme: Theme) =>
  lighten(theme.palette.primary.main, 0.5);
