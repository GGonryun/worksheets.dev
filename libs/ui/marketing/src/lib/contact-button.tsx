import { Box } from '@mui/material';
import { TinyLogo } from '@worksheets/ui-basic-style';
import { boxShadow } from '@worksheets/ui-games';
import { urls } from '@worksheets/ui/common';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { FC } from 'react';

export const ContactButton: FC<{ offset: number }> = ({ offset }) => {
  const { push } = useRouter();
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        position: 'fixed',
        bottom: 15 + offset,
        right: 15,
      }}
    >
      <Box
        onClick={() => push(urls.app.contact)}
        sx={{
          backgroundColor: 'white',
          boxShadow: boxShadow(),
          border: (theme) => `1px solid ${theme.palette.text.disabled}`,
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          display: 'grid',
          placeItems: 'center',
          '&:hover': {
            cursor: 'pointer',
            backgroundColor: (theme) => theme.palette.grey[200],
          },
        }}
      >
        <TinyLogo src={'/icons/contact.svg'} borderless area={32} />
      </Box>
    </motion.div>
  );
};
