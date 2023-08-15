import { handlers } from '@worksheets/apps-handlers';
import {
  EndpointProviderBridgeByPath,
  EndpointProviderBridgesByPath,
} from '../framework';
import { TRPCError } from '@trpc/server';

const twilio: EndpointProviderBridgeByPath<'sms.send.twilio'> = async ({
  context,
  input,
}) => {
  // twilio doesn't batch it's requests, so we need to do it ourselves for our api.
  const promises = [];
  for (const to of input.to) {
    promises.push(
      handlers.twilio.createMessage({
        context,
        input: {
          to,
          body: input.body,
        },
      })
    );
  }

  try {
    await Promise.all(promises);
  } catch (error) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: `Twilio pseudo-batch failed to process a request`,
      cause: error,
    });
  }

  return {
    total: input.to.length,
  };
};

const sinch: EndpointProviderBridgeByPath<'sms.send.sinch'> = async ({
  context,
  input,
}) => {
  const response = await handlers.sinch.sendBatch({
    context,
    input: {
      // strip off the + from the phone numbers for sinch
      to: input.to.map((t) => t.replace('+', '')),
      body: input.body,
      parameters: {},
    },
  });

  return {
    total: response.to.length,
  };
};

export const send: EndpointProviderBridgesByPath<'sms.send'> = {
  sinch,
  twilio,
};
