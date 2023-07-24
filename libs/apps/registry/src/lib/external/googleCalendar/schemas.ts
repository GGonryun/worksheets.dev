import { z } from '@worksheets/zod';

/*
{
    "id": string,
    "email": string,
    "displayName": string,
    "self": boolean
},
*/
const userSchema = z
  .object({
    id: z.string().nullable(),
    email: z.string().nullable(),
    displayName: z.string().nullable(),
    self: z.boolean().nullable(),
  })
  .partial();

const timeSchema = z
  .object({
    date: z.string().nullable(),
    dateTime: z.string().nullable(),
    timeZone: z.string().nullable(),
  })
  .partial();

/*
 {
    "id": string,
    "email": string,
    "displayName": string,
    "organizer": boolean,
    "self": boolean,
    "resource": boolean,
    "optional": boolean,
    "responseStatus": string,
    "comment": string,
    "additionalGuests": integer
}
*/
const attendeeSchema = z
  .object({
    id: z.string().nullable(),
    email: z.string().nullable(),
    displayName: z.string().nullable(),
    organizer: z.boolean().nullable(),
    self: z.boolean().nullable(),
    resource: z.boolean().nullable(),
    optional: z.boolean().nullable(),
    responseStatus: z.string().nullable(),
    comment: z.string().nullable(),
    additionalGuests: z.number().nullable(),
  })
  .partial();

/*
{
    "fileUrl": string,
    "title": string,
    "mimeType": string,
    "iconLink": string,
    "fileId": string
}
*/

const attachmentSchema = z
  .object({
    fileUrl: z.string().nullable(),
    title: z.string().nullable(),
    mimeType: z.string().nullable(),
    iconLink: z.string().nullable(),
    fileId: z.string().nullable(),
  })
  .partial();

/*
{
  "kind": "calendar#event",
  "id": string,
  "status": string,
  "htmlLink": string,
  "created": datetime,
  "updated": datetime,
  "summary": string,
  "description": string,
  "location": string,
  "colorId": string,
  "creator": userSchema,
  "organizer": userSchema,
  "start": timeSchema,
  "end": timeSchema,
  "endTimeUnspecified": boolean,
  "transparency": string,
  "visibility": string,
  "attendees": attendeeSchema[],
  "attendeesOmitted": boolean,
  "hangoutLink": string,
  "guestsCanInviteOthers": boolean,
  "guestsCanModify": boolean,
  "guestsCanSeeOtherGuests": boolean,
  "locked": boolean,
  "source": {
    "url": string,
    "title": string
  },
  "attachments": attachmentSchema[],
  "eventType": string
}
*/

export const calendarEventSchema = z
  .object({
    id: z.string().nullable(),
    kind: z.literal('calendar#event').nullable(),
    status: z.string().nullable(),
    htmlLink: z.string().nullable(),
    created: z.string().nullable(),
    updated: z.string().nullable(),
    summary: z.string().nullable(),
    description: z.string().nullable(),
    location: z.string().nullable(),
    colorId: z.string().nullable(),
    creator: userSchema.nullable(),
    organizer: userSchema.nullable(),
    start: timeSchema.nullable(),
    end: timeSchema.nullable(),
    endTimeUnspecified: z.boolean().nullable(),
    transparency: z.string().nullable(),
    visibility: z.string().nullable(),
    attendees: z.array(attendeeSchema).nullable(),
    attendeesOmitted: z.boolean().nullable(),
    hangoutLink: z.string().nullable(),
    guestsCanInviteOthers: z.boolean().nullable(),
    guestsCanModify: z.boolean().nullable(),
    guestsCanSeeOtherGuests: z.boolean().nullable(),
    locked: z.boolean().nullable(),
    source: z
      .object({ url: z.string().nullable(), title: z.string().nullable() })
      .partial()
      .nullable(),
    attachments: z.array(attachmentSchema).nullable(),
    eventType: z.string().nullable(),
  })
  .partial();
