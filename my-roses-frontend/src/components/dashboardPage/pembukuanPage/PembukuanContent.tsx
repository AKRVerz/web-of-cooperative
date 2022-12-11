import React, { useEffect, useState } from "react";
import _ from "lodash";
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
} from "@chakra-ui/react";
import { connect, ConnectedProps } from "react-redux";
import SessionUtils from "src/utils/sessionUtils";
import Router from "next/router";
import { FaEdit, FaSearch, FaTrash } from "react-icons/fa";
import { RESOURCE_NAME } from "src/utils/constant";
import { RootState } from "src/store";
import { resources } from "src/store/selectors";
import { getAlluser as _getAlluser } from "src/store/actions/resources/users";
import useCustomDebounce from "src/hooks/useCustomDebounce";
import LaporanRow from "./PembukuanRow";
import {
  DashboardContainer,
  DashboardMainContainer,
  DashboardTableContainer,
  Pagination,
} from "src/components/baseComponent";

const PembukuanContent: React.FC<Props> = ({ users, getAlluser }) => {
  const [page, setPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const [limit] = useState<number>(15);

  useEffect(() => {
    (async () => {
      await getAlluser(
        `filters=role="admin"&page=${page}&limit=${limit}`,
        true
      );

      setFirstLoad(false);
    })();
  }, []); // eslint-disable-line

  useCustomDebounce(
    async () => {
      if (firstLoad) return;

      await getAlluser(
        `filters=role="admin"&page=${page}&limit=${limit}`,
        true
      );
    },
    1000,
    [searchValue, page]
  );

  return (
    <DashboardMainContainer>
      <Text fontFamily={"Poppins"} fontSize={"1.45rem"} py={5}>
        Buat Laporan
      </Text>
      <DashboardContainer px={10} flexDirection={"column"}>
        <Flex mb={4} mt={8} justifyContent={"flex-end"} alignItems="center">
          <InputGroup width={"15rem"} boxShadow={"lg"} borderRadius={25}>
            <Input
              px={10}
              color="black"
              borderRadius={25}
              fontFamily="poppins"
              fontSize={"0.813rem"}
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
                <Th color="white" bg={"royalRed.200"} borderTopLeftRadius={10}>
                  No
                </Th>
                <Th color="white" bg={"royalRed.200"} width={"25%"}>
                  Hari/Tanggal
                </Th>
                <Th color="white" bg={"royalRed.200"} width={"20%"}>
                  Uraian
                </Th>
                <Th color="white" bg={"royalRed.200"} width={"10%"}>
                  Jumlah Batang/Kg
                </Th>
                <Th
                  color="white"
                  bg={"royalRed.200"}
                  width={"10%"}
                  textAlign="center"
                >
                  Harga(Rp)
                </Th>
                <Th
                  color="white"
                  bg={"royalRed.200"}
                  width={"10%"}
                  textAlign="center"
                >
                  Masuk
                </Th>
                <Th
                  color="white"
                  bg={"royalRed.200"}
                  width={"10%"}
                  textAlign="center"
                >
                  Keluar
                </Th>
                <Th
                  color="white"
                  bg={"royalRed.200"}
                  width={"10%"}
                  textAlign="center"
                >
                  Jumlah
                </Th>
                <Th
                  color="white"
                  bg={"royalRed.200"}
                  textAlign="center"
                  borderTopRightRadius={10}
                >
                  Aksi
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {_.map(_.values(users.rows), (user, index) => (
                <Tr key={index} bg={index % 2 !== 0 ? "#E1E1E1" : "white"}>
                  <Td>{(page === 1 ? 1 : (page - 1) * limit + 1) + index}</Td>
                  <Td>{user.username}</Td>
                  <Td>{user.email}</Td>
                  <Td>
                    <Flex justifyContent={"space-between"}>
                      <FaEdit
                        onClick={() =>
                          Router.push(`${Router.pathname}/${user.id}/update`)
                        }
                        cursor={"pointer"}
                      />
                      <Spacer />
                      {user.id !== SessionUtils.getAccountId() && (
                        <FaTrash
                          onClick={() => {
                            setUserId(user.id);
                            setIsOpen(true);
                          }}
                          cursor={"pointer"}
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
  );
};

const mapStateToProps = (state: RootState) => ({
  users: resources.getResource(RESOURCE_NAME.USERS)(state),
});

const connector = connect(mapStateToProps, {
  getAlluser: _getAlluser,
});

type Props = ConnectedProps<typeof connector>;

export default connector(PembukuanContent);
