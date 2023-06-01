import TreeItem from '@mui/lab/TreeItem';
import { Box, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import FolderIcon from '@mui/icons-material/FolderOutlined';
import TaskIcon from '@mui/icons-material/TaskOutlined';
import { SerializedNode } from '../../../api/apps/get';
import { DisplayMethodSummary } from './method-summary';
import { useUser } from '@worksheets/auth/client';

export function Applications(props: { nodes: SerializedNode[] }) {
  return (
    <TreeItem
      nodeId={'applications'}
      label={<Typography>Applications</Typography>}
    >
      {props.nodes.map((node, i) => {
        return <NodeTreeItem key={i} node={node} />;
      })}
    </TreeItem>
  );
}

function NodeTreeItem(props: { node: SerializedNode }) {
  const { user } = useUser();
  const { key, value, children } = props.node;
  const nodes = Array.from(children.values());
  if (!!value?.settings.length && !user) return null;
  return (
    <TreeItem
      sx={{ borderLeft: '1px solid grey' }}
      label={
        <Box display="flex" alignItems="center" gap={1}>
          {nodes.length ? (
            <FolderIcon fontSize="small" />
          ) : (
            <TaskIcon fontSize="small" />
          )}
          {key}
        </Box>
      }
      nodeId={uuidv4()}
    >
      {nodes.map((n, i) => (
        <NodeTreeItem node={n} key={i} />
      ))}
      {value && <DisplayMethodSummary {...value} />}
    </TreeItem>
  );
}
