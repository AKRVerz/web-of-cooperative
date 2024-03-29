import React from 'react';
import _ from 'lodash';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  AspectRatio,
  Flex,
  VStack,
  Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { GoSignOut, GoGraph } from 'react-icons/go';
import { FaUser, FaHome } from 'react-icons/fa';
import { RiAddCircleFill } from 'react-icons/ri';
import { USER_ROLE } from 'src/utils/constant';
import { removeToken } from 'src/utils/sessionUtils';
import useTopBarHeight from 'src/utils/useTopBarHeight';

const SideBar: ReactFC<Props> = ({ show }) => {
  const router = useRouter();
  const decreasor = useTopBarHeight();

  const isActive = {
    fontWeight: 'bold',
    color: 'royalRed.200',
  };

  const generateAccordion = () =>
    _.map(USER_ROLE, (role, key) => {
      const resource = role.split('_');

      return (
        <Text
          cursor={'pointer'}
          padding={3}
          key={key}
          _hover={{ color: 'royalRed.100' }}
          onClick={() => router.push(`/dashboard/akun/${resource.join('-')}s`)}
        >
          {_.map(resource, (r) => _.capitalize(r)).join(' ')}
        </Text>
      );
    });

  return (
    <Flex
      height={{ base: `calc(100vh - ${decreasor}px)`, md: '100%' }}
      width={{ base: '100%', md: '20rem' }}
      mr={{ base: 0, md: 5 }}
      position={{
        base: 'absolute',
        md: 'relative',
      }}
      bg="white"
      left={{ base: show ? 0 : '-100%', md: 0 }}
      zIndex={5}
    >
      <VStack
        spacing={5}
        alignItems={'flex-start'}
        py={4}
        px={5}
        width={'100%'}
        height={'100%'}
      >
        <Flex
          width={'90%'}
          alignItems={'center'}
          userSelect={'none'}
          cursor={'pointer'}
          onClick={() => router.push('/dashboard')}
          _hover={{ color: 'royalRed.100' }}
          {...(router.pathname === '/dashboard' && isActive)}
        >
          <AspectRatio ratio={1} width={8} mr={2}>
            <FaHome />
          </AspectRatio>
          <Text>Dashboard</Text>
        </Flex>
        <Accordion allowMultiple width={'100%'}>
          <AccordionItem border={'none'}>
            <AccordionButton padding={0}>
              <Flex
                width={'90%'}
                alignItems={'center'}
                userSelect={'none'}
                _hover={{ color: 'royalRed.100' }}
                {...(_.includes(router.pathname, '/dashboard/akun') &&
                  isActive)}
              >
                <AspectRatio ratio={1} width={8} mr={2}>
                  <FaUser />
                </AspectRatio>
                <Text>Akun</Text>
              </Flex>
            </AccordionButton>
            <AccordionPanel>{generateAccordion()}</AccordionPanel>
          </AccordionItem>
        </Accordion>
        <Flex
          width={'90%'}
          alignItems={'center'}
          userSelect={'none'}
          cursor={'pointer'}
          onClick={() => router.push('/dashboard/pembukuan')}
          _hover={{ color: 'royalRed.100' }}
          {...(_.includes(router.pathname, '/dashboard/pembukuan') && isActive)}
        >
          <AspectRatio justifyContent={'flex-start'} ratio={1} width={8} mr={2}>
            <RiAddCircleFill />
          </AspectRatio>
          <Text>Laporan</Text>
        </Flex>
        <Flex
          width={'90%'}
          alignItems={'center'}
          userSelect={'none'}
          cursor={'pointer'}
          onClick={() => router.push('/dashboard/iuran')}
          _hover={{ color: 'royalRed.100' }}
          {...(_.includes(router.pathname, '/dashboard/iuran') && isActive)}
        >
          <AspectRatio justifyContent={'flex-start'} ratio={1} width={8} mr={2}>
            <RiAddCircleFill />
          </AspectRatio>
          <Text>Iuran</Text>
        </Flex>
        <Flex
          width={'90%'}
          alignItems={'center'}
          userSelect={'none'}
          cursor={'pointer'}
          onClick={() => router.push('/grafik')}
          _hover={{ color: 'royalRed.100' }}
          {...(_.includes(router.pathname, '/grafik') && isActive)}
        >
          <AspectRatio justifyContent={'flex-start'} ratio={1} width={8} mr={2}>
            <GoGraph />
          </AspectRatio>
          <Text>Grafik Penjualan Bibit</Text>
        </Flex>
        <Flex
          width={'90%'}
          userSelect={'none'}
          cursor={'pointer'}
          onClick={() => {
            removeToken();
            router.push('/login');
          }}
          _hover={{ color: 'royalRed.100' }}
        >
          <Flex ml={'5px'} alignItems={'center'}>
            <AspectRatio justifyContent={'center'} ratio={1} width={8} mr={2}>
              <GoSignOut />
            </AspectRatio>
            <Text>Keluar</Text>
          </Flex>
        </Flex>
      </VStack>
    </Flex>
  );
};

type Props = {
  show: boolean;
};

export default SideBar;
