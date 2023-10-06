import { Tooltip, alpha } from '@mui/material';
import { TinyLogo } from '@worksheets/ui-basic-style';
import { WhiteProductButton } from '../product-buttons';
import { Flex } from '@worksheets/ui-core';
import { apiEndpoint } from './data';
import { useState } from 'react';
import { useLayout } from '@worksheets/ui/common';

export const ApplicationEndpoints = () => {
  const { isTablet } = useLayout();
  const [hidden, setHidden] = useState(isTablet);

  const endpoints = apiEndpoint.filter((p, i) => (hidden ? i < 3 : true));

  return (
    <Flex gap={1} centered wrap>
      {endpoints.map((p) => (
        <Tooltip
          title="Coming soon"
          key={p.id}
          disableHoverListener={p.id === 'create-user'}
        >
          <span>
            <WhiteProductButton
              disabled={p.id !== 'create-user'}
              key={p.id}
              color="inherit"
              sx={
                p.id === 'create-user'
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
