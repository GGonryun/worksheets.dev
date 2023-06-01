import { v4 as uuidv4 } from 'uuid';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { TreeItem } from '@mui/lab';
import { Box, Typography } from '@mui/material';

export type MethodSummaryHeaderProps = {
  label: string;
  path: string;
  description: string;
};
export function MethodSummaryHeader({
  label,
  path,
  description,
}: MethodSummaryHeaderProps) {
  return (
    <TreeItem
      nodeId={uuidv4()}
      label={
        <Box display="flex" alignItems="center" gap={1}>
          <InfoOutlinedIcon fontSize={'small'} />
          details
        </Box>
      }
    >
      <Box borderLeft="1px solid grey" pl={1}>
        <Typography fontSize={12}>
          Label: {label} <br />
          Usage: `call: {path}` <br />
          Description {description}
        </Typography>
      </Box>
    </TreeItem>
  );
}
