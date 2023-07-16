# Overview

This package contains a mask over sensitive fields that our platform will _never_ capture or store. We will never store sensitive fields in our database. Sensitive fields are only used to execute the application on your behalf.

# Usage

## Installation

```bash
npm install @worksheets-dev/sensitive-fields
```

## Accessing Sample Data

```js
import { mask } from '@worksheets-dev/sensitive-fields';

console.log(mask.openai.createCompletion.context);
console.log(mask.openai.createCompletion.input);
console.log(mask.openai.createCompletion.output);
```

## Supported Applications

Visit [worksheets.dev](https://worksheets.dev/applications) to see the full list of supported applications.
