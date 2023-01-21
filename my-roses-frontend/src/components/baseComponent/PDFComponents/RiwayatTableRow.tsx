import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import { connect, ConnectedProps } from 'react-redux';
import { Text, View, StyleSheet, Page } from '@react-pdf/renderer';
import { RootState } from 'src/store';
import { resources } from 'src/store/selectors';
import { RESOURCE_NAME } from 'src/utils/constant';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
    fontSize: 12,
    lineHeight: 1.5,
  },
  all: {
    borderRightColor: 'black',
    borderRightWidth: 1,
    width: '20%',
    textAlign: 'center',
    marginHorizontal: 3,
  },
  date: {
    width: '25%',
    marginHorizontal: 3,
  },
});

const RiwayatTableRow: React.FC<Props> = ({ pembukuans }) => {
  return (
    <View style={styles.row}>
      {_.map(_.values(pembukuans.rows), (pembukuan) => (
        <View>
          <Text style={styles.date}>
            {moment(pembukuan.tanggal).format('dddd / DD MMMM YYYY')}
          </Text>
          <Text style={styles.all}>{pembukuan.uraian}</Text>
          <Text style={styles.all}>{pembukuan.sumWood}</Text>
          <Text style={styles.all}>{pembukuan.harga}</Text>
          <Text style={styles.all}>{pembukuan.jumlah}</Text>
        </View>
      ))}
    </View>
  );
};

const mapStateToProps = (state: RootState) => ({
  pembukuans: resources.getResource(RESOURCE_NAME.PEMBUKUANS)(state),
});

const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(RiwayatTableRow);
