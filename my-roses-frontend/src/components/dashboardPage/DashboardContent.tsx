import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { Flex, Text, AspectRatio, Grid, GridItem } from '@chakra-ui/react';
import { FaUser, FaCalendarDay, FaListOl } from 'react-icons/fa';
import { RiBook2Fill } from 'react-icons/ri';
import { Card, DashboardContainer } from '../baseComponent';
import { connect, ConnectedProps } from 'react-redux';

const DashboardContent: React.FC<Props> = () => {
  return (
    <Flex
      flexDirection={'column'}
      py={3}
      px={3}
      height={'fit-content'}
      width={'100%'}
      bg={'royalGray.100'}
    >
      <Text fontFamily={'Poppins'} fontSize={'1.45rem'} py={5}>
        Dashboard
      </Text>
      <Grid
        templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }}
        my={3}
        gap={4}
      ></Grid>
      <DashboardContainer flexDirection="column" height={'100%'}>
        <Text fontFamily={'Poppins'} fontSize={'1.45rem'} px={5} py={5}>
          Data Kategori Pelanggaran Harian
        </Text>
        <Flex height={'40rem'} width={'100%'}></Flex>
      </DashboardContainer>
    </Flex>
  );
};

const connector = connect(null);

type Props = ConnectedProps<typeof connector>;

export default connector(DashboardContent);
