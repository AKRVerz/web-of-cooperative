import React, { useEffect, useState } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { connect, ConnectedProps } from 'react-redux';
import { getAllPembukuan as _getAllPembukuan } from 'src/store/actions/resources/pembukuans';
import { DashboardContainer, DashboardMainContainer } from '../baseComponent';
import { RootState } from 'src/store';
import { RESOURCE_NAME } from 'src/utils/constant';
import { resources } from 'src/store/selectors';
import GrafikPenjualanBibit from '../baseComponent/GrafikPenjualanBibit';

const GrafikContent: React.FC<Props> = ({ pembukuans, getAllPembukuan }) => {
  useEffect(() => {
    (async () => {
      await getAllPembukuan();
    })();
  }, []); // eslint-disable-line

  return (
    <DashboardMainContainer>
      <DashboardContainer flexDirection={'column'} height={'100%'}>
        <Flex
          flexDirection="column"
          alignItems="center"
          p={{ base: 2, md: 10 }}
          width={'100%'}
          height={'100%'}
        >
          <Flex width={'100%'}>
            <Text>Grafik Penjualan Bibit</Text>
          </Flex>
          <Flex width={'100%'} height={'100%'}>
            <GrafikPenjualanBibit pembukuans={pembukuans} />
          </Flex>
        </Flex>
      </DashboardContainer>
    </DashboardMainContainer>
  );
};

const mapStateToProps = (state: RootState) => ({
  pembukuans: resources.getResource(RESOURCE_NAME.PEMBUKUANS)(state),
});

const connector = connect(mapStateToProps, {
  getAllPembukuan: _getAllPembukuan,
});

type Props = ConnectedProps<typeof connector>;

export default connector(GrafikContent);
