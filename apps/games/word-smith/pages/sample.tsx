import { Box, Button } from '@mui/material';
import { useWindowSize } from '@worksheets/ui-core';
import { motion } from 'framer-motion';
import { useState } from 'react';
const TestPage = () => {
  const [width, height] = useWindowSize();
  console.log('width', width, 'height', height);
  const [side, setSide] = useState(false);
  return (
    <Box>
      <Button onClick={() => setSide((s) => !s)}>Click Me</Button>
      <motion.div
        layout
        style={{
          border: `1px solid black`,
          height: '40px',
          width: '40px',
        }}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          position: side ? 'absolute' : 'initial',
          x: side ? width - 100 : 0,
          y: side ? height - 200 : 0,
        }}
        transition={{
          duration: 1,
        }}
      >
        X
      </motion.div>
    </Box>
  );
};
export default TestPage;
