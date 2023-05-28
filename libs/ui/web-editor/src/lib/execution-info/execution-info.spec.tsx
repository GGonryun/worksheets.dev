import { render } from '@testing-library/react';

import ExecutionInfo from './execution-info';

describe('ExecutionInfo', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ExecutionInfo />);
    expect(baseElement).toBeTruthy();
  });
});
