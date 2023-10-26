export const organizeByLength = (arr: string[]) =>
  arr.reduce((acc, word) => {
    const length = word.length;
    if (!acc[length]) {
      acc[length] = [];
    }
    acc[length].push(word);
    return acc;
  }, {} as Record<number, string[]>);

export type OrganizedByLength = Record<number, string[]>;
