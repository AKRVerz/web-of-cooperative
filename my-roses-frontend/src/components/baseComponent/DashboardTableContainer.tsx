import React from 'react';
import { Flex } from '@chakra-ui/react';

const DashboardTableContainer: ReactFC = ({ children }) => {
  return (
    <Flex
      height={'100%'}
      width={'100%'}
      overflow={'auto'}
      flexDirection={'column'}
    >
      {children}
    </Flex>
  );
};

export default DashboardTableContainer;
