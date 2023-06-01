import { newPublicHandler } from '@worksheets/util/next';
import { newPublicDatabase } from '../data-access/public-db';
import { z } from 'zod';
import { GraphNode } from '@worksheets/util/data-structures';
import { MethodSummary } from '@worksheets/apps/framework';

export type GetApplicationGraphResponse = SerializedNode;

export const get = newPublicHandler({ output: z.unknown() })(async () => {
  const db = newPublicDatabase();
  // TODO: apply real type safety, complex because of recursive json structures.
  const { root } = db.applications.treeView();
  return {
    key: root.key,
    value: root.value,
    children: serializeNodes(root.connections()),
  };
});

export type SerializedNode = {
  key: string;
  value: MethodSummary | undefined;
  children: SerializedNode[];
};

function serializeNodes(nodes: GraphNode<MethodSummary>[]): SerializedNode[] {
  const serialized: SerializedNode[] = [];
  for (const node of nodes) {
    serialized.push({
      key: node.key,
      value: node.value,
      children: serializeNodes(node.connections()),
    });
  }
  return serialized;
}
