import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResourceRecord } from 'src/types/resources';
import { formatRupiah } from 'src/utils/formaterRupiah';

const styles = StyleSheet.create({
  row: {
    display: 'flex',
    flexDirection: 'row',
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
    fontSize: 10,
    lineHeight: 1.5,
  },

  uraian: {
    borderRightColor: 'black',
    borderRightWidth: 1,
    width: '20%',
    marginHorizontal: 3,
  },
  allWith15: {
    borderRightColor: 'black',
    borderRightWidth: 1,
    width: '15%',
    marginHorizontal: 3,
    textAlign: 'center',
  },
  end: {
    width: '10%',
    marginHorizontal: 3,
  },
});

const RiwayatTableRow: React.FC<Props> = ({ pembukuans }) => {
  return (
    <View>
      {_.map(_.values(pembukuans.rows), (pembukuan) => (
        <React.Fragment key={pembukuan.id}>
          <View style={styles.row}>
            <Text style={styles.allWith15}>
              {moment(pembukuan.tanggal).format('dddd / DD MMMM YYYY')}
            </Text>
            <Text style={styles.uraian}>{pembukuan.uraian}</Text>
            <Text style={styles.allWith15}>{pembukuan.sumWood}</Text>
            <Text style={styles.allWith15}>
              {formatRupiah(pembukuan.masuk)}
            </Text>
            <Text style={styles.allWith15}>
              {formatRupiah(pembukuan.keluar)}
            </Text>
            <Text style={styles.end}>{formatRupiah(pembukuan.jumlah)}</Text>
          </View>
        </React.Fragment>
      ))}
    </View>
  );
};

type Props = {
  pembukuans: ResourceRecord<'pembukuans'>;
};

export default RiwayatTableRow;
