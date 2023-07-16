# Overview

This is the worksheets.dev registry of sample data for our applications. This package gives you dummy data for all of the inputs, outputs and context of all of the applications in the registry.

# Usage

## Installation

```bash
npm install @worksheets-dev/sample-data
```

## Accessing Sample Data

```js
import { sampleData } from '@worksheets-dev/sample-data';

console.log(sampleData.openai.createCompletion.context);
console.log(sampleData.openai.createCompletion.input);
console.log(sampleData.openai.createCompletion.output);
```

## Supported Applications

Visit [worksheets.dev](https://worksheets.dev/applications) to see the full list of supported applications.
