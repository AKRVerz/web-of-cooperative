import React from 'react';
import { Stack, Flex, Text, AspectRatio } from '@chakra-ui/react';
import Image from 'next/image';
import useBasePath from 'src/utils/useBasePath';

const DefaultTopBar: ReactFC = () => {
  const basePath = useBasePath();

  const aliceText = {
    fontFamily: 'Alice',
    fontSize: {
      base: '1rem',
      lg: '1.2rem',
    },
  };

  const poppinsText = (isYellow = true) => ({
    ...(isYellow ? { color: 'textLogin.Koperasi' } : {}),
    fontFamily: 'Poppins',
    fontSize: {
      base: '0.85rem',
      lg: '1.1rem',
    },
  });

  return (
    <Flex
      display={{ base: 'none', md: 'flex' }}
      alignItems="center"
      px={4}
      py={2}
      color="white"
      userSelect="none"
    >
      <Flex align="center" mr={5}>
        <AspectRatio ratio={1} width={{ base: '50px', sm: '75px', md: '85px' }}>
          <Image
            src={`${basePath}/Logo.webp`}
            alt="Logo"
            width={100}
            height={100}
          />
        </AspectRatio>
      </Flex>
      <Stack display={'flex'} alignItems="left">
        <Text {...poppinsText(false)}>SISTEM INFORMASI PEMBUKUAN KOPERASI</Text>
        <Text {...aliceText}>DESA GIRIMULYO</Text>
        <Text {...poppinsText()}>Argo Mulyo Lestari</Text>
      </Stack>
    </Flex>
  );
};

export default DefaultTopBar;
