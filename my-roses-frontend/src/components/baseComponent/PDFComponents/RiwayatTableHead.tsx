import { View, Text, StyleSheet } from '@react-pdf/renderer';

const RiwayatTableHead = () => {
  const styles = StyleSheet.create({
    row: {
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
      textAlign: 'center',
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
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.row}>
      <Text style={styles.allWith15}>Tanggal</Text>
      <Text style={styles.uraian}>Uraian</Text>
      <Text style={styles.allWith15}>Jumlah Bibit</Text>
      <Text style={styles.allWith15}>Masuk</Text>
      <Text style={styles.allWith15}>Keluar</Text>
      <Text style={styles.end}>SHU</Text>
    </View>
  );
};

export default RiwayatTableHead;
