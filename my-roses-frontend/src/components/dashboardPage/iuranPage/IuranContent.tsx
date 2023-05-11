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
import Router, { useRouter } from 'next/router';
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
import { getIuranFilter } from 'src/utils/iuran';
import { formatRupiah } from 'src/utils/formaterRupiah';

const IuranContent: React.FC<Props> = ({ users, deleteIurans, getAllUser }) => {
  const [page, setPage] = useState<number>(1);
  const toast = useChakraToast();
  const router = useRouter();
  const [searchValue, setSearchValue] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [iuranIds, setIuranIds] = useState<number[] | null>(null);
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

      await getAllUser(
        `page=${page}&limit=${limit}&includes=iurans&${getIuranFilter(
          searchValue
        )}`
      );
    },
    1000,
    [searchValue, page]
  );

  const deleteIuran = async () => {
    try {
      if (!iuranIds || !iuranIds.length) return;

      await Promise.all(
        _.map(iuranIds, (id) => deleteIurans(id).catch(() => {}))
      );
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
            {_.map(_.values(users.rows), ({ iurans, ...user }) => {
              const iuranByMonth = _.groupBy(iurans, (a) =>
                moment(a.createdAt).format('YYYY-MM')
              );
              const iuranTotal = _.map(iuranByMonth, (value, date) => ({
                date: date,
                debt: _.reduce(
                  value,
                  (prev, curr) => {
                    prev.total += curr.debt;
                    prev.ids.push(curr.id);

                    return prev;
                  },
                  { total: 0, ids: [] } as { total: number; ids: number[] }
                ),
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
                      <Text width={'30%'} py={2}>
                        {user.username}
                      </Text>
                      <Text width={'30%'} py={2}>
                        {moment(iuran.date).format('MMMM YYYY')}
                      </Text>
                      <Text width={'30%'} py={2}>
                        {formatRupiah(iuran.debt.total)}
                      </Text>
                      <Text width={'10%'} py={2}>
                        <Flex justifyContent={'space-between'}>
                          <FaEdit
                            onClick={() =>
                              router.push(`${router.pathname}/${user.id}`)
                            }
                            cursor={'pointer'}
                          />
                          <Spacer />
                          <FaTrash
                            onClick={() => {
                              setIuranIds(iuran.debt.ids);
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
