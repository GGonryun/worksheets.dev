import math from '@worksheets/apps/math';
import http from '@worksheets/apps/http';
import json from '@worksheets/apps/json';
import {
  ApplicationLibrary,
  MethodDefinition,
} from '@worksheets/apps/framework';
import { Clerk, Technician } from './framework';

export class OfficialApplicationLibrary implements ApplicationLibrary {
  private readonly clerk: Clerk;
  private readonly technician: Technician;
  constructor() {
    this.technician = new Technician();
    // Official applications list.
    this.clerk = new Clerk(math, http, json);
  }
  async list(): Promise<MethodDefinition[]> {
    return this.clerk.display();
  }
  async call(path: string, input: unknown): Promise<unknown> {
    const method = this.clerk.borrow(path);
    return await this.technician.process(method, input);
  }
}
