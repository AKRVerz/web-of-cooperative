import React from 'react';
import { Box, Flex } from '@chakra-ui/react';

const DefaultLayout: ReactFC = ({ children }) => {
  return (
    <Box
      bgImage={'./background_login.webp'}
      height="100vh"
      width="100vw"
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize="cover"
    >
      <Flex direction={'column'} height="100%" width="100%">
        {children}
      </Flex>
    </Box>
  );
};

export default DefaultLayout;
