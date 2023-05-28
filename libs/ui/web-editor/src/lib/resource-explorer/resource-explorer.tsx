import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box } from '@mui/material';
import { OfficialApplicationLibrary } from '@worksheets/apps/library';
import { Applications } from './applications';
import { Worksheets } from './worksheets';

export function ResourceExplorer() {
  const library = new OfficialApplicationLibrary();
  const tree = library.tree();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (
    <Box>
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ flexGrow: 1, width: 240, overflowY: 'auto' }}
      >
        <Worksheets />
        <Applications nodes={tree.root.connections()} />
      </TreeView>
    </Box>
  );
}
