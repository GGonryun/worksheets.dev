import { ChainSerializers } from './chain';

describe('chain', () => {
  const first = {
    serialize: jest.fn().mockReturnValue('first'),
    deserialize: jest.fn().mockReturnValue('tsrif'),
  };
  const second = {
    serialize: jest.fn().mockReturnValue('second'),
    deserialize: jest.fn().mockReturnValue('dnoces'),
  };

  const chain = new ChainSerializers(first, second);

  it('serialize', () => {
    const result = chain.serialize('data');
    expect(first.serialize).toBeCalledWith('data');
    expect(second.serialize).toBeCalledWith('first');
    expect(result).toEqual('second');
  });

  it('deserialize', () => {
    const response = chain.deserialize('atad');
    expect(second.deserialize).toBeCalledWith('atad');
    expect(first.deserialize).toBeCalledWith('dnoces');
    expect(response).toBe('tsrif');
  });
});
