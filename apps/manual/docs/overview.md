---
sidebar_position: 2
---

# Overview

Worksheets is on a mission to simplify how developers integrate withe external services.

## What is Worksheets?

Worksheets is a low code integration platform that allows you to connect to any API, database, or service. We provide two primary abstractions for integrating with other services: **Applications** and **Worksheets**. **Applications** contain the logic for interacting with a specific external system, and **Worksheets** contain the logic for orchestrating the execution of one or more Applications. Let's take a look at some examples.

## Applications

Every application can have multiple service **methods**. Each method encapsulates a **unit of work** which can be anything from simple json manipulation, to calling an external API, or even requesting human interaction. Applications are designed to be reusable and can be shared across multiple worksheets. We provide a set of [pre-built applications](https://app.worksheets.dev/applications) that you can use out of the box, but you can also create your own custom applications using our [Application-SDK](/docs/advanced/application-sdk).

### Calling a method

Our framework aims to be consistent across our [Web Editor](/docs/tutorials/quick-start), [APIs](/docs/api/overview), and [SDKs](/docs/advanced/application-sdk). Calling an application follows the same pattern across all of our interfaces:

```yaml
call: <application_method>
  input: <request_parameters>
  output: <response_parameters>
  connection: <override_connection>
```

#### Worksheets

There are a few different ways to execute application methods but the most common way is to **call a method** from within a worksheet. You can do this by using the `call` keyword followed by the application name and method name. For example, if you wanted to call the `get` method from the `http` application, you would write the following:

```yaml
steps:
  - call: http.request
    input:
      method: GET
      url: https://app.worksheets.dev/api/applications?limit=10
    output: response
  - return:
      data: ${response.data}
```

#### API

You can also invoke methods from the [API](/docs/api/overview) or [SDK](/docs/advanced/application-sdk). Take a look at our [public OpenAPI spec](https://app.worksheets.dev/api/openapi.json). OpenAPI can be used to auto-generate client libraries for your preferred language.

Tools like [Insomnia](https://docs.insomnia.rest/insomnia/import-export-data#import-data) make it easy to test API calls and generate code snippets.

```bash
# API
curl -X POST https://app.worksheets.dev/api/call/http.request
    -H "Content-Type: application/json"
    -d '{ "input": {"method": "GET", "url": "https://api.sampleapis.com/beers/ale"} }'
```

#### SDK

> This feature is currently under construction

You can also use our [Javascript SDK](/docs/advanced/application-sdk) to call methods from within your own code.

```javascript
// Javascript SDK (not available yet)
const response = await worksheets.call('http.request', {
  method: 'GET',
  url: 'https://api.sampleapis.com/beers/ale',
});
// Javascript SDK (not available yet)
```

If you would like to beta-test our SDK please [contact us](/docs/faq#how-do-i-get-in-touch).

### Connecting to an external service

Some applications require secure credentials. Worksheets makes it easy to manage your credentials through our [Application Connection platform](/docs/tutorials/connections). You can create a connection for any application and then reference it in your worksheets or use the connection id to call a method using our API. We provide a web editor where you can manage your credentials in one place and reuse them across multiple worksheets. Worksheets manages your connections for you. Connections are made on our servers and are never exposed to the client. This means that you can safely share your worksheets with other users without worrying about exposing your credentials.

Create connections from the [Connections page](https://app.worksheets.dev/connections) or programatically (under construction). If you have suggestions for new connections, please [contact us](/docs/faq#how-do-i-get-in-touch).

> TODO: INSERT_SCREENSHOT_OF_CONNECTIONS_IN_WORKSHEET_SETTINGS

#### Using connections in worksheets

You don't need to be explicit about connections when using worksheets. Simply reference the application in your worksheet and select the connections in the worksheet's settings. For example, if you wanted to send an email using the `gmail` application, you would write the following:

```yaml
input: args
steps:
  # we will check your worksheet for a connection. If you don't have one, the task will fail to run.
  - call: gmail.send_email
    input:
      to: { args.to }
      subject: { args.subject }
      body: { args.body }
  - return: 'ok'
```

When using worksheets you can be explicit about which connection you want to use by specifying the connection id in the worksheet. This is useful if you need to execute a workflow that uses multiple identities, such as an admin email and user email. Below is an equivalent worksheet for the API call above that uses a connection override when `call`ing a method.

```yaml
input: args

steps:
  - call: gmail.send_email
    # explicit connection
    connection: e01d3c9e-bd6a-4244-85b0-0579d99d5fe3
    input:
      to: { args.to }
      subject: { args.subject }
      body: { args.body }
  - return: 'ok'
```

> TODO: INSERT_ARCADE_DEMO_OF_INTEGRATION_WITH_GMAIL

#### Using connections in the API

The API always needs to be explicit about which connections it's going to use. You can find your worksheet's connection id from the connection builder side car. Select a connection from the [Connections page](https://app.worksheets.dev/connections) to open the side car.

> TODO: INSERT_SCREENSHOT_OF_CONNECTION_BUILDER_SIDE_CAR

Here is an equivalent request using the API:

```bash
curl -X POST https://app.worksheets.dev/api/call/http.request
    -H "Content-Type: application/json"
    -d '{ "input": { "method": "GET", "url": "https://api.sampleapis.com/beers/ale"}, "connection": "e01d3c9e-bd6a-4244-85b0-0579d99d5fe3"} }'
```

#### Using connections in the SDK

> This feature is currently under construction

You can also use our [Javascript SDK](/docs/advanced/application-sdk) to call methods from within your own code without worrying about connections. Simply pass the connection id as an option to the `call` method.

```javascript
// Javascript SDK (not available yet)
const result = await worksheets.call({
  path: 'gmail.send_email',
  connection: 'e01d3c9e-bd6a-4244-85b0-0579d99d5fe3'
  input: {
    to: 'user@example.com'
    subject: 'Hello World',
    body: 'This is a test email',
  },
});

```

## Worksheets

### Overview

Worksheets can be used to execute a single application method or to orchestrate a complex tasks. Worksheets use YAML and a simplified instruction syntax to help you control the flow of execution. We support retrying, error handling, branching, looping, and more. Take a look at our [syntax guide](/docs/syntax-guide) for more details. We provide a set of [pre-built worksheets](https://app.worksheets.dev/templates) we call templates. These templates help you get started quickly and can be customized to fit your needs. Most templates will require connections to external services. If you have suggestions for new templates, please [contact us](/docs/faq#how-do-i-get-in-touch).

```yaml
steps:
  - assign:
      - list: ['apple', 'banana', 'cherry']
  - for: list
    index: index
    value: value
    steps:
      # we will skip the first item in the list
      - switch:
          - if: ${index == 0}
            next: continue
      - log: ${index}
      - log: ${value}
```

Worksheets can be used to call other worksheets. This allows you to create reusable components that can be shared across multiple worksheets. Take a look at our [syntax guide](/docs/syntax-guide) for more details.

```yaml
main:
  assign:
    - num: 5
  steps:
    - worksheet: multiply_by_three
      input: ${num}
      output: result
    - return: ${result}

multiply_by_three:
  input: val
  steps:
    - return: ${val * 3}
```

### Creating

We offer a simple [web editor](/docs/tutorials/quick-start) for writing worksheets.

> INSERT A SCREENSHOT OF THE UI HERE

If you're familiar with YAML then you can start writing worksheets right away, take a look at our [syntax guide](/docs/syntax-guide) to help you get started. If you're new to YAML, we provide a [5-minute guided introduction](/docs/tutorials/create-a-worksheet) to our platform that will help you get started.

Write worksheets in your favorite editor and upload them programatically using our [API](/docs/api/overview) or [SDK](/docs/advanced/application-sdk). You can also use our [CLI](/docs/advanced/cli) to upload worksheets from the command line.

```bash
# CLI (under construction)
worksheets upload ./my-worksheet.yaml
```

If you are interested in beta-testing our CLI please [contact us](/docs/faq#how-do-i-get-in-touch).

### Managing

Use our web editor help you easily manage all of your worksheets in one place. You can view, edit, and delete worksheets from the [Worksheets page](https://app.worksheets.dev/worksheets). You can also view the execution history of each worksheet along with logs and metrics.

> INSERT A SCREENSHOT OF THE UI HERE FOR EACH TAB THAT SHOWS THE WORKSHEET, HISTORY, LOGS AND METRICS

### Executing

We offer a wide variety of entrypoints for your worksheets. Worksheets can be executed manually on our web editor or programatically using our API (in beta), webhooks (in beta), SDK's (in progress), scheduling (in progress), event streams (in progress), and web forms (in progress)

#### Web UI

Our web UI allows you to execute worksheets manually. You can also view the [execution history of each worksheet](https://app.worksheets.dev/worksheets) along with logs and metrics.

> INSERT A SCREENSHOT OF THE UI HERE

#### API

#### Webhooks

#### Schedule

If you are interested in beta-testing our execution scheduling triggers [contact us](/docs/faq#how-do-i-get-in-touch).

#### Event Stream

If you are interested in beta-testing our event streaming triggers [contact us](/docs/faq#how-do-i-get-in-touch).

#### Web Forms

#### CLI

If you are interested in beta-testing our CLI please [contact us](/docs/faq#how-do-i-get-in-touch).

If you are interested in beta-testing our web form triggers [contact us](/docs/faq#how-do-i-get-in-touch).

### Versioning

** In Progress **: Worksheets do not currently support versioning and rolling back.

### Creating a connection

#### OAuth Tokens

#### Flags

#### Sensitive Fields

## Quotas & Limits

### Quotas

#### Method Calls

#### Processing Time

### Limits

#### Rate Limits
