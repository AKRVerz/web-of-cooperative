import React from 'react';
import { Box, Flex, Grid, GridItem, Text } from '@chakra-ui/react';

const Card: ReactFC<Props> = ({ bGround, title }) => {
  return (
    <Box
      bg={bGround}
      width={{ base: '100%', md: '100%' }}
      color="white"
      borderRadius={10}
    >
      <Grid gap={3} templateColumns={'repeat(2, 1fr)'}>
        <GridItem colSpan={2} pl="1rem">
          <Text fontFamily={'Poppins'} fontWeight="700" fontSize={'1.45rem'}>
            {title}
          </Text>
        </GridItem>

        <GridItem colSpan={1} textAlign="end" justifyContent="end">
          <Flex justifyContent="end" pr={5} pb={5}></Flex>
        </GridItem>
      </Grid>
    </Box>
  );
};

type Props = {
  bGround: string;
  title: string;
};

export default Card;
