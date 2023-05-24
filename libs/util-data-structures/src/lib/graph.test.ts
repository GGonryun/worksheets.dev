import { Graph } from './graph';
describe('Graph', () => {
  describe('should correctly add nodes and edges', () => {
    let graph: Graph<any>;

    beforeEach(() => {
      graph = new Graph<any>();
    });

    it('should return nested children', () => {
      graph.addNode('test.test', 1);
      expect(graph.getNeighbors('test')).toEqual(['test']);
      expect(graph.getNeighbors('test.test')).toEqual([]);
      expect(graph.getValue('test')).toEqual(undefined);
      expect(graph.getValue('test.test')).toEqual(1);
    });

    it('should work with objects', () => {
      graph.addNode('test', { a: 1 });
      expect(graph.getNeighbors('test')).toEqual([]);
      expect(graph.getValue('test')).toEqual({ a: 1 });
    });

    it('should correctly add nodes and edges with values', () => {
      graph.addNode('Alice', 1);
      graph.addNode('Alice.Bob', 2);
      graph.addNode('Alice.Charlie', 3);
      graph.addNode('Alice.Charlie.Dave', 4);

      graph.addEdge('Alice.Bob', 'Alice.Charlie');
      graph.addEdge('Alice.Charlie.Dave', 'Alice.Bob');

      expect(graph.getValue('Alice')).toEqual(1);
      expect(graph.getValue('Alice.Bob')).toEqual(2);
      expect(graph.getValue('Alice.Charlie')).toEqual(3);
      expect(graph.getValue('Alice.Charlie.Dave')).toEqual(4);

      expect(graph.getNeighbors('Alice')).toEqual(['Bob', 'Charlie']);
      expect(graph.getNeighbors('Alice.Charlie')).toEqual(['Dave', 'Bob']);
      expect(graph.getNeighbors('Alice.Charlie.Dave')).toEqual(['Bob']);
      expect(graph.getNeighbors('Alice.Bob')).toEqual(['Charlie', 'Dave']);
    });

    it('should return undefined for non-existent nodes', () => {
      expect(graph.getValue('Eve')).toBeUndefined();
    });

    it('should return an empty array for non-existent node neighbors', () => {
      expect(graph.getNeighbors('Eve')).toEqual([]);
    });
  });
});
