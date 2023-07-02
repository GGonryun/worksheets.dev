import { OpenInNew } from '@mui/icons-material';
import { Link, SvgIconProps } from '@mui/material';
import React, { ReactNode } from 'react';

export const OpenInNewTabLink: React.FC<{
  href: string;
  fontSize?: number | SvgIconProps['fontSize'];
  children: ReactNode;
}> = ({ href, fontSize = 'inherit', children }) => {
  let props: SvgIconProps;
  if (typeof fontSize === 'number') {
    props = { sx: { fontSize } };
  } else {
    props = { fontSize };
  }

  return (
    <Link href={href} target="_blank">
      {children} <OpenInNew {...props} />
    </Link>
  );
};
