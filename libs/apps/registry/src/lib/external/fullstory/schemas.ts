import { z } from '@worksheets/zod';

/**
{
  "uid": "10154",
  "displayName": "Daniel Falko",
  "email": "daniel@falko.com",
  "numSessions": "6",
  "firstSeen": "2018-02-07T11:28:18.771Z",
  "lastSeen": "2018-04-19T20:49:50.433Z"
}
*/
export const userSchema = z.object({
  id: z.string(),
  userId: z.string().optional(),
  displayName: z.string().optional(),
  email: z.string().optional(),
  properties: z.record(z.unknown()).optional(),
});

/*
{
  "userId": "1234567890",
  "sessionId": "1234567890",
  "createdTime": "1411492739",
  "fsUrl": "https://www.fullstory.com/ui/ORG_ID/discover/session/1234567890:1234567890"
}
*/
export const sessionSchema = z.object({
  userId: z.string(),
  sessionId: z.string(),
  createdTime: z.string(),
  fsUrl: z.string(),
});
