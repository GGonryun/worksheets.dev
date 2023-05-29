import { templates } from '@worksheets/templates';
export function newTemplatesDb() {
  return {
    list: () => {
      return templates();
    },
  };
}
