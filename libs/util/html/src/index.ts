export const removeBreaks = (content: string) => {
  const breaks = ['\n', '\r', '\r\n', '<br>', '<br/>', '<br />'];
  let newContent = content;
  breaks.forEach((br) => {
    newContent = newContent.replace(new RegExp(br, 'g'), '');
  });
  return newContent;
};
