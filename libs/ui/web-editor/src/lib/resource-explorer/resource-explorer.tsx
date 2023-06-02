import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Worksheets } from './worksheets';
import { Templates } from './templates';
import { request, useUser } from '@worksheets/auth/client';
import { Template } from '@worksheets/templates';
import { warn } from '@worksheets/ui/common';
import { GetApplicationGraphResponse } from '../../api/apps/get';
import { Applications } from './applications';
import { useRouter } from 'next/router';
import { GetWorksheetsResponse } from '../../api/worksheets/handler';

export function ResourceExplorer() {
  const { user } = useUser();
  const { data } =
    request.query.usePublic<GetApplicationGraphResponse>('/api/apps');

  const worksheetsApi = '/api/worksheets';
  const mutate = request.query.useMutate();
  const handleClipboard = (template: Template) => {
    navigator.clipboard.writeText(template.text);
  };

  const { push, query } = useRouter();
  const { data: worksheets } = request.query.usePrivate<GetWorksheetsResponse>(
    `/api/worksheets`,
    user
  );

  const handleClick = (key: string) => {
    push(`/ide/${key}`);
  };

  const id = query.worksheet as string;
  const worksheetIds = Object.keys(worksheets ?? {});

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
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ overflowY: 'auto' }}
    >
      <Worksheets
        focused={id}
        worksheets={worksheetIds}
        onClick={handleClick}
      />
      <Applications nodes={data?.children ?? []} />
      <Templates onClipboard={handleClipboard} onClone={handleClone} />
    </TreeView>
  );
}
