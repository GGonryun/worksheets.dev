# Introduction

> Stop integrating APIs and SDKs. Start integrating APPs.

![SDK Example](https://storage.googleapis.com/worksheets-test-app-logos/worksheets-basic-640.gif)

[Worksheets.dev](https://worksheets.dev) is a low-code integration platform built for developers to integrate applications into their code without having to learn the APIs or SDKs of those applications.

### Features

- Static typesafety for all applications and their inputs and outputs
- No more dependency hell, use one light-weight SDK for all applications.
- Instant analytics and insights for your application usage on [Worksheets.dev](https://worksheets.dev)

# SDK Quick Start

- For a full guide on getting started with Worksheets.dev, check out our [Getting Started Guide](https://worksheets.dev/docs/getting-started)

## Requirements

- This SDK requires a [Worksheets.dev](https://worksheets.dev) account and API Key.
  - No credit card required.
  - All new users get 100 free daily executions.
- Node.js v16 or higher.
- TypeScript v5.0 or higher.

## Usage

1. Install the SDK

```bash
npm install @worksheets-dev/sdk
```

2. Import the SDK

```typescript
import { newRegistry } from '@worksheets-dev/sdk';
```

3. Create a new Registry

```typescript
const registry = newRegistry({
  credentials: {
    apiKey: 'API_KEY_FROM_WORKSHEETS.DEV',
  },
});
```

4. Create an instance of the application you want to use

```typescript
// note: some applications require credentials or metadata
const openai = registry.openai({ apiKey: 'YOUR_API_KEY' });
// note: you must manage your own OAuth tokens
const gmail = registry.gmail({ accessToken: 'OAUTH_ACCESS_TOKEN' });
```

5. Execute the method

```typescript
// note: full typesafety for all inputs and outputs
const result = await openai.createCompletion({
  // data payload
});
```

6. Handle exceptions

```typescript
import { Failure } from '@worksheets/sdk';

// ...

const math = registry.math();
try {
  const result = await math.calc({ op: '/', x: 0, y: 0 });
  console.log(result);
} catch (error) {
  if (error instanceof Failure) {
    // "[400] BAD_REQUEST: Cannot divide by zero"
    console.log(error.message);
    // 400
    console.log(error.code);
    // BAD_REQUEST
    console.log(error.reason);

    console.log(error.data);
    console.log(error.cause);
    console.log(error.stack);
  }
}
```

7. Monitor your application usage and analytics on [Worksheets.dev](https://app.worksheets.dev)

## Examples

Find sample code and examples on our [doc site](https://docs.worksheets.dev/examples)

# Applications

View all applications available and their inputs and outputs in our [Application Gallery](https://docs.worksheets.dev/overview/applications)

# Support

Join our [discord community for support and feedback](https://discord.gg/ujEmEdjCaY)

Or reach out to us via our contact methods on our website [https://docs.worksheets.dev](https://docs.worksheets.dev/contact-us)
