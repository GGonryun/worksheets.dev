import {
  EndpointProviderBridges,
  EndpointProviderBridgeByPath,
} from '../framework';

const sendGrid: EndpointProviderBridgeByPath<'email.send.sendGrid'> = async ({
  context,
  input,
}) => ({
  messageId: '',
});

const gmail: EndpointProviderBridgeByPath<'email.send.gmail'> = async ({
  context,
  input,
}) => ({
  messageId: '',
});

export const send: EndpointProviderBridges<'email', 'send'> = {
  gmail,
  sendGrid,
};
