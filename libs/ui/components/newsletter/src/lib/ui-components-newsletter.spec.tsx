import { render } from '@testing-library/react';

import UiComponentsNewsletter from './ui-components-newsletter';

describe('UiComponentsNewsletter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiComponentsNewsletter />);
    expect(baseElement).toBeTruthy();
  });
});
