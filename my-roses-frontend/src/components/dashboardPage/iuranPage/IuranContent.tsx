import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import {
  Flex,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  Spacer,
  Button,
  Box,
} from '@chakra-ui/react';
import moment from 'moment';
import { connect, ConnectedProps } from 'react-redux';
import Router from 'next/router';
import { FaEdit, FaSearch, FaTrash } from 'react-icons/fa';
import { RESOURCE_NAME } from 'src/utils/constant';
import { RootState } from 'src/store';
import { resources } from 'src/store/selectors';
import { errorToastfier } from 'src/utils/toastifier';
import {
  getAllIuran as _getAllIuran,
  deleteIuran as _deleteIuran,
} from 'src/store/actions/resources/iurans';
import { getAllUser as _getAllUser } from 'src/store/actions/resources/users';
import useCustomDebounce from 'src/hooks/useCustomDebounce';
import DeleteConfirmationModal from 'src/components/baseComponent/DeleteConfirmationModal';
import {
  DashboardContainer,
  DashboardMainContainer,
  DashboardTableContainer,
  Pagination,
} from 'src/components/baseComponent';
import { buttonStyle } from 'src/utils/styles';
import useChakraToast from 'src/hooks/useChakraToast';

const IuranContent: React.FC<Props> = ({ users, deleteIurans, getAllUser }) => {
  const [page, setPage] = useState<number>(1);
  const toast = useChakraToast();
  const [searchValue, setSearchValue] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [iuranId, setIuranId] = useState<number | null>(null);
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const [limit] = useState<number>(15);

  const onClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    (async () => {
      await getAllUser(`page=${page}&limit=${limit}&includes=iurans`);

      setFirstLoad(false);
    })();
  }, []); // eslint-disable-line

  useCustomDebounce(
    async () => {
      if (firstLoad) return;

      await getAllUser(`page=${page}&limit=${limit}`);
    },
    1000,
    [searchValue, page]
  );

  const deleteIuran = async () => {
    try {
      if (!iuranId) return;

      await deleteIurans(iuranId);
      onClose();
    } catch (e) {
      errorToastfier(toast, e);
    }
  };

  return (
    <DashboardMainContainer>
      <Text float="left" fontFamily={'Poppins'} fontSize={'1.45rem'} py={5}>
        Buat Iuran
      </Text>
      <DashboardContainer px={10} flexDirection={'column'}>
        <Flex
          mb={4}
          mt={8}
          justifyContent={'space-between'}
          alignItems="center"
        >
          <Flex gap={2}>
            <Button
              {...buttonStyle.confirmation}
              fontFamily="poppins"
              fontSize={'0.813rem'}
              px={10}
              borderRadius={25}
              _focus={{ border: 'none' }}
              onClick={() => Router.push(`${Router.pathname}/create`)}
            >
              Tambah
            </Button>
          </Flex>
          <InputGroup width={'15rem'} boxShadow={'lg'} borderRadius={25}>
            <Input
              px={10}
              color="black"
              borderRadius={25}
              fontFamily="poppins"
              fontSize={'0.813rem'}
              placeholder="Cari"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <InputRightElement pointerEvents="none">
              <FaSearch />
            </InputRightElement>
          </InputGroup>
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
              <Text color="white" bg={'royalRed.200'} width={'31%'} py={2}>
                Nama
              </Text>
              <Text color="white" bg={'royalRed.200'} width={'32%'} py={2}>
                Hari/Tanggal
              </Text>
              <Text color="white" bg={'royalRed.200'} width={'32%'} py={2}>
                Uang(RP)
              </Text>

              <Text
                py={2}
                color="white"
                bg={'royalRed.200'}
                textAlign="center"
                borderTopRightRadius={10}
                width={'5%'}
              >
                Aksi
              </Text>
            </Box>
          </Box>
          <Box display={'flex'} flexDirection="column">
            {_.map(_.values(users.rows), ({ iurans, ...user }, index) => {
              const iuranByMonth = _.groupBy(iurans, (a) =>
                moment(a.createdAdt).format('YYYY-MM')
              );
              const iuranTotal = _.map(iuranByMonth, (value, date) => ({
                date: date,
                debt: _.reduce(value, (prev, curr) => prev + curr.debt, 0),
              }));

              return (
                <Box>
                  {_.map(_.sortBy(iuranTotal, ['date']), (iuran, id) => (
                    <Box
                      key={`iuran-${id}`}
                      bg={id % 2 !== 0 ? '#E1E1E1' : 'white'}
                      display={'flex'}
                      flexDirection="row"
                      textAlign={'center'}
                    >
                      <Text width={'31%'} py={2}>
                        {user.username}
                      </Text>
                      <Text width={'32%'} py={2}>
                        {moment(iuran.date).format('MMMM YYYY')}
                      </Text>
                      <Text width={'32%'} py={2}>
                        {iuran.debt}
                      </Text>
                      <Text width={'5%'} py={2}>
                        <Flex justifyContent={'space-between'}>
                          <FaEdit
                            onClick={() =>
                              Router.push(
                                `${Router.pathname}/${iurans.id}/update`
                              )
                            }
                            cursor={'pointer'}
                          />
                          <Spacer />
                          <FaTrash
                            onClick={() => {
                              setIuranId(iurans.id);
                              setIsOpen(true);
                            }}
                            cursor={'pointer'}
                          />
                        </Flex>
                      </Text>
                    </Box>
                  ))}
                </Box>
              );
            })}
          </Box>
        </DashboardTableContainer>
        <Pagination
          limit={limit}
          total={users.count}
          page={page}
          setPage={setPage}
        />
      </DashboardContainer>
      <DeleteConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={deleteIuran}
      />
    </DashboardMainContainer>
  );
};

const mapStateToProps = (state: RootState) => ({
  users: resources.getResource(RESOURCE_NAME.USERS)(state),
});

const connector = connect(mapStateToProps, {
  deleteIurans: _deleteIuran,
  getAllUser: _getAllUser,
});

type Props = ConnectedProps<typeof connector>;

export default connector(IuranContent);
