import { FC } from 'react';
import Image from 'next/image';
import { ArrowLeft, Clear, Search } from '@mui/icons-material';
import { CHARITY_TOOLBAR_LOGO_PATH } from '@worksheets/util/assets';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';

type SearchBarProps = {
  value?: string;
  onChange?: (value: string) => void;
  onClear?: () => void;
  onLogoClick?: () => void;
};

export const SearchBar: FC<SearchBarProps> = ({
  value,
  onChange,
  onClear,
  onLogoClick,
}) => {
  return (
    <Box
      borderRadius={3}
      display="flex"
      alignItems="center"
      boxSizing="border-box"
      overflow="hidden"
      height={'64px'}
      sx={{
        backgroundColor: (theme) => theme.palette.background.paper,
      }}
    >
      <ButtonBase
        onClick={onLogoClick}
        sx={{
          display: 'flex',
          alignItems: 'center',
          paddingX: { xs: 1, sm: 2 },
          height: '100%',
          borderRight: (theme) => `2px solid ${theme.palette.grey[100]}`,
        }}
      >
        <ArrowLeft
          fontSize="large"
          sx={{
            mr: -1,
            display: { xs: 'block', sm: 'none' },
            color: (theme) => theme.palette.error.main,
          }}
        />
        <Image
          src={CHARITY_TOOLBAR_LOGO_PATH}
          alt="Charity.Games"
          width={30}
          height={26}
        />
      </ButtonBase>
      <InputBase
        placeholder="Search"
        fullWidth
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        sx={{
          fontFamily: (theme) => theme.typography.dangrek.fontFamily,
          paddingX: 2.5,
          '& input': {
            padding: 0,
            fontSize: '2rem',
          },
        }}
      />
      <Box
        display="flex"
        sx={{
          paddingX: 1,
        }}
      >
        {value ? (
          <IconButton size="small" onClick={() => onClear && onClear()}>
            <Clear fontSize="large" />
          </IconButton>
        ) : (
          <Search
            fontSize="large"
            sx={{
              color: (theme) => theme.palette.border.main,
            }}
          />
        )}
      </Box>
    </Box>
  );
};
