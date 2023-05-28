import TreeItem from '@mui/lab/TreeItem';
import { Box, Typography } from '@mui/material';
import { request, useUser } from '@worksheets/auth/client';
import { useRouter } from 'next/router';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { GetWorksheetsResponse } from '../../server';

export function Worksheets() {
  const { push, query } = useRouter();
  const { user } = useUser();
  const { data } = request.query.usePrivate<GetWorksheetsResponse>(
    `/api/worksheets`,
    user
  );

  const handleClick = (key: string) => {
    push(`/ide/${key}`);
  };

  const id = query.worksheet as string;
  const keys = Object.keys(data ?? {});

  const icon = (key: string) => {
    return id === key ? (
      <InsertDriveFileOutlinedIcon sx={{ fontSize: 14 }} />
    ) : (
      <InsertDriveFileIcon sx={{ fontSize: 14 }} />
    );
  };
  return (
    <TreeItem
      nodeId={'worksheets'}
      label={<Typography>Worksheets ({keys.length})</Typography>}
    >
      {keys.map((key) => (
        <TreeItem
          key={key}
          nodeId={key}
          onClick={() => handleClick(key)}
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

// get a list of the user's current worksheets. when we click create assign a new one with a random guid.
