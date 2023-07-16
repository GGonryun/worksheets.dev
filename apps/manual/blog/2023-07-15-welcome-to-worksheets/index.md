---
slug: welcome-to-worksheets
title: What is Worksheets.dev?
authors: [mcampos]
tags: [platform, sdk, low-code, ipaas, integrations]
---

## Who are we?

We are Worksheets! Our goal is to simplify the way developers integrate applications into their codebases. We are building a platform that allows developers to easily integrate with any application using a low-code approach.

## Why did we build it?

We built Worksheets because we found that as the number of integrations increased so did the technical complexity of maintaining them and existing no-code solutions are too rigid and time consuming to set up for complex workflows.

### Technical complexity

If a vulnerability appeared in one of the libraries we used, we would have to update all of our integrations. If an API changed, we would have to update all of our integrations. If we started a new project we would have to copy and paste code or spend time managing a new package.

We learned after integrating hundreds of applications that the process of integrating with an application was very similar across most of the applications we used. We would have to authenticate with the application, make a request to the API, and then parse the response. We would then have to repeat this process for every API we wanted to use. This was a lot of work and it was very repetitive. It was simply not scalable.

### Rigid no-code solutions (YAGNI!)

So what do you do if you want to connect multiple applications as a developer? You'll probably turn to an integration platform (IPaaS). Most will reach for a no-code solution like Zapier or IFTTT but these are very rigid and time consuming to set up for complex workflows. Alternatively you could also use a low-code solution like Workato or Tray.io but these are very expensive and require a lot of technical knowledge to set up.

We wanted to build a solution that was easy to use, flexible, and affordable for the every day developer.

## Why should you use it?

Worksheets has the easiest and least-opinionated integration SDK available. You don't need to keep sifting through documentation to understand what an API does or how to use it. Our SDK leverages static type safety and code completion for all of our integrations. Start prototyping faster than ever. Take a look at the example below:

```typescript
// Get a list of all your Google Drive files
apps
  .googleDrive({ accessToken: 'YOUR_TOKEN_HERE' })
  .listFiles({ limit: 10, folder: '/examples' })
  .then((files) => {
    console.log(files);
  });
```

## What's next?

Two of the biggest challenges we face when working with integrations are authorization and unit testing.

Our roadmap includes adding support for OAuth2 and credential management. This would enable you to execute applications without having to worry about managing credentials or storing them in your codebase.

With an emulation framework, you'll be able to unit test your code without having to worry about mocking out API calls or setting up a test server. This will allow you to write tests that are more robust and easier to maintain.

## How can you get involved?

If you're interested in giving our low-code integration platform Worksheets.dev a try, sign up for our beta at https://worksheets.dev. No credit card required and all beta user's get unlimited executions for free.

We're looking for developers who want to help us build the future of integration platforms. If you have any questions or feedback, [please contact us](/contact-us)! We'd love to hear from you.

Thanks for reading!
