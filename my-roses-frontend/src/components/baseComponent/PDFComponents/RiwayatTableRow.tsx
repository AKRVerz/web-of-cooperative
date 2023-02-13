import React from "react";
import _ from "lodash";
import moment from "moment";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { ResourceRecord } from "src/types/resources";

const styles = StyleSheet.create({
  row: {
    display: "flex",
    flexDirection: "row",
    borderColor: "black",
    borderWidth: 1,
    alignItems: "center",
    fontSize: 12,
    lineHeight: 1.5,
  },
  uraian: {
    borderRightColor: "black",
    borderRightWidth: 2,
    width: "25%",
    marginHorizontal: 3,
  },
  sum: {
    borderRightColor: "black",
    borderRightWidth: 2,
    width: "20%",
    textAlign: "center",
    marginHorizontal: 3,
  },
  harga: {
    borderRightColor: "black",
    borderRightWidth: 2,
    width: "15%",
    marginHorizontal: 3,
  },
  jumlah: {
    width: "15%",
    marginHorizontal: 3,
  },
  date: {
    borderRightColor: "black",
    borderRightWidth: 2,
    width: "25%",
    marginHorizontal: 3,
  },
});

const RiwayatTableRow: React.FC<Props> = ({ pembukuans }) => {
  return (
    <View>
      {_.map(_.values(pembukuans.rows), (pembukuan) => (
        <React.Fragment key={pembukuan.id}>
          <View style={styles.row}>
            <Text style={styles.date}>
              {moment(pembukuan.tanggal).format("dddd / DD MMMM YYYY")}
            </Text>
            <Text style={styles.uraian}>{pembukuan.uraian}</Text>
            <Text style={styles.sum}>{pembukuan.sumWood}</Text>
            <Text style={styles.harga}>{pembukuan.harga}</Text>
            <Text style={styles.jumlah}>{pembukuan.jumlah}</Text>
          </View>
        </React.Fragment>
      ))}
    </View>
  );
};

type Props = {
  pembukuans: ResourceRecord<"pembukuans">;
};

export default RiwayatTableRow;
