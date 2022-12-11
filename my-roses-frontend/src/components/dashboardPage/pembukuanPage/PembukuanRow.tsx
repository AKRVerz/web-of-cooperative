import React from "react";
import Router from "next/router";
import _ from "lodash";
import { Flex, Tr, Td } from "@chakra-ui/react";
import { connect, ConnectedProps } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { RESOURCE_NAME } from "src/utils/constant";
import useGetDataById from "src/hooks/useGetdataById";
import useIdQuery from "src/hooks/useIdQuery";

const LaporanRow: React.FC<Props> = ({ index }) => {
  const queryId = useIdQuery();
  const users = useGetDataById(RESOURCE_NAME.USERS, queryId);

  return (
    <Tr bg={index % 2 !== 0 ? "#E1E1E1" : "white"}>
      <Td>{index + 1}</Td>

      <Td>{_.get(users, "namaLengkap", "")}</Td>
      <Td>{_.get(users, "noTelp", "")}</Td>
      <Td justifyContent={"center"}>
        <Flex justifyContent={"center"}>
          <FaEdit
            onClick={() => Router.push(`${Router.pathname}/`)}
            cursor={"pointer"}
          />
        </Flex>
      </Td>
    </Tr>
  );
};

const connector = connect(null, {});

type Props = ConnectedProps<typeof connector> & {
  index: number;
};

export default connector(LaporanRow);
