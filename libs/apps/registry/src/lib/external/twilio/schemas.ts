import { z } from '@worksheets/zod';

export const messageSchema = z.object({
  sid: z
    .string()
    .describe('A 34 character string that uniquely identifies this resource.'),
  dateCreated: z.string().describe('The date that this resource was created.'),
  dateUpdated: z
    .string()
    .describe('The date that this resource was last updated.'),
  dateSent: z.string().describe('The date that the SMS was sent.'),
  body: z.string().describe('The text body of the message.'),
  errorCode: z
    .string()
    .optional()
    .describe('The error code associated with your message.'),
  errorMessage: z
    .string()
    .optional()
    .describe('The error message associated with your message.'),
  numMedia: z
    .number()
    .describe('The number of media items associated with your message.'),
  numSegments: z
    .number()
    .describe('The number of segments used to deliver this message.'),
  status: z
    .string()
    .describe(
      'The status of this message. Either queued, sending, sent, failed, delivered, or undelivered.'
    ),
  from: z
    .string()
    .describe(
      "The sender's phone number in E.164 format. For example, +16175551212."
    ),
  to: z
    .string()
    .describe(
      "The destination phone number. Format with a '+' and country code e.g., +16175551212 (E.164 format)."
    ),
  uri: z
    .string()
    .describe('The URI for this resource, relative to https://api.twilio.com.'),
});
