import React from 'react';
import { render } from '@testing-library/react';

import { Box } from '@mui/material';

describe('Box', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Box>Loading</Box>);
    expect(baseElement).toBeTruthy();
  });
});
