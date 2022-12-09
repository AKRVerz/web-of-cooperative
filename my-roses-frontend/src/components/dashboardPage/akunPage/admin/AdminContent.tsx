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
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Spacer,
  useDisclosure,
} from '@chakra-ui/react';
import Router from 'next/router';
import { connect, ConnectedProps } from 'react-redux';
import { FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import { errorToastfier } from 'src/utils/toastifier';

import { RootState } from 'src/store';
import { RESOURCE_NAME } from 'src/utils/constant';
import DeleteConfirmationModal from 'src/components/baseComponent/DeleteConfirmationModal';
import useCustomDebounce from 'src/hooks/useCustomDebounce';
import {
  DashboardContainer,
  DashboardMainContainer,
  DashboardTableContainer,
  Pagination,
} from 'src/components/baseComponent';
import useChakraToast from 'src/hooks/useChakraToast';
import { buttonStyle } from 'src/utils/styles';
import { getResource } from 'src/store/selectors/resources';
import {
  deleteUser as _deleteUser,
  getAlluser as _getAlluser,
} from 'src/store/actions/resources/users';
import SessionUtils from 'src/utils/sessionUtils';

const AdminContent: React.FC<Props> = ({ users, deleteAdmin, getAlluser }) => {
  const toast = useChakraToast();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [page, setPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>('');
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const [limit] = useState<number>(15);
  const {
    isOpen: isCsvOpen,
    onClose: onCsvClose,
    onOpen: onCsvOpen,
  } = useDisclosure();

  const onClose = () => {
    setIsOpen(false);
  };

  const getDatas = async () => {
    if (firstLoad) return;

    await getAlluser(`filters=role="admin"&page=${page}&limit=${limit}`);
  };

  const deleteUser = async () => {
    try {
      if (!userId) return;

      await deleteAdmin(userId);
      getDatas();

      onClose();
    } catch (e) {
      errorToastfier(toast, e);
    }
  };

  useEffect(() => {
    (async () => {
      await getAlluser(`filters=role="admin"&page=${page}&limit=${limit}`);

      setFirstLoad(false);
    })();
  }, []); // eslint-disable-line

  useCustomDebounce(getDatas, 1000, [searchValue, page]);

  return (
    <React.Fragment>
      <DashboardMainContainer>
        <Text fontFamily={'Poppins'} fontSize={'1.45rem'} py={5}>
          Data User Admin
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
              <Button
                {...buttonStyle.confirmation}
                fontFamily="poppins"
                fontSize={'0.813rem'}
                px={10}
                borderRadius={25}
                _focus={{ border: 'none' }}
                onClick={onCsvOpen}
              >
                Import CSV
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
                  <Th
                    color="white"
                    bg={'royalRed.200'}
                    borderTopLeftRadius={10}
                  >
                    No
                  </Th>
                  <Th color="white" bg={'royalRed.200'} width={'95%'}>
                    Username
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
                {_.map(_.values(users.rows), (user, index) => (
                  <Tr key={index} bg={index % 2 !== 0 ? '#E1E1E1' : 'white'}>
                    <Td>{(page === 1 ? 1 : (page - 1) * limit + 1) + index}</Td>
                    <Td>{user.username}</Td>
                    <Td>
                      <Flex justifyContent={'space-between'}>
                        <FaEdit
                          onClick={() =>
                            Router.push(`${Router.pathname}/${user.id}/update`)
                          }
                          cursor={'pointer'}
                        />
                        <Spacer />
                        {user.id !== SessionUtils.getAccountId() && (
                          <FaTrash
                            onClick={() => {
                              setUserId(user.id);
                              setIsOpen(true);
                            }}
                            cursor={'pointer'}
                          />
                        )}
                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </DashboardTableContainer>
          <Pagination
            limit={limit}
            total={users.count}
            page={page}
            setPage={setPage}
          />
        </DashboardContainer>
      </DashboardMainContainer>
      <DeleteConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={deleteUser}
      />
    </React.Fragment>
  );
};

const mapStateToProps = (state: RootState) => ({
  users: getResource(RESOURCE_NAME.USERS)(state),
});

const connector = connect(mapStateToProps, {
  deleteAdmin: _deleteUser,
  getAlluser: _getAlluser,
});

type Props = ConnectedProps<typeof connector>;

export default connector(AdminContent);
