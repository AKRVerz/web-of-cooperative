import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import {
  Flex,
  Text,
  Table,
  Tr,
  Th,
  Td,
  Tbody,
  Thead,
  Spacer,
  useDisclosure,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import Router from 'next/router';
import moment from 'moment';
import { connect, ConnectedProps } from 'react-redux';
import { FaEdit, FaSearch, FaTrash } from 'react-icons/fa';
import { resources } from 'src/store/selectors';
import { RootState } from 'src/store';
import { RESOURCE_NAME } from 'src/utils/constant';
import useCustomDebounce from 'src/hooks/useCustomDebounce';
import {
  DashboardContainer,
  DashboardMainContainer,
  DashboardTableContainer,
  Pagination,
} from 'src/components/baseComponent';
import useChakraToast from 'src/hooks/useChakraToast';
import { getAllPembukuan as _getAllPembukuan } from 'src/store/actions/resources/pembukuans';
import {
  deleteUser as _deleteUser,
  getAllUser as _getAlluser,
} from 'src/store/actions/resources/users';
import { getPembukuanFilter } from 'src/utils/pembukuan';
import { formatRupiah } from 'src/utils/formaterRupiah';

const DashboardContent: React.FC<Props> = ({ pembukuans, getAllPembukuan }) => {
  const [page, setPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>('');
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const [limit] = useState<number>(15);

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

  return (
    <React.Fragment>
      <DashboardMainContainer>
        <Text fontFamily={'Poppins'} fontSize={'1.45rem'} py={5}>
          Dashboard
        </Text>
        <DashboardContainer px={10} flexDirection={'column'}>
          <Flex
            mb={4}
            mt={8}
            justifyContent={'space-between'}
            alignItems="center"
          >
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
                  <Th
                    color="white"
                    bg={'royalRed.200'}
                    borderTopLeftRadius={10}
                  >
                    No
                  </Th>
                  <Th color="white" bg={'royalRed.200'} width={'10%'}>
                    Hari dan Tanggal
                  </Th>
                  <Th color="white" bg={'royalRed.200'} width={'5%'}>
                    Tujuan Pengiriman
                  </Th>
                  <Th color="white" bg={'royalRed.200'} width={'5%'}>
                    Jumlah Batang
                  </Th>
                  <Th
                    color="white"
                    bg={'royalRed.200'}
                    width={'5%'}
                    textAlign="center"
                  >
                    Harga/Batang
                  </Th>
                  <Th
                    color="white"
                    bg={'royalRed.200'}
                    width={'5%'}
                    textAlign="center"
                  >
                    Hasil
                  </Th>
                  <Th
                    color="white"
                    bg={'royalRed.200'}
                    width={'5%'}
                    textAlign="center"
                  >
                    Cash Back
                  </Th>
                  <Th
                    color="white"
                    bg={'royalRed.200'}
                    width={'5%'}
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
                    Bayar Penangkar
                  </Th>
                  <Th
                    color="white"
                    bg={'royalRed.200'}
                    width={'5%'}
                    textAlign="center"
                  >
                    Ongkos Kirim
                  </Th>
                  <Th
                    color="white"
                    bg={'royalRed.200'}
                    width={'5%'}
                    textAlign="center"
                  >
                    Uang Jalan
                  </Th>
                  <Th
                    color="white"
                    bg={'royalRed.200'}
                    width={'5%'}
                    textAlign="center"
                  >
                    PPH (1,5%)
                  </Th>
                  <Th
                    color="white"
                    bg={'royalRed.200'}
                    width={'5%'}
                    textAlign="center"
                  >
                    Operasional QC
                  </Th>
                  <Th
                    color="white"
                    bg={'royalRed.200'}
                    width={'5%'}
                    textAlign="center"
                  >
                    Royalti
                  </Th>
                  <Th
                    color="white"
                    bg={'royalRed.200'}
                    width={'10%'}
                    textAlign="center"
                  >
                    Total Pengeluaran
                  </Th>
                  <Th
                    color="white"
                    bg={'royalRed.200'}
                    width={'10%'}
                    textAlign="center"
                  >
                    SHU
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
                    <Td>{formatRupiah(pembukuan.harga)}</Td>
                    <Td>{formatRupiah(pembukuan.masuk)}</Td>
                    <Td>{formatRupiah(pembukuan.cashBack)}</Td>
                    <Td>{formatRupiah(pembukuan.sumCashBack)}</Td>
                    <Td>{formatRupiah(pembukuan.payBreed)}</Td>
                    <Td>{formatRupiah(pembukuan.shipCost)}</Td>
                    <Td>{formatRupiah(pembukuan.roadMoney)}</Td>
                    <Td>{formatRupiah(pembukuan.pph)}</Td>
                    <Td>{formatRupiah(pembukuan.operationalQc)}</Td>
                    <Td>{formatRupiah(pembukuan.royalti)}</Td>
                    <Td>{formatRupiah(pembukuan.keluar)}</Td>
                    <Td>{formatRupiah(pembukuan.shu)}</Td>
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
      </DashboardMainContainer>
    </React.Fragment>
  );
};

const mapStateToProps = (state: RootState) => ({
  pembukuans: resources.getResource(RESOURCE_NAME.PEMBUKUANS)(state),
});

const connector = connect(mapStateToProps, {
  getAllPembukuan: _getAllPembukuan,
});

type Props = ConnectedProps<typeof connector>;

export default connector(DashboardContent);
