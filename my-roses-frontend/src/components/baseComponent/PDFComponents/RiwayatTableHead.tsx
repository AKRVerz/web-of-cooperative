import { View, Text, StyleSheet } from '@react-pdf/renderer';

const RiwayatTableHead = () => {
  const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
      borderColor: 'black',
      borderWidth: 1,
      alignItems: 'center',
      fontSize: 12,
      lineHeight: 1.5,
    },
    uraian: {
      borderRightColor: 'black',
      borderRightWidth: 1,
      width: '20%',
      marginHorizontal: 3,
    },
    sum: {
      borderRightColor: 'black',
      borderRightWidth: 1,
      width: '20%',
      textAlign: 'center',
      marginHorizontal: 3,
    },
    jumlah: {
      borderRightColor: 'black',
      borderRightWidth: 1,
      width: '20%',
      marginHorizontal: 3,
    },
    date: {
      width: '25%',
      marginHorizontal: 3,
    },
  });

  return (
    <View style={styles.row}>
      <Text style={styles.date}>Tanggal</Text>
      <Text style={styles.uraian}>Uraian</Text>
      <Text style={styles.sum}>Jumlah Batang/Kg</Text>
      <Text style={styles.jumlah}>Jumlah(Rp)</Text>
    </View>
  );
};

export default RiwayatTableHead;
