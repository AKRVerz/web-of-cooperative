import _ from 'lodash';
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Spacer,
  Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  DashboardContainer,
  DashboardMainContainer,
  DashboardTableContainer,
} from 'src/components/baseComponent';
import { resources as resourcesAction } from 'src/store/actions';
import { resources as resourcesSelector } from 'src/store/selectors';
import { RESOURCE_NAME } from 'src/utils/constant';
import moment from 'moment';
import { formatRupiah } from 'src/utils/formaterRupiah';
import { FaEdit, FaTrash } from 'react-icons/fa';

const IuranListContent = () => {
  const router = useRouter();
  const userId = router.query.userId as string;
  const iurans = useSelector(
    resourcesSelector.getResource(RESOURCE_NAME.IURANS)
  );

  useEffect(() => {
    if (!router.isReady) return;

    resourcesAction.getAllData(
      RESOURCE_NAME.IURANS,
      `filters=userId = ${userId}`,
      true
    )();
  }, [router.isReady]);

  if (!iurans || !iurans.count || !iurans.rows) return null;

  return (
    <DashboardMainContainer>
      <Text fontFamily={'Poppins'} fontSize={'1.45rem'} py={5}>
        Data Iuran Member
      </Text>
      <DashboardContainer px={10} flexDirection={'column'}>
        <Flex
          mb={4}
          mt={8}
          justifyContent={'space-between'}
          alignItems="center"
        >
          <Flex gap={2}></Flex>
        </Flex>
        <DashboardTableContainer>
          <Box>
            <Box
              display="flex"
              flexDirection="row"
              fontSize={'1rem'}
              textAlign="center"
              as="b"
            >
              <Text color="white" bg={'royalRed.200'} width={'45%'} py={2}>
                Bulan
              </Text>
              <Text color="white" bg={'royalRed.200'} width={'45%'} py={2}>
                Uang(RP)
              </Text>
              <Text
                py={2}
                color="white"
                bg={'royalRed.200'}
                textAlign="center"
                borderTopRightRadius={10}
                width={'20%'}
              >
                Aksi
              </Text>
            </Box>
          </Box>
          <Box display={'flex'} flexDirection="column">
            {_.map(_.values(iurans.rows), (iuran, id) => {
              return (
                <Box>
                  <Box
                    key={`iuran-${id}`}
                    bg={id % 2 !== 0 ? '#E1E1E1' : 'white'}
                    display={'flex'}
                    flexDirection="row"
                    textAlign={'center'}
                  >
                    <Text width={'45%'} py={2}>
                      {moment(iuran.createdAt).format('MMMM YYYY')}
                    </Text>
                    <Text width={'45%'} py={2}>
                      {formatRupiah(iuran.debt)}
                    </Text>
                    <Text width={'20%'} py={2}>
                      <Flex justifyContent={'space-between'}>
                        <FaEdit
                          onClick={() => {
                            router.push({
                              pathname: `${router.pathname}/[iuranId]`,
                              query: {
                                userId,
                                iuranId: iuran.id.toString(),
                              },
                            });
                          }}
                          cursor={'pointer'}
                        />
                        <Spacer />
                        <FaTrash onClick={() => {}} cursor={'pointer'} />
                      </Flex>
                    </Text>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </DashboardTableContainer>
      </DashboardContainer>
    </DashboardMainContainer>
  );
};

export default IuranListContent;
