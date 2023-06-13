export const warn = (message: string) => (e: unknown) => {
  let suffix = '';
  if (e && typeof e === 'object' && 'message' in e) {
    suffix = `: ${e.message}`;
  }
  console.error('error', e);
  alert(`${message}${suffix}`);
};
