import {
  ListApplicationMethodDetailsResponse,
  ListApplicationsResponse,
} from '@worksheets/schemas-applications';

export type ApplicationMethodItem =
  ListApplicationMethodDetailsResponse[number];

export type ApplicationDetails = ListApplicationsResponse[number];
