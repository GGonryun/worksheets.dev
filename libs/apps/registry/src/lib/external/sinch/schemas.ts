import { z } from '@worksheets/zod';

export const sendBatchRequest = z.object({
  from: z.string().describe('Your virtual number'),
  to: z.array(z.string()).describe("The list of recipients' phone numbers"),
  body: z.string().describe('The message you want to send'),
  parameters: z
    .record(z.record(z.string()))
    .describe(
      'Record<parameter_name, Record<recipient_phone_number, parameter_value>>'
    )
    .describe('The parameters you want to send with the message'),
});

export const dryRunResponse = z.object({
  numberOfRecipients: z.number().describe('The number of recipients'),
  numberOfMessages: z.number().describe('The number of messages'),
  perRecipient: z
    .array(
      z.object({
        recipient: z.string().describe("The recipient's phone number"),
        body: z.string().describe('The message body'),
        encoding: z.string().describe('The encoding used'),
        messagePart: z.string().describe('The number of message parts'),
      })
    )
    .optional(),
});

export const sentBatchSchema = z.object({
  id: z.string().describe('The batch ID'),
  to: z.array(z.string()).describe("The list of recipients' phone numbers"),
  from: z.string().describe('Your virtual number'),
  canceled: z.boolean().describe('Whether the batch was canceled'),
  body: z.string().describe('The message body'),
  createdAt: z.string().describe('The creation date'),
  modifiedAt: z.string().describe('The last modification date'),
  expireAt: z.string().describe('The expiration date'),
});
