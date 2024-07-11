export class Coordinate {
  x: number;
  y: number;
  static delimiter = ',';
  static fromString(key: string) {
    const [x, y] = Coordinate.parseKey(key);
    return new Coordinate(x, y);
  }

  static parseKey(key: string) {
    return key.split(Coordinate.delimiter).map(Number);
  }

  static fromVector(vector: { x: number; y: number }) {
    return new Coordinate(vector.x, vector.y);
  }

  getNeighbor(direction: Coordinate | { x: number; y: number }) {
    return new Coordinate(this.x + direction.x, this.y + direction.y);
  }

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return `${this.x}${Coordinate.delimiter}${this.y}`;
  }
}
