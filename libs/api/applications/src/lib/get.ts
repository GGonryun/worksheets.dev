import { newPublicHandler } from '@worksheets/util/next';
import { z } from 'zod';
import { GraphNode } from '@worksheets/util/data-structures';
import { MethodSummary } from '@worksheets/apps/framework';
import { newApplicationsDatabase } from '@worksheets/data-access/applications';

export const get = newPublicHandler({ output: z.unknown() })(async () => {
  // TODO: apply real type safety, complex because of recursive json structures.
  const { root } = newApplicationsDatabase().tree();
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
