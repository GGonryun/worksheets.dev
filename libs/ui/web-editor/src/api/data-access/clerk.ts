import { Clerk, MethodDefinition } from '@worksheets/apps/framework';
import http from '@worksheets/apps/http';
import math from '@worksheets/apps/math';
import sys from '@worksheets/apps/sys';
import gmail from '@worksheets/apps/google/gmail';
import calendar from '@worksheets/apps/google/calendar';
import drive from '@worksheets/apps/google/drive';
import { HandlerFailure } from '@worksheets/util/next';

export class OfficialLibraryClerk extends Clerk {
  constructor() {
    super(math, http, sys, gmail, calendar, drive);
  }
}

export function findProperty(method: MethodDefinition, key: string) {
  if (!method.settings) {
    throw new HandlerFailure({
      code: 'unsupported-operation',
      message: `method does not support custom settings`,
      data: { path: method.path },
    });
  }

  const prop = method.settings[key];
  if (!prop) {
    throw new HandlerFailure({
      code: 'unsupported-operation',
      message: `method does not support requested setting`,
      data: { path: method.path, key },
    });
  }

  return prop;
}

export function findOAuthProperty(method: MethodDefinition, key: string) {
  const prop = findProperty(method, key);

  if (prop.type !== 'oauth') {
    throw new HandlerFailure({
      code: 'unsupported-operation',
      message: `unexpected property type, expected 'oauth' but received '${prop.type}'`,
    });
  }

  return prop;
}
