import { Library } from './framework';
import math from '@worksheets/apps/math';
import http from '@worksheets/apps/http';
import json from '@worksheets/apps/json';

export class OfficialLibrary extends Library {
  constructor() {
    super();
    this.clerk.register(math);
    this.clerk.register(http);
    this.clerk.register(json);
  }
}
