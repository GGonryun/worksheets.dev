import { OAuth2Client } from 'google-auth-library';
import { ApplicationExecutors } from '../framework';
import { google } from 'googleapis';

export function newGoogleCalendarClient(accessToken: string) {
  if (!accessToken) {
    throw new Error('invalid accessToken');
  }

  const client = new OAuth2Client();
  client.setCredentials({ access_token: accessToken });

  return google.calendar({ version: 'v3', auth: client });
}

export const googleCalendar: ApplicationExecutors<'googleCalendar'> = {
  async listEvents({ context, input }) {
    const gcal = newGoogleCalendarClient(context.accessToken);
    const response = await gcal.events.list({
      calendarId: input.calendarId,
      maxResults: input.maxResults,
    });

    return {
      kind: 'calendar#events',
      summary: response.data.summary,
      updated: response.data.updated,
      description: response.data.description,
      timeZone: response.data.timeZone,
      accessRole: response.data.accessRole,
      nextPageToken: response.data.nextPageToken,
      nextSyncToken: response.data.nextSyncToken,
      items: response.data?.items?.map((item) => ({
        ...item,
        kind: 'calendar#event',
      })),
    };
  },
};
