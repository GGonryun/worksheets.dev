export const warn = (message: string) => (r: Response) => {
  if (!r.ok) {
    alert(message);
  }
  return r;
};
