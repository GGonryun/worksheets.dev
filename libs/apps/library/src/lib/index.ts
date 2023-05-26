import math from '@worksheets/apps/math';
import http from '@worksheets/apps/http';
import json from '@worksheets/apps/json';
import {
  ApplicationLibrary,
  MethodDefinition,
} from '@worksheets/apps/framework';
import { Clerk, MethodSummary, Technician, Translator } from './framework';
import { Graph } from '@worksheets/util/data-structures';

export * from './framework';
export class OfficialApplicationLibrary implements ApplicationLibrary {
  private readonly clerk: Clerk;
  private readonly technician: Technician;
  private readonly translator: Translator;
  constructor() {
    this.translator = new Translator();
    this.technician = new Technician();
    // Official applications list.
    this.clerk = new Clerk(math, http, json);
  }

  tree(): Graph<MethodSummary> {
    const methods = this.list();
    const graph = new Graph<MethodSummary>();
    for (const method of methods) {
      graph.addNode(method.path, this.translator.print(method));
    }
    return graph;
  }

  list(): MethodDefinition[] {
    return this.clerk.display();
  }
  async call(path: string, input: unknown): Promise<unknown> {
    const method = this.clerk.borrow(path);
    return await this.technician.process(method, input);
  }
}
