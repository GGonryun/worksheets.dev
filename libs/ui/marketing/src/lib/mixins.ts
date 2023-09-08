import { CSSObject } from '@emotion/react';

export const growOnHoverMixin = (big?: boolean): CSSObject => ({
  '&:hover': {
    transform: big ? 'scale(1.15)' : 'scale(1.05)',
    textDecoration: 'underline',
  },
});
