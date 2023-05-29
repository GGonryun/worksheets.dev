import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box } from '@mui/material';
import { OfficialApplicationLibrary } from '@worksheets/apps/library';
import { Applications } from './applications';
import { Worksheets } from './worksheets';
import { Templates } from './templates';
import { request, useUser } from '@worksheets/auth/client';
import { Template } from '@worksheets/templates';
import { warn } from '@worksheets/ui/common';

export function ResourceExplorer() {
  const { user } = useUser();
  const library = new OfficialApplicationLibrary();
  const tree = library.tree();

  const worksheetsApi = '/api/worksheets';
  const mutate = request.query.useMutate();
  const handleClipboard = (template: Template) => {
    alert('copied worksheet to clipboard');
    navigator.clipboard.writeText(template.text);
  };

  const handleClone = (template: Template) => {
    if (
      // eslint-disable-next-line no-restricted-globals
      confirm(
        `are you sure you want to clone ${template.id}? this action will open a new tab.`
      )
    ) {
      request.command
        .private(user)(worksheetsApi, 'POST', { text: template.text })
        .then((id) => {
          mutate(worksheetsApi);
          const win = window.open(`/ide/${id}`, '_blank');
          win?.focus();
        })
        .catch(warn('failed to clone worksheet'));
    }
  };

  return (
    <Box>
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ flexGrow: 1, width: 240, overflowY: 'auto' }}
      >
        <Worksheets />
        <Applications nodes={tree.root.connections()} />
        <Templates onClipboard={handleClipboard} onClone={handleClone} />
      </TreeView>
    </Box>
  );
}
