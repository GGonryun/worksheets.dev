# Overview

See our growing list of applications at [worksheets.dev](https://worksheets.dev/applications).

This is the worksheets.dev registry of applications. You can download this package to get access to all of the metadata about inputs, outputs, contexts, titles, labels, logos and more about all of the applications in the registry.

This package also contains the application framework and all types required to build your own application interceptor.

## Installation

```bash
npm install @worksheets/apps-registry
```

## Usage

```js
import { registry } from '@worksheets/apps-registry';

console.log(registry.openai.name);
```

## Supported Applications

- Open AI
  - Create Completion
  - Create Image
  - List Models
- Time
  - Now
- System
  - Log
