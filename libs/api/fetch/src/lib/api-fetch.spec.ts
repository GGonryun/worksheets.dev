import { apiFetch } from './api-fetch';

describe('apiFetch', () => {
  it('should work', () => {
    expect(apiFetch()).toEqual('api-fetch');
  });
});
