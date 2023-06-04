import { Clerk } from '@worksheets/apps/framework';
import http from '@worksheets/apps/http';
import math from '@worksheets/apps/math';
import sys from '@worksheets/apps/sys';
import gmail from '@worksheets/apps/google/gmail';
import calendar from '@worksheets/apps/google/calendar';
import drive from '@worksheets/apps/google/drive';
import github from '@worksheets/apps/github';

const clerk = new Clerk(math, http, sys, gmail, calendar, drive, github);

export const newApplicationsDatabase = () => {
  return clerk;
};

export type ApplicationsDatabase = Clerk;
