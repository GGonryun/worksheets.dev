export type Nonogram = boolean[][];

export type GeneratedNonogram = {
  solution: Nonogram;
  // for each column, it gives us the number of consecutive true bits
  columns: number[][];
  // for each row, it gives us the number of consecutive true bits
  rows: number[][];
};

export const generateNonogram = (bits: boolean[][]) => {
  // for each column, it gives us the number of consecutive true bits
  const columns: number[][] = [];
  // for each row, it gives us the number of consecutive true bits
  const rows: number[][] = [];
  for (let i = 0; i < bits.length; i++) {
    const row = bits[i];
    for (let j = 0; j < row.length; j++) {
      const bit = row[j];
      if (columns[j] === undefined) {
        columns[j] = [];
      }

      if (rows[i] === undefined) {
        rows[i] = [];
      }

      if (bit) {
        const lastColumn = Math.max(0, columns[j].length - 1);
        if (columns[j][lastColumn] === undefined) {
          columns[j][lastColumn] = 0;
        }
        const lastRow = Math.max(0, rows[i].length - 1);
        if (rows[i][lastRow] === undefined) {
          rows[i][lastRow] = 0;
        }
        columns[j][lastColumn]++;
        rows[i][lastRow]++;
      } else {
        columns[j].push(0);
        rows[i].push(0);
      }
    }
  }
  return {
    solution: bits,
    rows: rows.map((row) => row.filter((n) => n)),
    columns: columns.map((column) => column.filter((n) => n)),
  };
};
