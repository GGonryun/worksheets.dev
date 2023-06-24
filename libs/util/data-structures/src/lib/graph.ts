export class GraphNode<T> {
  key: string;
  value: T;
  children: Map<string, GraphNode<T>>;

  constructor(key: string, value: T) {
    this.key = key;
    this.value = value;
    this.children = new Map<string, GraphNode<T>>();
  }

  connections(): GraphNode<T>[] {
    return Array.from(this.children.values());
  }
}

export class Graph<T> {
  private _root: GraphNode<T>;

  constructor() {
    this._root = new GraphNode<T>('', undefined as unknown as T);
  }

  get root() {
    return this._root;
  }

  private getNode(keys: string[]): GraphNode<T> | undefined {
    let currentNode: GraphNode<T> | undefined = this._root;

    for (const key of keys) {
      if (!currentNode?.children.has(key)) {
        return undefined;
      }

      currentNode = currentNode.children.get(key);
    }

    return currentNode;
  }

  private createNode(keys: string[], value: T): GraphNode<T> {
    let currentNode: GraphNode<T> = this._root;

    for (const key of keys) {
      if (!currentNode.children.has(key)) {
        const newNode = new GraphNode<T>(key, undefined as unknown as T);
        currentNode.children.set(key, newNode);
        currentNode = newNode;
      } else {
        currentNode = currentNode.children.get(key) as GraphNode<T>;
      }
    }

    if (value) {
      currentNode.value = value;
    }

    return currentNode;
  }

  addNode(key: string, value: T): void {
    const keys = key.split('.');
    if (keys.length > 0) {
      this.createNode(keys, value);
    }
  }

  // connects both from and to together
  addEdge(from: string, to: string): void {
    const fromKeys = from.split('.');
    const toKeys = to.split('.');

    if (fromKeys.length > 0 && toKeys.length > 0) {
      const fromNode = this.createNode(fromKeys, undefined as unknown as T);
      const toNode = this.createNode(toKeys, undefined as unknown as T);

      fromNode.children.set(toNode.key, toNode);
      toNode.children.set(fromNode.key, fromNode);
    }
  }

  getValue(key: string): T | undefined {
    const keys = key.split('.');
    const node = this.getNode(keys);
    return node ? node.value : undefined;
  }

  getNeighbors(key: string): string[] {
    const keys = key.split('.');
    const node = this.getNode(keys);
    return node ? Array.from(node.children.keys()) : [];
  }
}
