import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box } from '@mui/material';
import { Worksheets } from './worksheets';
import { Templates } from './templates';
import { request, useUser } from '@worksheets/auth/client';
import { Template } from '@worksheets/templates';
import { warn } from '@worksheets/ui/common';
import { GetApplicationGraphResponse } from '../../api/apps/get';
import { Applications } from './applications';

export function ResourceExplorer() {
  const { user } = useUser();
  const { data } =
    request.query.usePublic<GetApplicationGraphResponse>('/api/apps');

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
        <Applications nodes={data?.children ?? []} />
        <Templates onClipboard={handleClipboard} onClone={handleClone} />
      </TreeView>
    </Box>
  );
}
