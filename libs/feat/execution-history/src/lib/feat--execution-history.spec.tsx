import { render } from '@testing-library/react';

import FeatExecutionHistory from './feat--execution-history';

describe('FeatExecutionHistory', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FeatExecutionHistory />);
    expect(baseElement).toBeTruthy();
  });
});
