import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { fetcher } from './fetcher';
import { enableFetchMocks } from 'jest-fetch-mock';

const { aborter, applier } = fetcher;

describe('my tests', () => {
  // Create a mock server
  const server = setupServer(
    rest.get('/api', (_, res, ctx) => {
      // Simulate a delay of 500 milliseconds
      return res(ctx.delay(500), ctx.json({ message: 'Mock response' }));
    })
  );
  beforeAll(() => {
    enableFetchMocks();
  });

  beforeAll(() => {
    // Start the mock server before running the tests
    server.listen();
  });

  afterEach(() => {
    // Reset the request handlers after each test
    server.resetHandlers();
  });

  afterAll(() => {
    // Clean up and close the server after running the tests
    server.close();
  });
  test('Should make a successful API request', async () => {
    const response = await fetch('/api');
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({ message: 'Mock response' });
  });
  describe('fetchWithTimeout', () => {
    test('Should make a successful request before the timeout', async () => {
      server.use(
        rest.get('/api', (_, res, ctx) => {
          return res(ctx.json({ message: 'Mock response' }));
        })
      );

      const response = await applier(fetch, aborter(1000))('/api');

      expect(response.ok).toBe(true);
      const data = await response.json();
      expect(data.message).toBe('Mock response');
    });

    test('TODO: Should timeout if the request takes longer than the specified timeout', async () => {
      server.use(
        rest.get('/api', (_, res, ctx) => {
          // Simulate a delay of 2 seconds, longer than the timeout
          return res(ctx.delay(2000), ctx.json({ message: 'Mock response' }));
        })
      );

      // TODO: the jest mock fetcher won't timeout.
      await applier(fetch, aborter(1000))('/api');
    });
  });
});
