import { useEffect, useState } from 'react';
export const useTitle = (initialTitle?: string) => {
  const [title, setTitle] = useState(initialTitle ?? '');
  const updateTitle = () => {
    if (!title) return;
    const htmlTitle = document.querySelector('title');
    if (htmlTitle) {
      htmlTitle.innerText = title;
    }
  };
  useEffect(updateTitle, [title]);

  return setTitle;
};
