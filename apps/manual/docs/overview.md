---
sidebar_position: 2
---

# Overview

Worksheets is a low code integration platform that allows you to connect to any API, database, or service. We provide two primary abstractions for integrating with other services: **Applications** and **Worksheets**. **Applications** contain the logic for interacting with a specific external system, and **Worksheets** contain the logic for orchestrating the execution of one or more Applications. Let's take a look at applications first.

## Applications

### Calling a method

Every application includes several service **methods**. Each method encapsulates a **unit of work** which can be anything from simple json manipulation, calling an external API, or requesting human interaction. Applications are designed to be reusable and can be shared across multiple worksheets. We provide a set of [pre-built applications](https://app.worksheets.dev/applications) that you can use out of the box, but you can also create your own custom applications using our [Application-SDK](/docs/advanced/application-sdk).

#### Worksheet

There are a few different ways to execute application methods. The most common way is to **call a method** from within a worksheet. You can do this by using the `call` keyword followed by the application name and method name. For example, if you wanted to call the `get` method from the `http` application, you would write the following:

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

You can also invoke methods from the [API](/docs/api/overview) or [SDK](/docs/advanced/application-sdk). We provide a consistent interface for developers to easily integrate services into their own applications. Take a look at our public [public OpenAPI spec](https://app.worksheets.dev/api/openapi.json) and auto-generate client libraries with your preferred language. Tools like [Insomnia](https://docs.insomnia.rest/insomnia/import-export-data#import-data) make it easy to test API calls and generate code snippets.

```bash
# API
curl -X POST https://app.worksheets.dev/application/http/method/request/execute
    -H "Content-Type: application/json"
    -d '{"method": "GET","url": " https://api.sampleapis.com/beers/ale"}'
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

Some applications may require secure credentials. Worksheets makes it easy to manage your credentials through our [Application Connection platform](/docs/tutorials/connections). You can create a connection for each application and then reference it in your worksheets. This allows you to easily manage your credentials in one place and reuse them across multiple worksheets.

```yaml
input: args

steps:
  - call: gmail.send_email
    input:
      to: { args.to }
      subject: { args.subject }
      body: { args.body }
  - return: 'ok'
```

Worksheets manages all your connections for you in the background, so you don't have to worry about it. You can also create [custom connections](/docs/tutorials/connections) for your own applications.

Connections are made on our servers and are never exposed to the client. This means that you can safely share your worksheets with other users without worrying about exposing your credentials.

Create connections from the [Connections page](https://app.worksheets.dev/connections) or programatically (under construction).

> TODO: INSERT_ARCADE_DEMO_OF_INTEGRATION_WITH_GMAIL

## Worksheets

### Overview

Worksheets can be used to execute a single application method or to orchestrate a complex tasks. Worksheets use YAML and a simplified instruction syntax to help you control the flow of execution. We support retrying, error handling, branching, looping, and more. Take a look at our [syntax guide](/docs/syntax-guide) for more details. We provide a set of [pre-built worksheets](https://app.worksheets.dev/templates) we call templates. These templates help you get started quickly and can be customized to fit your needs. Most templates will require connections to external services. If you have suggestions for new templates, please [contact us](/docs/faq#how-do-i-get-in-touch).

```yaml
# TODO: show am example of a worksheet that uses looping and a conditional switch statement.
```

```yaml
# TODO: show an example of a worksheet that uses retrying to handle errors.
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

#### API

#### Webhooks

#### Schedule

If you are interested in beta-testing our execution scheduling triggers [contact us](/docs/faq#how-do-i-get-in-touch).

#### Event Stream

If you are interested in beta-testing our event streaming triggers [contact us](/docs/faq#how-do-i-get-in-touch).

#### Web Forms

If you are interested in beta-testing our web form triggers [contact us](/docs/faq#how-do-i-get-in-touch).

### Versioning

** In Progress **: Worksheets are versioned and you can view the history of each worksheet and rollback to a previous version if needed.

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
