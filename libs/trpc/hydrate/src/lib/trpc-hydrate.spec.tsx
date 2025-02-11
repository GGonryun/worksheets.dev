import { render } from '@testing-library/react';

import TrpcHydrate from './trpc-hydrate';

describe('TrpcHydrate', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TrpcHydrate />);
    expect(baseElement).toBeTruthy();
  });
});
