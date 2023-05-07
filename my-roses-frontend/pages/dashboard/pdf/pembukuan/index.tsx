import { Document, Page, Text } from '@react-pdf/renderer';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { connect, ConnectedProps } from 'react-redux';
import { pdfStyles as styles } from 'src/utils/styles';
import { resources } from 'src/store/selectors';
import { RESOURCE_NAME } from 'src/utils/constant';
import { DEFAULT_DOCUMENT_PROPS } from 'src/store/actions/resources/pembukuans';
import { KopSurat } from 'src/components/baseComponent/PDFComponents';
import RiwayatTableHead from 'src/components/baseComponent/PDFComponents/RiwayatTableHead';
import RiwayatTableRow from 'src/components/baseComponent/PDFComponents/RiwayatTableRow';
import { RootState } from 'src/store';
import { getAllPembukuan as _getAllPembukuan } from 'src/store/actions/resources/pembukuans';

const PDFViewer = dynamic(
  () => import('@react-pdf/renderer').then(({ PDFViewer }) => PDFViewer),
  { ssr: false }
);

const ExportPdf: React.FC<Props> = ({ pembukuans, getAllPembukuan }) => {
  const [page, setPage] = useState<number>(1);
  const [firstLoad, setFirstLoad] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      await getAllPembukuan(`page=${page}&limit=all`);

      setFirstLoad(false);
    })();
  }, []); // eslint-disable-line

  return (
    <PDFViewer style={{ width: '100vw', height: `100vh` }}>
      <Document {...DEFAULT_DOCUMENT_PROPS} subject={'Lamporan Pembukuan'}>
        <Page
          orientation="landscape"
          size="LETTER"
          wrap={true}
          style={styles.body}
        >
          <KopSurat />
          <Text style={styles.title}>Laporan Pembukuan</Text>
          <Text style={styles.text}>
            Rangkuman dari keseluruhan laporan pembukuan yang ada diringkas
            kedalam surat berikut :
          </Text>
          <RiwayatTableHead />
          <RiwayatTableRow pembukuans={pembukuans} />
          <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
            fixed
          />
        </Page>
      </Document>
    </PDFViewer>
  );
};

const mapStateToProps = (state: RootState) => ({
  pembukuans: resources.getResource(RESOURCE_NAME.PEMBUKUANS)(state),
});

const connector = connect(mapStateToProps, {
  getAllPembukuan: _getAllPembukuan,
});

type Props = ConnectedProps<typeof connector>;

export default connector(ExportPdf);
