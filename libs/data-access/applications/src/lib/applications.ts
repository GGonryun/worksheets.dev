import { Clerk } from '@worksheets/apps/framework';
import http from '@worksheets/apps/http';
import math from '@worksheets/apps/math';
import sys from '@worksheets/apps/sys';
import gmail from '@worksheets/apps/google/gmail';
import calendar from '@worksheets/apps/google/calendar';
import drive from '@worksheets/apps/google/drive';
import github from '@worksheets/apps/github';
import dropbox from '@worksheets/apps/dropbox';
import bitly from '@worksheets/apps/bitly';
import crudcrud from '@worksheets/apps/crudcrud';
import json from '@worksheets/apps/json';
import core from '@worksheets/apps/core';
import openai from '@worksheets/apps/open-ai';

const clerk = new Clerk(
  math,
  http,
  sys,
  gmail,
  calendar,
  drive,
  github,
  dropbox,
  bitly,
  crudcrud,
  json,
  core,
  openai
);

export const newApplicationsDatabase = () => {
  return clerk;
};

export type ApplicationsDatabase = Clerk;
