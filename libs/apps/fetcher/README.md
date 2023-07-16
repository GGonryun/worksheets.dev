# Overview

This package contains a fetch client that can be used to execute applications on the worksheets.dev platform. You can use this package to execute applications on your behalf, but you will be responsible for implementing the interceptor which takes the request and executes it.

# Usage

## Requirements

This package also needs the application registry: `npm install @worksheets/apps-registry`

## Installation

```bash
npm install @worksheets/apps-fetcher
```

## Implementation

For a sample implementation of the fetcher client, see the SDK which is uses a `fetch` interceptor to send execution requests to the worksheets.dev platform.
