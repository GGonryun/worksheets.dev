import { Location } from '../types';
export class Grid {
  static delimiter = '-';
  static lowestRow = 19;
  static rowToHeight(row: number, offset = 0) {
    const base = 100 + row * 30;
    return base + offset;
  }
  static columnToWidth(column: number, offset = 0) {
    const base = 50 + column * 30;
    return base + offset;
  }
  static below({ column, row }: Location) {
    return { column, row: row + 1 };
  }
  static lowest({ row }: Location): boolean {
    return row === 19;
  }
  static positionToKey({ column, row }: Location) {
    return `${column}${this.delimiter}${row}`;
  }
  static keyToPosition(key: string): Location {
    const [column, row] = key.split(this.delimiter).map(Number);
    return { column, row };
  }
}
