import { MenuItem, MenuItemProps, styled } from '@mui/material';
import { FC } from 'react';
import { useRouter } from 'next/router';

export type TinyMenuItemProps = Pick<
  MenuItemProps,
  'onClick' | 'selected' | 'children'
> & {
  href?: string;
};

const CustomMenuItem = styled(MenuItem, {
  shouldForwardProp: (prop) => prop !== 'active',
})<TinyMenuItemProps>(({ theme, selected }) => ({
  ...(selected && {
    color: theme.palette.primary.main,
    '& .MuiSvgIcon-root': {
      fill: theme.palette.primary.main,
    },
  }),
}));

export const TinyMenuItem: FC<TinyMenuItemProps> = (props) => {
  const { push } = useRouter();
  return (
    <CustomMenuItem
      dense
      {...props}
      onClick={(e) => {
        props.onClick && props.onClick(e);
        props.href && push(props.href);
      }}
    />
  );
};
