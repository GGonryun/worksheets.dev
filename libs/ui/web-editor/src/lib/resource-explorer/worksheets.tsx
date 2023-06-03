import TreeItem from '@mui/lab/TreeItem';
import { Box, Typography } from '@mui/material';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

export type WorksheetsProps = {
  focused: string;
  worksheets: string[]; //worksheetIds
  onClick: (id: string) => void;
};
export function Worksheets({ focused, worksheets, onClick }: WorksheetsProps) {
  const icon = (key: string) => {
    return focused === key ? (
      <InsertDriveFileOutlinedIcon sx={{ fontSize: 14 }} />
    ) : (
      <InsertDriveFileIcon sx={{ fontSize: 14 }} />
    );
  };
  return (
    <TreeItem
      nodeId={'worksheets'}
      label={<Typography>Worksheets ({worksheets.length})</Typography>}
    >
      {worksheets.map((key) => (
        <TreeItem
          sx={{ borderLeft: '1px solid grey' }}
          key={key}
          nodeId={key}
          onClick={() => onClick(key)}
          label={
            <Box display="flex" gap={1} alignItems="baseline">
              {icon(key)}
              <Typography
                overflow="hidden"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
              >
                {key}
              </Typography>
            </Box>
          }
        ></TreeItem>
      ))}
    </TreeItem>
  );
}
