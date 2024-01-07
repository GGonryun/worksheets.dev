export const useImageName = (src: string) => {
  // given src the name is the last part of the path.
  const file = src.split('/').pop();
  if (!file) throw new Error('Invalid image src');
  // drop the extension
  const name = file.split('.').shift();
  if (!name) throw new Error('Invalid file name');
  // return the name
  return { name, file, src };
};
