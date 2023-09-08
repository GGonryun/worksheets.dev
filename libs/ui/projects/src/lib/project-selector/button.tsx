import { ArrowDropDown } from '@mui/icons-material';
import { TinyButton, TinyButtonProps } from '@worksheets/ui-basic-style';
import Image from 'next/image';
import React from 'react';

export const SelectionButton: React.FC<
  Pick<TinyButtonProps, 'onClick' | 'children' | 'variant'>
> = ({ children, onClick, variant }) => (
  <TinyButton
    color="primary"
    variant={variant ?? 'outlined'}
    size="small"
    startIcon={
      <Image
        src="/icons/features/projects.svg"
        height={22}
        width={22}
        alt="projects logo"
        style={{ marginRight: '2px' }}
      />
    }
    endIcon={<ArrowDropDown />}
    onClick={onClick}
  >
    {children}
  </TinyButton>
);
