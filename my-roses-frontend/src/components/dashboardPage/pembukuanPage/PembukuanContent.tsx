import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import {
  Flex,
  Text,
  Table,
  Tr,
  Th,
  Tbody,
  Thead,
  Input,
  InputGroup,
  InputRightElement,
  Td,
  Spacer,
  Button,
  useDisclosure,
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
  getAllPembukuan as _getAllPembukuan,
  deletePembukuan as _deletePembukuan,
} from 'src/store/actions/resources/pembukuans';
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
import { getPembukuanFilter } from 'src/utils/pembukuan';

const PembukuanContent: React.FC<Props> = ({
  pembukuans,
  deletePembukuans,
  getAllPembukuan,
}) => {
  const [page, setPage] = useState<number>(1);
  const toast = useChakraToast();
  const [searchValue, setSearchValue] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [pembukuanId, setPembukuanId] = useState<number | null>(null);
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const [limit] = useState<number>(15);

  const onClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    (async () => {
      await getAllPembukuan(`page=${page}&limit=${limit}`);

      setFirstLoad(false);
    })();
  }, []); // eslint-disable-line

  useCustomDebounce(
    async () => {
      if (firstLoad) return;

      await getAllPembukuan(
        `page=${page}&limit=${limit}&${getPembukuanFilter(searchValue)}`
      );
    },
    1000,
    [searchValue, page]
  );

  const deletePembukuan = async () => {
    try {
      if (!pembukuanId) return;

      await deletePembukuans(pembukuanId);
      onClose();
    } catch (e) {
      errorToastfier(toast, e);
    }
  };

  return (
    <DashboardMainContainer>
      <Text fontFamily={'Poppins'} fontSize={'1.45rem'} py={5}>
        Buat Laporan
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
          <Table>
            <Thead>
              <Tr>
                <Th color="white" bg={'royalRed.200'} borderTopLeftRadius={10}>
                  No
                </Th>
                <Th color="white" bg={'royalRed.200'} width={'15%'}>
                  Hari/Tanggal
                </Th>
                <Th color="white" bg={'royalRed.200'} width={'10%'}>
                  Uraian
                </Th>
                <Th color="white" bg={'royalRed.200'} width={'10%'}>
                  Jumlah Batang/Kg
                </Th>
                <Th
                  color="white"
                  bg={'royalRed.200'}
                  width={'10%'}
                  textAlign="center"
                >
                  Harga(Rp)
                </Th>
                <Th
                  color="white"
                  bg={'royalRed.200'}
                  width={'10%'}
                  textAlign="center"
                >
                  Cashback Awal
                </Th>
                <Th
                  color="white"
                  bg={'royalRed.200'}
                  width={'10%'}
                  textAlign="center"
                >
                  Masuk
                </Th>
                <Th
                  color="white"
                  bg={'royalRed.200'}
                  width={'10%'}
                  textAlign="center"
                >
                  Keluar
                </Th>
                <Th
                  color="white"
                  bg={'royalRed.200'}
                  width={'10%'}
                  textAlign="center"
                >
                  Total Cashback
                </Th>
                <Th
                  color="white"
                  bg={'royalRed.200'}
                  width={'10%'}
                  textAlign="center"
                >
                  Setelah CashBack
                </Th>
                <Th
                  color="white"
                  bg={'royalRed.200'}
                  width={'10%'}
                  textAlign="center"
                >
                  Jumlah
                </Th>
                <Th
                  color="white"
                  bg={'royalRed.200'}
                  textAlign="center"
                  borderTopRightRadius={10}
                >
                  Aksi
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {_.map(_.values(pembukuans.rows), (pembukuan, index) => (
                <Tr key={index} bg={index % 2 !== 0 ? '#E1E1E1' : 'white'}>
                  <Td>{(page === 1 ? 1 : (page - 1) * limit + 1) + index}</Td>
                  <Td>
                    {moment(pembukuan.tanggal).format('dddd / DD MMMM YYYY')}
                  </Td>
                  <Td>{pembukuan.uraian}</Td>
                  <Td>{pembukuan.sumWood}</Td>
                  <Td>{pembukuan.harga}</Td>
                  <Td>{pembukuan.cashBack}</Td>
                  <Td>{pembukuan.masuk}</Td>
                  <Td>{pembukuan.keluar}</Td>
                  <Td>{pembukuan.sumCashBack}</Td>
                  <Td>{pembukuan.afterCashBack}</Td>
                  <Td>{pembukuan.jumlah}</Td>
                  <Td>
                    <Flex justifyContent={'space-between'}>
                      <FaEdit
                        onClick={() =>
                          Router.push(
                            `${Router.pathname}/${pembukuan.id}/update`
                          )
                        }
                        cursor={'pointer'}
                      />
                      <Spacer />
                      <FaTrash
                        onClick={() => {
                          setPembukuanId(pembukuan.id);
                          setIsOpen(true);
                        }}
                        cursor={'pointer'}
                      />
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </DashboardTableContainer>
        <Pagination
          limit={limit}
          total={pembukuans.count}
          page={page}
          setPage={setPage}
        />
      </DashboardContainer>
      <DeleteConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={deletePembukuan}
      />
    </DashboardMainContainer>
  );
};

const mapStateToProps = (state: RootState) => ({
  pembukuans: resources.getResource(RESOURCE_NAME.PEMBUKUANS)(state),
});

const connector = connect(mapStateToProps, {
  deletePembukuans: _deletePembukuan,
  getAllPembukuan: _getAllPembukuan,
});

type Props = ConnectedProps<typeof connector>;

export default connector(PembukuanContent);
