import { Link } from '@mui/material';
import {
  GridActionsCellItemProps,
  GridActionsCellItem,
} from '@mui/x-data-grid';
import { RefAttributes } from 'react';

export type GridLinkActionProps = { href: string } & GridActionsCellItemProps &
  RefAttributes<HTMLButtonElement>;

export const GridLinkAction = ({ href, ...props }: GridLinkActionProps) => {
  return (
    <Link href={href} underline="none" color="inherit" variant="body1">
      <GridActionsCellItem {...props} />
    </Link>
  );
};
