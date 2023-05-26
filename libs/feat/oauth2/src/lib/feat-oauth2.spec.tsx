import { render } from '@testing-library/react';

import FeatOauth2 from './feat-oauth2';

describe('FeatOauth2', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FeatOauth2 />);
    expect(baseElement).toBeTruthy();
  });
});
