export const dialogs: Record<string, string> = {
  'tutorial-1':
    "**Welcome to Nonograms!** This is a tutorial to teach you the basics. The second row needs 3 squares, and the other's should be empty. *Finish the puzzle to continue*.",
  'tutorial-2':
    "Sometimes you'll see two numbers in a column or row, this means that there are two groups of filled in squares. For example, the second row has a 1 and a 1, so you know that there are **two distinct groups** of filled in squares. *Finish the puzzle to continue*.",
  'tutorial-3':
    "The order of the numbers matters. For example, the second column has a 1 and a 2. First, from top to bottom, there's a group of 1 filled in square, and then a **separate group** of 2 filled in squares. *Finish the puzzle to continue*.",
  chick:
    "You're doing great! Now you're ready to try a real puzzle. This one is called 'Chick'. *Finish the puzzle to continue*.",
};

export const findDialog = (id: string): string | undefined => {
  return dialogs[id];
};
