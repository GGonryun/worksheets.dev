import { handlers } from '@worksheets/apps-handlers';
import {
  EndpointProviderBridges,
  EndpointProviderBridgeByPath,
} from '../framework';

const gmail: EndpointProviderBridgeByPath<'email.send.gmail'> = async ({
  context,
  input,
}) => {
  const result = await handlers.gmail.sendEmail({
    context,
    input: {
      to: input.to,
      subject: input.subject,
      body: input.body,
    },
  });

  return {
    messageId: result.id,
  };
};

export const send: EndpointProviderBridges<'email', 'send'> = {
  gmail,
};
