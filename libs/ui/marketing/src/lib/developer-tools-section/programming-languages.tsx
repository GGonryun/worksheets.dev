import { Tooltip, alpha } from '@mui/material';
import { programmingLanguages } from './data';
import { TinyLogo } from '@worksheets/ui-basic-style';
import { Flex } from '@worksheets/ui-core';
import { WhiteProductButton } from '../product-buttons';
import { useLayout } from '@worksheets/ui/common';
import { useState } from 'react';

export const ProgrammingLanguages = () => {
  const { isTablet } = useLayout();
  const [hidden, setHidden] = useState(isTablet);

  const languages = programmingLanguages.filter((p, i) =>
    hidden ? i < 3 : true
  );

  return (
    <Flex pb={1} gap={1} centered wrap>
      {languages.map((p) => (
        <Tooltip
          title="Coming soon"
          key={p.id}
          disableHoverListener={p.id === 'bash'}
        >
          <span>
            <WhiteProductButton
              disabled={p.id !== 'bash'}
              key={p.id}
              color="inherit"
              sx={
                p.id === 'bash'
                  ? {
                      backgroundColor: (theme) =>
                        alpha(theme.palette.primary.light, 0.2),
                    }
                  : undefined
              }
              startIcon={<TinyLogo area={24} src={p.logo} />}
            >
              {p.name}
            </WhiteProductButton>
          </span>
        </Tooltip>
      ))}
      <WhiteProductButton
        color="inherit"
        startIcon={
          <TinyLogo
            area={24}
            src={hidden ? '/icons/plus.svg' : '/icons/close.svg'}
          />
        }
        onClick={() => setHidden(!hidden)}
      >
        {hidden ? 'See More' : 'See Less'}
      </WhiteProductButton>
    </Flex>
  );
};
