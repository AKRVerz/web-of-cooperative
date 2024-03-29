import _ from 'lodash';
import React from 'react';
import { useRouter } from 'next/router';
import { AspectRatio, Flex, FlexProps, Grid, GridItem } from '@chakra-ui/react';
import { VscHome, VscSettingsGear, VscSignOut } from 'react-icons/vsc';
import { BsGearFill } from 'react-icons/bs';
import { HiHome } from 'react-icons/hi';
import { removeToken } from 'src/utils/sessionUtils';

const BottomBar: ReactFC = () => {
  const router = useRouter();

  const navigationStyle: FlexProps = {
    _hover: { color: 'royalRed.100' },
    color: 'royalRed.200',
    cursor: 'pointer',
  };

  const inHome = () => {
    const pathname = router.pathname;

    return !_.includes(pathname, '/settings');
  };

  const inSettings = () => {
    const pathname = router.pathname;

    return _.includes(pathname, '/settings');
  };

  return (
    <Flex bg={'white'} overflow="visible" bottom={0} width={'100%'} py={3}>
      <Grid
        templateColumns={'repeat(3, 1fr)'}
        gap={3}
        width={'100%'}
        position={'relative'}
      >
        <GridItem onClick={() => router.push('/')} {...navigationStyle}>
          <Flex justifyContent={'center'} alignItems={'center'}>
            <AspectRatio ratio={1} width={5}>
              {inHome() ? <HiHome /> : <VscHome />}
            </AspectRatio>
          </Flex>
        </GridItem>
        <GridItem onClick={() => router.push('/settings')} {...navigationStyle}>
          <Flex justifyContent={'center'} alignItems={'center'}>
            <AspectRatio ratio={1} width={5}>
              {inSettings() ? <BsGearFill /> : <VscSettingsGear />}
            </AspectRatio>
          </Flex>
        </GridItem>
        <GridItem
          onClick={() => {
            removeToken();
            router.push('/login');
          }}
          {...navigationStyle}
        >
          <Flex justifyContent={'center'} alignItems={'center'}>
            <AspectRatio ratio={1} width={5}>
              <VscSignOut />
            </AspectRatio>
          </Flex>
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default BottomBar;
