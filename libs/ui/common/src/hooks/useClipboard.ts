export const useClipboard = () => {
  const copy = (text: string) => navigator.clipboard.writeText(text);
  return { copy };
};
