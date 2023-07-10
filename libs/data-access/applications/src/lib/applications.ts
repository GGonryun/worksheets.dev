import { ApplicationDefinition, Clerk } from '@worksheets/apps/framework';

import http from '@worksheets/apps/http';
import math from '@worksheets/apps/math';
import { sysCore, sysFlags, sysTokens } from '@worksheets/apps/sys';
import gmail from '@worksheets/apps/google/gmail';
import calendar from '@worksheets/apps/google/calendar';
import github from '@worksheets/apps/github';
import crudcrud from '@worksheets/apps/crudcrud';
import json from '@worksheets/apps/json';
import core from '@worksheets/apps/core';
import openai from '@worksheets/apps/open-ai';
import { ApplicationDetails } from '@worksheets/schemas-applications';

const clerk = new Clerk(
  math,
  http,
  sysCore,
  sysFlags,
  sysTokens,
  gmail,
  calendar,
  github,
  crudcrud,
  json,
  core,
  openai
);

export const newApplicationsDatabase = (): ApplicationsDatabase => {
  return clerk;
};

export type ApplicationsDatabase = Clerk;

export const convertApplicationDefinition = (
  app: ApplicationDefinition
): ApplicationDetails => ({
  id: app.id,
  name: app.label,
  logo: app.logo,
  description: app.description,
});
